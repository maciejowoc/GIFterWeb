using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GIFterWeb.Models;
using GIFterWeb.Data;
using System.Xml.Linq;
using System.Collections;

namespace GIFterWeb.Controllers
{
    [DisableRequestSizeLimit]
    public class GifsController : Controller
    {
        private readonly ApplicationDbContext _db;
        public GifsController(ApplicationDbContext db) {
            _db = db;
        }
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(Gif obj)
        {
            obj.Id = Guid.NewGuid();
            _db.Gifs.Add(obj);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
        [Authorize]
        public IActionResult MyGifs()
        {
            IEnumerable<Gif> objGifList = from gif in _db.Gifs 
                                          where gif.Author == User.Identity.Name 
                                          orderby gif.Created descending
                                          select gif;
            return View(objGifList);
        }

        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var dbGif = _db.Gifs.Find(id);
            _db.Gifs.Remove(dbGif);
            _db.SaveChanges();
            return RedirectToAction("MyGifs");
        }
        [Authorize]
        public IActionResult Edit(Guid id)
        {
            var dbGif = _db.Gifs.Find(id);
            if (dbGif == null) { return NotFound(); }
            return View(dbGif);
        }
        [Authorize]
        [HttpPost]
        public IActionResult EditForm(Gif gif)
        {
            var dbGif = _db.Gifs.Find(gif.Id);
            if (dbGif == null) { return NotFound(); }
            dbGif.Tags = gif.Tags;
            _db.SaveChanges();
            return RedirectToAction("MyGifs");
        }
    }
}
