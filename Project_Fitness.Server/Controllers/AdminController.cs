using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
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
        //[HttpPost("AddNewGym")]
        //public async Task<IActionResult> AddNewGym() {
        //    var NewGym = new Gym {
        //        GymName =
        //    };
        //    return Ok();
        //}
        [HttpGet("GetAllGym")]
        public async Task<IActionResult> GetAllGym()
        {
            var allgyms = await _context.Gyms.ToListAsync();

            return Ok(allgyms);
        }
        [HttpPut("UpdateGym/{id}")]
        public async Task<IActionResult> UpdateGym(int id, AddGymDTO updateGymDTO)
        {
            if (id <= 0)
            {
                return BadRequest("the id can not be zero or negative value");
            }
            var gym = await _context.Gyms.FirstOrDefaultAsync(x => x.GymId == id);
            if (gym == null)
            {
                return BadRequest("There is no Gym founded");
            }
            

          return  Ok();
        }
    }
}
