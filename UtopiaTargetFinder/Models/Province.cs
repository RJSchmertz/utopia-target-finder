using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UtopiaTargetFinder.Controllers;

namespace UtopiaTargetFinder.Models
{
    public class Province
    {
        public Province()
        {
            
        }
        public Province(dynamic obj)
        {
            Name = obj.name;
            Land = obj.land;
            Networth = obj.nw;
            Location = obj.loc;
            Race = obj.race;
            Protected = obj["protected"];

            string honorString = obj.honor.ToString();
            honorString = honorString.Replace(" ", string.Empty);
            var parsed = Enum.TryParse(honorString, out Honor honor);
            if (parsed) Honor = honor;
            if (!parsed)
            {
                
            }
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public int Land { get; set; }
        public Honor Honor { get; set; }
        public int Networth { get; set; }
        public string Location { get; set; }
        public bool Protected { get; set; }
        public Race Race { get; set; }
        public int KingdomNetworth { get; set; }

        public static IEnumerable<Province> GetProvinces(dynamic obj)
        {
            var retVal = new List<Province>();
            var provinces = JsonConvert.DeserializeObject<List<dynamic>>(obj.provinces.ToString());
            int count = provinces.Count - 1;
            for (var i = 0; i < count; i++)
            {
                try
                {
                    retVal.Add(new Province(obj.provinces[i])); 
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }

            return retVal;
        }
    }
}
