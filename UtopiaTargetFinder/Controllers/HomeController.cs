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
        // private readonly IDocumentSession _session;

        public HomeController(/*IDocumentSession session*/)
        {
            // _session = session;
        }
        public async Task<IActionResult> Index()
        {
            //_session.DeleteWhere<Province>(x => true);
            //_session.DeleteWhere<Kingdom>(x => true);
            //_session.SaveChanges();
            //var client = new HttpClient();
            //var httpResponseMessage = await client.GetAsync("http://utopia-game.com/wol/game/kingdoms_dump/?key=l1FdkNfdklAs");
            //client.Dispose();
            //var responseAsString = httpResponseMessage.Content.ReadAsStringAsync();

            //var allKingdoms = new List<Kingdom>();
            //var allProvinces = new List<Province>();
            //var provGuid = new Guid("d297156b-0186-4515-944a-5760a07ef8a5");
            //var kdGuid = new Guid("a6a1eab8-2dae-4304-b1ed-acb9635a9e2c");
            //try
            //{
            //    var jsonAsDynamic = JsonConvert.DeserializeObject<List<dynamic>>(responseAsString.Result);
            //    var timestamp = DateTime.Parse(jsonAsDynamic[0].ToString());
            //    jsonAsDynamic.RemoveAt(0);
            //    jsonAsDynamic.RemoveAt(jsonAsDynamic.Count - 1);
            //    jsonAsDynamic.ForEach(x =>
            //    {
            //        allKingdoms.Add(new Kingdom(x));
            //        allProvinces.AddRange(Province.GetProvinces(x));
            //    });
            //}
            //catch (Exception)
            //{
            //    allProvinces.Add(new Province
            //    {
            //        Honor = Honor.Baron,
            //        Location = "1:1",
            //        Name = "Prov Name",
            //        Race = Race.Avian,
            //        Land = 12555,
            //        Protected = false,
            //        Networth = 321456
            //    });

            //    allKingdoms.Add(new Kingdom
            //    {
            //        Honor = 123,
            //        Stance = Stance.Aggressive,
            //        WarWins = 1,
            //        Location = "1:1",
            //        Wars = 1,
            //        Name = "KD Name",
            //        Provinces = allProvinces,
            //        Land = 432432432,
            //        Networth = 32432,
            //        Count = 1
            //    });
            //}

            //var allProvinces = _session.Query<Province>().ToList();
            //var allKingdoms = _session.Query<Kingdom>().ToList();

            //allProvinces.ForEach(prov =>
            //{
            //    var kdnw = allKingdoms.Single(x => x.Location == prov.Location).Networth;
            //    prov.KingdomNetworth = kdnw;
            //});


            //_session.Store(allProvinces.ToArray());
            //_session.Store(allKingdoms.ToArray());
            //_session.SaveChanges();

            //var stuff = Environment.GetEnvironmentVariables();
            //var url = Environment.GetEnvironmentVariable("DATABASE_URL");
            //var url2 = Environment.GetEnvironmentVariable("ASPNETCORE_DATABASE_URL");


            return View();
        }

        public JsonResult getData()
        {
            //var provs = _session.Query<Province>().ToList();
            //var kds = _session.Query<Kingdom>().ToList();
            var EnvironmentVariables = Environment.GetEnvironmentVariables();

            return Json(new {/* Provinces = provs, Kingdoms = kds, */EnvironmentVariables = EnvironmentVariables }); 
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
