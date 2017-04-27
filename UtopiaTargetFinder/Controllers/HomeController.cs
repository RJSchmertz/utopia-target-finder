using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UtopiaTargetFinder.Models;

namespace UtopiaTargetFinder.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {
            var client = new HttpClient();
            var httpResponseMessage = await client.GetAsync("http://utopia-game.com/wol/game/kingdoms_dump/?key=l1FdkNfdklAs");
            client.Dispose();
            var responseAsString = httpResponseMessage.Content.ReadAsStringAsync();
            var jsonAsDynamic = JsonConvert.DeserializeObject<List<dynamic>>(responseAsString.Result);
            var timestamp = DateTime.Parse(jsonAsDynamic[0].ToString());
            jsonAsDynamic.RemoveAt(0);
            jsonAsDynamic.RemoveAt(jsonAsDynamic.Count - 1);
            var allKingdoms = new List<Kingdom>();
            var allProvinces = new List<Province>();
            jsonAsDynamic.ForEach(x =>
            {
                allKingdoms.Add(new Kingdom(x));
                allProvinces.AddRange(Province.GetProvinces(x));
            });

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
