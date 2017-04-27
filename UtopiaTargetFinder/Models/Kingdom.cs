using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UtopiaTargetFinder.Controllers;

namespace UtopiaTargetFinder.Models
{
    public class Kingdom
    {
        public Kingdom(dynamic obj)
        {
            Name = obj.name;
            Land = obj.land;
            Honor = obj.honor;
            Networth = obj.nw;
            Count = obj.count;
            Location = obj.loc;
            Wars = obj.wars[1];
            WarWins = obj.wars[0];
            Provinces.AddRange(Province.GetProvinces(obj));
            var parsed = Enum.TryParse(obj.stance.ToString(), out Stance stance);
            if (parsed)
            {
                Stance = stance;
            }
            else
            {
                Stance = Stance.War;
                AtWarWith = obj.stance[1];
            }
        }

        public string Name { get; set; }
        public int Land { get; set; }
        public Stance Stance { get; set; }
        public string AtWarWith { get; set; }
        public int Honor { get; set; }
        public int Networth { get; set; }
        public int Count { get; set; }
        public string Location { get; set; }
        public List<Province> Provinces { get; set; } = new List<Province>();
        public int Wars { get; set; }
        public int WarWins { get; set; }
    }
}