using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class Image
    {
        private int id;
        private string urlImage;
        private int mangaId;

        public int Id { get => id; set => id = value; }
        public string UrlImage { get => urlImage; set => urlImage = value; }
        public int MangaId { get => mangaId; set => mangaId = value; }

   [JsonIgnore]
        public Manga Manga { get; set; }

        public Image()
        {
     
        }
    }
}
