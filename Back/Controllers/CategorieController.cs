using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Back.Tools;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers
{
    [EnableCors("allowsAll")]
    [Route("[controller]")]
    [ApiController]
    public class CategorieController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            DataContext dc = new DataContext();
            return Ok(dc.Categorie.Include(m => m.Mangas).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetCat(int id)
        {
            DataContext dc = new DataContext();
            return Ok(dc.Categorie.Include(m => m.Mangas).FirstOrDefault(c => c.Id == id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Categorie categorie)
        {
            DataContext dc = new DataContext();
            dc.Add(categorie);
            dc.SaveChanges();
            return Ok(new { message = "catégorie ajoutée", catId = categorie.Id });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DataContext dc = new DataContext();
            Categorie cat = dc.Categorie.FirstOrDefault(c => c.Id == id);
            if(cat != null)
            {
                dc.Categorie.Remove(cat);
                dc.SaveChanges();
                return Ok(new { message = "catégorie supprimée" });
            }
            else
            {
                return NotFound();
            }
        }


        /*******************************************************
         ******************Réinitialisation des données*********
         * à tester sur postman**/
        [HttpDelete("remove/manga")]
        public IActionResult DeleteTables()
        {
            if (!Manga.DeleteTableManga())
                return Ok(new { message = "table réinitialisée" });
            else
                return Ok(new { message = "échec" });
        }

        [HttpDelete("remove/image")]
        public IActionResult DeleteTableImage()
        {
            if (!Manga.DeleteTableImage())
                return Ok(new { message = "table réinitialisée" });
            else
                return Ok(new { message = "échec" });
        }

        [HttpDelete("remove/categorie")]
        public IActionResult DeleteTableCat()
        {
            if (!Manga.DeleteTableCategorie())
                return Ok(new { message = "table réinitialisée" });
            else
                return Ok(new { message = "échec" });
        }
    }
}