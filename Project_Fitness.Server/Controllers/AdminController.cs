using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        public AdminController(MyDbContext context)
        {
            _context = context;
            
        }
        [HttpPost("AddNewGym")]
        public async Task<IActionResult> AddNewGym()
        {
            var NewGym = new Gym
            {
                GymName =
            };
            return Ok();
        }

    }
}
