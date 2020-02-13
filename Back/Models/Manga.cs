using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class Manga
    {
        private int id;
        private string titre;
        private string auteur;
        private string texte;
        private string urlCover;
        private int categorieId;

        public int Id { get => id; set => id = value; }
        public string Titre { get => titre; set => titre = value; }
        public string Auteur { get => auteur; set => auteur = value; }
        public string Texte { get => texte; set => texte = value; }
        public int CategorieId { get => categorieId; set => categorieId = value; }
        public string UrlCover { get => urlCover; set => urlCover = value; }


      
        public List<Image> Images { get; set; }

     
        public Categorie Categorie { get; set; }
     

        public Manga()
        {
       
            Images = new List<Image>();
        }
    }
}
