using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class Admin
    {
        private int id;
        private string identifiant;
        private string password;
        private string token;
        private static SqlCommand command;
        private static SqlConnection connection = new SqlConnection(@"Data Source=(LocalDb)\TP_Lecture_BD_EnLigne;Integrated Security=True");

        public int Id { get => id; set => id = value; }
        public string Identifiant { get => identifiant; set => identifiant = value; }
        public string Password { get => password; set => password = value; }
        public string Token { get => token; set => token = value; }

        public Admin()
        {
        }

        public static bool DeleteTable()
        {
            command = new SqlCommand("truncate table admin", connection);
            connection.Open();
            int ligne = command.ExecuteNonQuery();
            command.Dispose();
            connection.Close();
            return ligne > 0;
        }
    }
}
