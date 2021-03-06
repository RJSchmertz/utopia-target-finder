﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Marten;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UtopiaTargetFinder.Models;

namespace UtopiaTargetFinder.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDocumentSession _session;

        public HomeController(IDocumentSession session)
        {
            _session = session;
        }
        public async Task<IActionResult> Index()
        {
            var client = new HttpClient();
            var httpResponseMessage = await client.GetAsync("http://utopia-game.com/wol/game/kingdoms_dump/?key=l1FdkNfdklAs");
            client.Dispose();
            var responseAsString = httpResponseMessage.Content.ReadAsStringAsync();

            var allKingdoms = new List<Kingdom>();
            var allProvinces = new List<Province>();
            var provGuid = new Guid("d297156b-0186-4515-944a-5760a07ef8a5");
            var kdGuid = new Guid("a6a1eab8-2dae-4304-b1ed-acb9635a9e2c");
            try
            {
                var jsonAsDynamic = JsonConvert.DeserializeObject<List<dynamic>>(responseAsString.Result);

                _session.DeleteWhere<Province>(x => true);
                _session.DeleteWhere<Kingdom>(x => true);
                _session.SaveChanges();

                var timestamp = DateTime.Parse(jsonAsDynamic[0].ToString());
                jsonAsDynamic.RemoveAt(0);
                jsonAsDynamic.RemoveAt(jsonAsDynamic.Count - 1);
                jsonAsDynamic.ForEach(x =>
                {
                    allKingdoms.Add(new Kingdom(x));
                    allProvinces.AddRange(Province.GetProvinces(x));
                });
                allProvinces.ForEach(prov =>
                {
                    var kd = allKingdoms.Single(x => x.Location == prov.Location);
                    prov.KingdomNetworth = kd.Networth;
                    prov.Stance = kd.Stance;
                    _session.Store(prov);

                });
                //_session.Store(allProvinces.ToArray());
                //_session.Store(allKingdoms.ToArray());
                _session.SaveChanges();

                var thing = _session.Query<Province>().ToList();
                Console.WriteLine("***successfully updated DB");
            }
            catch (Exception ex)
            {
                Console.WriteLine("***EXCEPTION LOADING NEW DATA");
                Console.WriteLine(ex.Message);
                //allProvinces.Add(new Province
                //{
                //    Honor = Honor.Baron,
                //    Location = "1:1",
                //    Name = "Prov Name",
                //    Race = Race.Avian,
                //    Land = 12555,
                //    Protected = false,
                //    Networth = 321456
                //});

                //allKingdoms.Add(new Kingdom
                //{
                //    Honor = 123,
                //    Stance = Stance.Aggressive,
                //    WarWins = 1,
                //    Location = "1:1",
                //    Wars = 1,
                //    Name = "KD Name",
                //    Provinces = allProvinces,
                //    Land = 432432432,
                //    Networth = 32432,
                //    Count = 1
                //});
            }


            return View();
        }

        public JsonResult getData()
        {
            var provs = _session.Query<Province>().ToList();
            var kds = _session.Query<Kingdom>().ToList();
            var stancesSet = provs.Any(x => x.Stance != Stance.Normal);
            if (!stancesSet)
            {
                provs.ForEach(prov =>
                {
                    var kd = kds.Single(x => x.Location == prov.Location);
                    prov.KingdomNetworth = kd.Networth;
                    prov.Stance = kd.Stance;
                    //_session.Store(prov);
                });
                //_session.SaveChanges();
            }

            return Json(new
            {
                Provinces = provs,
                Kingdoms = kds,
                RaceTypes = GetRaceEnumDict(),
                StanceTypes = GetStanceEnumDict()
            });
        }

        private Dictionary<string, int> GetRaceEnumDict()
        {
            var names = Enum.GetNames(typeof(Race)).ToList();
            names.Sort();
            var enumDictionary = new Dictionary<string, int>();

            names.ForEach(name =>
            {
                Enum.TryParse(name, out Race enumVal);
                enumDictionary.Add(name, (int)enumVal);
            });

            return enumDictionary;
        }

        private Dictionary<string, int> GetStanceEnumDict()
        {
            var names = Enum.GetNames(typeof(Stance)).ToList();
            names.Sort();
            var enumDictionary = new Dictionary<string, int>();

            names.ForEach(name =>
            {
                Enum.TryParse(name, out Stance enumVal);
                enumDictionary.Add(name, (int)enumVal);
            });

            return enumDictionary;
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
