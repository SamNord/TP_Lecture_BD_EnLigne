using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        private static SqlCommand command;
        private static SqlConnection connection = new SqlConnection(@"Data Source=(LocalDb)\TP_Lecture_BD_EnLigne;Integrated Security=True");

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


        /**************************************************************
         *************Méthodes de réinitialisation des tables*********/
        public static bool DeleteTableManga()
        {
            command = new SqlCommand("truncate table manga", connection);
            connection.Open();
            int ligne = command.ExecuteNonQuery();
            command.Dispose();
            connection.Close();
            return ligne > 0;
        }

        public static bool DeleteTableImage()
        {
            command = new SqlCommand("truncate table image", connection);
            connection.Open();
            int ligne = command.ExecuteNonQuery();
            command.Dispose();
            connection.Close();
            return ligne > 0;
        }

        public static bool DeleteTableCategorie()
        {
            command = new SqlCommand("truncate table categorie", connection);
            connection.Open();
            int ligne = command.ExecuteNonQuery();
            command.Dispose();
            connection.Close();
            return ligne > 0;
        }

    }
}
