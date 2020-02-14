using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Back.Tools;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
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
        private IHostingEnvironment _env;

        public MangaController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public IActionResult Get()
        {
            DataContext dc = new DataContext();
            return Ok(dc.Manga.Include(c => c.Categorie).Include(i => i.Images).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            DataContext dc = new DataContext();
            return Ok(dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id));
            //return Ok(dc.Manga.FirstOrDefault(x => x.Id == id));
        }

        [HttpGet("search/titre/{mot}")]
        public IActionResult SearchByTitle(string mot)
        {
            DataContext dc = new DataContext();
            List<Manga> listeMangas = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).Where(x => x.Titre == mot).ToList();
            if (listeMangas.Count > 0)
            {
                return Ok(listeMangas);
            }
            else
            {
                return Ok(new { message = "pas de mangas correspondant à votre recherche" });
            }
        }

        [HttpGet("search/auteur/{mot}")]
        public IActionResult SearchByAuteur(string mot)
        {
            DataContext dc = new DataContext();
            List<Manga> listeMangas = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).Where(x => x.Auteur == mot).ToList();
            if (listeMangas.Count > 0)
            {
                return Ok(listeMangas);
            }
            else
            {
                return Ok(new { message = "pas de mangas correspondant à votre recherche" });
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Manga manga)
        {
            DataContext dc = new DataContext();
            dc.Add(manga);
            dc.SaveChanges();
            return Ok(new { message = "manga ajouté", numero = manga.Id });
        }

        [HttpPut("upload/image/{id}")]
        public IActionResult PutImage(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);

            string img = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
            //string pathToUploadImg = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "images", img);
            string pathUploadImg = Path.Combine(_env.WebRootPath, "images", img);
            FileStream stream = System.IO.File.Create(pathUploadImg);
            data.Image.CopyTo(stream);
            stream.Close();
            Image image = new Image();
            image.UrlImage = "images/" + img;
            image.MangaId = id;
            dc.Image.Add(image);
            dc.SaveChanges();
            return Ok(new { message = "image ajoutée" });

        }

        [HttpPut("upload/cover/{id}")]
        public IActionResult PutCover(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.FirstOrDefault(x => x.Id == id);
            string img = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
            //string pathToUploadCover = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "covers", img);
            string pathUploadCover = Path.Combine(_env.WebRootPath, "covers", img);
            FileStream stream = System.IO.File.Create(pathUploadCover);
            data.Image.CopyTo(stream);
            stream.Close();
            manga.UrlCover = "covers/" + img;
            if (dc.SaveChanges() > 0)
                return Ok(new { message = "image de couverture ajoutée", url = manga.UrlCover });
            else
                return Ok(new { message = "échec" });
        }

        //modification du manga
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] Manga mangaEdit)
        {
            DataContext dc = new DataContext();
            /*je recherche le manga à modifier par son id*/
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            /*si je le trouve, je procède à sa modification*/
            if (manga != null)
            {
                manga.Auteur = mangaEdit.Auteur;
                manga.Titre = mangaEdit.Titre;
                manga.Texte = mangaEdit.Texte;
                manga.CategorieId = mangaEdit.CategorieId;
                dc.SaveChanges();
                return Ok(new { message = "manga mis à jour" });
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("update/image/{id}")]
        public IActionResult UpdateImage(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Image image = dc.Image.FirstOrDefault(i => i.Id == id);
            if (image != null)
            {
                string pathImg = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
                string editImg = Path.Combine(_env.WebRootPath, "images", pathImg);
                FileStream stream = System.IO.File.Create(editImg);
                data.Image.CopyTo(stream);
                stream.Close();
                image.UrlImage = "images/" + pathImg;
                dc.SaveChanges();
                return Ok(new { message = "image modifiée" });
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            if (manga != null)
            {
                dc.Remove(manga);
                dc.SaveChanges();
                return Ok(new { message = "manga supprimé", numero = manga.Id });
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("getImage")]
        public IActionResult GetImage()
        {
            DataContext dc = new DataContext();
            return Ok(dc.Image.ToList());
        }
    }

    public class ImageType
    {
        private string titreEdit;
        private string auteurEdit;
        private int catId;
        private string texteEdit;
        private string urlCoverEdit;
        private string urlImageEdit;
        private int mangaIdEdit;

        public IFormFile Image { get; set; }
        public string TitreEdit { get => titreEdit; set => titreEdit = value; }
        public string AuteurEdit { get => auteurEdit; set => auteurEdit = value; }
        public int CatId { get => catId; set => catId = value; }
        public string TexteEdit { get => texteEdit; set => texteEdit = value; }
        public string UrlCoverEdit { get => urlCoverEdit; set => urlCoverEdit = value; }
        public string UrlImageEdit { get => urlImageEdit; set => urlImageEdit = value; }
        public int MangaIdEdit { get => mangaIdEdit; set => mangaIdEdit = value; }
        public List<Image> ListeImg { get; set; }
    }
}