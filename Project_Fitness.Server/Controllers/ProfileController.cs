using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ProfileController(MyDbContext db) { _db = db; }
        [HttpGet("Profile/GetAllUsers")]
        public IActionResult GetAllUser() {
            var user = _db.Users.ToList();
            if (user == null)
            {
                return NoContent();
            }
            return Ok(user);
        }
        [HttpGet("Profile/GetUserById/{id}")]
        public IActionResult GetProfile(int id) 
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID");
            }
            var user = _db.Recipes.Where(p => p.RecipeId == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("No Recipe found for the given Recipe ID");
            }
            return Ok(user);
        }

    }
}
