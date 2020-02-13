using System;
using System.Collections.Generic;
using System.IO;
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
    public class MangaController : ControllerBase
    {

        [HttpGet]
        public IActionResult Get()
        {
            DataContext db = new DataContext();
            return Ok(db.Manga.Include(c => c.Categorie).Include(i => i.Images).Include(cov => cov.Cover).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            DataContext db = new DataContext();
            return Ok(db.Manga.Include(c => c.Categorie).Include(i => i.Images).Include(cov => cov.Cover).FirstOrDefault(x=> x.Id == id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Manga manga)
        {
            DataContext db = new DataContext();
            db.Add(manga);
            db.SaveChanges();
            return Ok(new { message = "manga ajouté", numero = manga.Id });
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromForm] ImageType data)
        {
            DataContext db = new DataContext();
            Manga manga = db.Manga.Include(c => c.Categorie).Include(i => i.Images).Include(cov => cov.Cover).FirstOrDefault(x => x.Id == id);
            string img = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
            //string pathToUpload = _env.WebRootPath + @"\images\" + random + "-" + imageAnnonce.FileName;
            string pathToUploadImg = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "images", img);
            string pathToUploadCover = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "covers", img);
            FileStream stream = System.IO.File.Create(pathToUploadImg);
            data.Image.CopyTo(stream);
            stream.Close();
            FileStream stream2 = System.IO.File.Create(pathToUploadCover);
            data.Image.CopyTo(stream);
            stream.Close();
            Image image = new Image();
            image.UrlImage = "images/" + img;
            manga.UrlCover = "covers/" + img;
            image.MangaId = id;
     
            db.SaveChanges();
            return Ok(new { imageId = image.Id, message = "image ajoutée" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DataContext db = new DataContext();
            Manga manga = db.Manga.Include(c => c.Categorie).Include(i => i.Images).Include(cov => cov.Cover).FirstOrDefault(x => x.Id == id);
            if(manga != null)
            {
                db.Remove(manga);
                db.SaveChanges();
                return Ok(new { message = "manga supprimé", numero = manga.Id });
            }
            else
            {
                return NotFound();
            }
                
        }
    }

    public class ImageType
    {
        public IFormFile Image { get; set; }
    }
}