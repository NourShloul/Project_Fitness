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
        [HttpPost("AddNewGym")]
        public async Task<IActionResult> AddNewGym() {
            var NewGym = new Gym {
                GymName =
            };
            return Ok();
        }

        [HttpGet("GetAllGym")]
        public async Task<IActionResult> GetAllGym()
        {
            var allgyms = await _context.Gyms.ToListAsync();

            return Ok(allgyms);
        }

        [HttpPut("UpdateGymById/{id}")]
        public async Task<IActionResult> UpdateGymById(int id, [FromForm] AddGymDTO updateGymDTO)
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

            gym.GymName = updateGymDTO.GymName ?? gym.GymName;
            gym.GymLocation = updateGymDTO.GymLocation ?? gym.GymLocation;
            gym.Price = updateGymDTO.Price ?? gym.Price;
            gym.GymDescription = updateGymDTO.GymDescription ?? gym.GymDescription;
            gym.StartTime = updateGymDTO.StartTime ?? gym.StartTime;
            gym.EndTime = updateGymDTO.EndTime ?? gym.EndTime;
            gym.GymImage = updateGymDTO.GymImage ?? gym.GymImage;

            return Ok();
        }

        [HttpDelete("DeletGymById/{id}")]
        public async Task<IActionResult> DeleteGymById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("The id can not be zero or negative value");
            }
            var gym = await _context.Gyms.FirstOrDefaultAsync(x => x.GymId == id);
            if (gym == null)
            {
                return BadRequest("No Gym found with this id");
            }
            _context.Gyms.Remove(gym);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("GetAllFitnessClass")]
        public async Task<IActionResult> GetAllFitnessClass()
        {
            var allFitnessClasses = await _context.FitnessClasses.ToListAsync();

            return Ok(allFitnessClasses);
        }

        [HttpPost("AddNewFitnessClass")]
        public async Task<IActionResult> AddNewFitnessClass() 
        { 
            return Ok();
        }
    }
}
