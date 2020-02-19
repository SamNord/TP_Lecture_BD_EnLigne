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
using Newtonsoft.Json;

namespace Back.Controllers
{
    [EnableCors("allowsAll")]
    [Route("[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        /***************Service pour récupérer le chemin du fichier(image) à ajouter****/
        private IHostingEnvironment _env;

        public MangaController(IHostingEnvironment env)
        {
            _env = env;
        }


        /*************************************************************
         ********************Liste des mangas************************/
        [HttpGet]
        public IActionResult Get()
        {
            DataContext dc = new DataContext();
            return Ok(dc.Manga.Include(c => c.Categorie).Include(i => i.Images).ToList());
        }

        /*************************************************************
        ********************Rechercher manga par son id***************/
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            DataContext dc = new DataContext();
            return Ok(dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id));
            //return Ok(dc.Manga.FirstOrDefault(x => x.Id == id));
        }

        /*************************************************************
        ********************Recherche par titre************************/
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

        /*************************************************************
         ********************Recherche par auteur********************/
        [HttpGet("search/auteur/{mot}")]
        public IActionResult SearchByAuteur(string mot)
        {
            DataContext dc = new DataContext();
            List<Manga> listeMangas = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).Where(x => x.Auteur.Contains(mot)).ToList();
            if (listeMangas.Count > 0)
            {
                return Ok(listeMangas);
            }
            else
            {
                return Ok(new { message = "pas de mangas correspondant à votre recherche" });
            }
        }

        /*************************************************************
         ********************Recherche par titre ou auteur************/
        [HttpGet("search/{mot}")]
        public IActionResult Search(string mot)
        {
            DataContext dc = new DataContext();
            List<Manga> listeMangas = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).Where(x => x.Auteur == mot || x.Titre == mot).ToList();
            if (listeMangas.Count > 0)
            {
                return Ok(listeMangas);
            }
            else
            {
                return Ok(new { message = "pas de mangas correspondant à votre recherche" });
            }
        }

        /*************************************************************
       ********************Recherche par titre ou auteur************/
        [HttpGet("search/byCategory/{id}")]
        public IActionResult SearchByCategory(int id)
        {
            DataContext dc = new DataContext();
            List<Manga> listeMangas = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).Where(x => x.CategorieId == id).ToList();
            if (listeMangas.Count > 0)
            {
                return Ok(listeMangas);
            }
            else
            {
                return Ok(new { message = "pas de mangas correspondant à votre recherche" });
            }
        }

        /*************************************************************
        *****************Ajout du manga : partie 1(données en json*****/
        [HttpPost]
        public IActionResult Post([FromBody] Manga manga)
        {
            DataContext dc = new DataContext();
            dc.Add(manga);
            if (dc.SaveChanges() > 0)
                return Ok(new { message = "manga ajouté", numero = manga.Id });
            else
                return Ok(new { message = "erreur" });
        }

        /*************************************************************
        ******************************Ajout de l'image ****************/
        [HttpPut("upload/image/{id}")]
        public IActionResult PutImage(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            List<Image> listeImages = new List<Image>();
            listeImages.AddRange(manga.Images);
            string img = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
            //string pathToUploadImg = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "images", img);
            string pathUploadImg = Path.Combine(_env.WebRootPath, "images", img);
            FileStream stream = System.IO.File.Create(pathUploadImg);
            data.Image.CopyTo(stream);
            stream.Close();
            Image image = new Image();
            string pathImg = "images/" + img;
            image.UrlImage = $"{Request.Scheme}://{Request.Host.Value}/{pathImg}";
            image.MangaId = id;
            dc.Image.Add(image);
            listeImages.Add(image);
            manga.Images = listeImages;
            if (dc.SaveChanges() > 0)
                return Ok(new { message = "image ajoutée", imageId = image.Id, liste = manga.Images });
            else
                return Ok(new { message = "l'image n'a pas pu être ajoutée" });

        }

        /*************************************************************
        ******************************Ajout de la couverture *********/
        [HttpPut("upload/cover/{id}")]
        public IActionResult PutCover(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);           
            string img = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
            //string pathToUploadCover = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "covers", img);
            string pathUploadCover = Path.Combine(_env.WebRootPath, "covers", img);
            FileStream stream = System.IO.File.Create(pathUploadCover);
            data.Image.CopyTo(stream);
            stream.Close();
            string cover = "covers/" + img;
            manga.UrlCover = $"{Request.Scheme}://{Request.Host.Value}/{cover}";
            dc.SaveChanges();
            if (dc.SaveChanges() > 0)
                return Ok(new { message = "image de couverture ajoutée", url = manga.UrlCover });
            else
                return Ok(new { message = "échec" });
        }

        /*************************************************************
        ******************************Modification du manga **********/
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
                return Ok(new { message = "manga mis à jour", idManga = manga.Id });
            }
            else
            {
                return NotFound();
            }
        }

        /*************************************************************
       ******************************Modification de la couverture ****/
        [HttpPut("update/cover/{id}")]
        public IActionResult UpdateCover(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            if (manga != null)
            {
                manga.UrlCover = "";
                string pathCover = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
                string editImg = Path.Combine(_env.WebRootPath, "covers", pathCover);
                FileStream stream = System.IO.File.Create(editImg);
                data.Image.CopyTo(stream);
                stream.Close();
                string cover = "covers/" + pathCover;
                manga.UrlCover = $"{Request.Scheme}://{Request.Host.Value}/{cover}";
                dc.SaveChanges();
                return Ok(new { message = "couverture modifiée" });
            }
            else
            {
                return NotFound();
            }
        }

        /*************************************************************
        ******************************Modification de l'image ********/
        [HttpPut("update/image/{id}")]
        public IActionResult UpdateImage(int id, [FromForm] ImageType data)
        {
            DataContext dc = new DataContext();
            Image image = dc.Image.Include(m => m.Manga).FirstOrDefault(i => i.Id == id);
            
            if (image != null)
            {
                image.UrlImage = "";
                Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == image.MangaId);
                string pathImg = Guid.NewGuid().ToString() + "-" + data.Image.FileName;
                string editImg = Path.Combine(_env.WebRootPath, "images", pathImg);
                FileStream stream = System.IO.File.Create(editImg);
                data.Image.CopyTo(stream);
                stream.Close();
                string path = "images/" + pathImg;
                image.MangaId = manga.Id;
                image.UrlImage = $"{Request.Scheme}://{Request.Host.Value}/{path}";
                if (dc.SaveChanges() > 0)
                    return Ok(new { message = "image modifiée" });
                else
                    return Ok(new { message = "erreur" });
            }
            else
            {
                return NotFound();
            }
        }

        /*************************************************************
        ******************************Suppression d'une image ***********/
        [HttpDelete("{id}")]
        public IActionResult DeleteImage(int id)
        {
            DataContext dc = new DataContext();
            Image image = dc.Image.Include(m => m.Manga).FirstOrDefault(i => i.Id == id);
            if(image != null)
            {
                dc.Image.Remove(image);
                dc.SaveChanges();
                return Ok(new { message = "image supprimée" });
            }
            else
            {
                return NotFound();
            }
        }

        /*************************************************************
        ******************************Suppression du manga ***********/
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            if (manga != null)
            {
                dc.Remove(manga);
                dc.SaveChanges();
                return Ok(new { message = "manga supprimé", numero = manga.Id });
                //if (dc.SaveChanges() > 0)
                //    return Ok(new { message = "manga supprimé", numero = manga.Id });
                //else
                //    return Ok(new { message = "erreur de suppression" });
            }
            else
            {
                return NotFound();
            }
        }

        /*************************************************************
        ******************************Liste des images **************/
        [HttpGet("getImage/{id}")]
        public IActionResult GetImages(int id)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            if (manga != null)
            {
                List<Image> listImages = dc.Image.Include(m => m.Manga).Where(x => x.MangaId == id).ToList();
                if (listImages.Count > 0)
                    return Ok(listImages);
                else
                    return Ok(new { message = "pas d'images dans ce manga" });
            }

            else
            {
                return NotFound();
            }
        }

        /************************************************************
        **************Retirer des favoris ***************************/
        [HttpGet("remove/favoris/{id}")]
        public IActionResult RemoveFavoris(int id)
        {
            DataContext dc = new DataContext();
            Manga manga = dc.Manga.Include(c => c.Categorie).Include(i => i.Images).FirstOrDefault(x => x.Id == id);
            string json = HttpContext.Session.GetString("favoris");
            List<Manga> liste = (json != null) ? JsonConvert.DeserializeObject<List<Manga>>(json) : new List<Manga>();
            if (VerifFavoris(id))
            {
                liste.Remove(manga);
                HttpContext.Session.SetString("favoris", JsonConvert.SerializeObject(liste));
                return Ok(new { message = "manga retiré des favoris" });
            }
            else
                return Ok(new { message = "le manga n'est pas dans les favoris" });
        }

        /********Méthode qui renvoie true si on trouve le même manga dans la liste des favoris */
        private bool VerifFavoris(int id)
        {
            string jsonFavoris = HttpContext.Session.GetString("favoris");
            List<Manga> favoris = (jsonFavoris != null) ? JsonConvert.DeserializeObject<List<Manga>>(jsonFavoris) : new List<Manga>();
            bool found = false;
            favoris.ForEach(a =>
            {
                if (a.Id == id)
                {
                    found = true;
                }
            });
            return found;
        }
    }


    /***************Class pour uploader les images et le cover**********/
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