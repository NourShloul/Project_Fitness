﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> AddNewGym(AddGymDTO add)
        {
            if (add.GymImage != null && add.GymImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {
                    
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + add.GymImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                    
                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await add.GymImage.CopyToAsync(fileStream);
                    }

                    
                    var newGym = new Gym
                    {
                        GymName = add.GymName,
                        GymImage = $"/images/{uniqueFileName}",
                        GymDescription = add.GymDescription,
                        Price = add.Price,
                        GymLocation = add.GymLocation,
                        StartTime = add.StartTime,
                        EndTime = add.EndTime,
                    };

                    
                    _context.Gyms.Add(newGym);
                    await _context.SaveChangesAsync();

                    return Ok(newGym);
                }
                catch (Exception ex)
                {
                    
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }

           
            return BadRequest("Invalid data or missing image.");
        }


    }
}
