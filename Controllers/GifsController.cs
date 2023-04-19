using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GIFterWeb.Models;
using GIFterWeb.Data;

namespace GIFterWeb.Controllers
{
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
    }
}
