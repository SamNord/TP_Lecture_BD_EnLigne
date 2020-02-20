using Back.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Back.Tools
{
    public class LoginService : ILoginService
    {
        DataContext data;

        public LoginService(DataContext _data)
        {
            data = _data;
        }

        //Méthode qui va générer le token de l'admin
        public string LogIn(string identifiant, string password)
        {
            Admin admin = data.Admin.FirstOrDefault(x => x.Identifiant == identifiant && x.Password == password);

            if (admin == null)
                return null;
            //Objet pour creer un json web Token car les données sont envoyées en json
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            //Convertir la chaine de cryptage en bytes
            byte[] key = Encoding.ASCII.GetBytes("agent");

            //Description du contenu du JWT
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor();
            descriptor.Subject = new ClaimsIdentity(new Claim[]
            {
                //Contenu du body du JWT
                new Claim(ClaimTypes.Name, admin.Identifiant),
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString())
            });
            //Pour créer le token
            SecurityToken token = tokenHandler.CreateToken(descriptor);

            //date d'expiration du token
            descriptor.Expires = DateTime.Now.AddSeconds(60);

            //signature du jSonWebToken sous forme d'algo en HmacSha256
            descriptor.SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            //on convertit le token en chaine de caractère et on le stocke dans le Token du client(user)
            admin.Token = tokenHandler.WriteToken(token);
            //sauvegarde, mis à jour
            data.SaveChanges();

            //retourne le token sous forme de chaine de caractère(string)
            return admin.Token;
        }
    }

    public interface ILoginService
    {
        string LogIn(string identifiant, string password);    
    }
}
