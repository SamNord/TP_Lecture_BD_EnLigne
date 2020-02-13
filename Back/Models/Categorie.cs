using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class Categorie
    {
        private int id;
        private string type;

        public int Id { get => id; set => id = value; }
        public string Type { get => type; set => type = value; }

        [JsonIgnore]
        public List<Manga> Mangas { get; set; }

        public Categorie()
        {
            Mangas = new List<Manga>();
        }
    }
}
