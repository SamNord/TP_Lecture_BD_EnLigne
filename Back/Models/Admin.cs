using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class Admin
    {
        private int id;
        private string identifiant;
        private string password;

        public int Id { get => id; set => id = value; }
        public string Identifiant { get => identifiant; set => identifiant = value; }
        public string Password { get => password; set => password = value; }
    }
}
