using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GIFterWeb.Models;
using GIFterWeb.Data;
using System.Xml.Linq;

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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(Gif obj)
        {
            obj.Id = Guid.NewGuid();
            _db.Gifs.Add(obj);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult MyGifs()
        {
            IEnumerable<Gif> objGifList = from gif in _db.Gifs 
                                          where gif.Author == User.Identity.Name 
                                          orderby gif.Created descending
                                          select gif;
            return View(objGifList);
        }
    }
}
