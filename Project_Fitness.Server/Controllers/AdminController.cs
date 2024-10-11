﻿using Microsoft.AspNetCore.Http;
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
            gym.GymImage = updateGymDTO.GymImage.FileName ?? gym.GymImage;

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
        public async Task<IActionResult> AddNewFitnessClass(AddFitnessClassDTO add)
        {
            if (add.FitnessClassesImage != null && add.FitnessClassesImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + add.FitnessClassesImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await add.FitnessClassesImage.CopyToAsync(fileStream);
                    }


                    var fitness = new FitnessClass
                    {
                        FitnessClassesName = add.FitnessClassesName,
                        FitnessClassesImage = $"/images/{uniqueFileName}",
                        FitnessClassesDescription = add.FitnessClassesDescription,
                        Price = add.Price,
                        FitnessClassesLocation = add.FitnessClassesLocation,
                        Days = add.Days,
                        StartTime = TimeOnly.Parse(add.StartTime),
                        EndTime = TimeOnly.Parse(add.EndTime)
                    };


                    _context.FitnessClasses.Add(fitness);
                    await _context.SaveChangesAsync();

                    return Ok(fitness);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }


            return BadRequest("Invalid data or missing image.");

        }
        [HttpPut("UpdateFitnessClassById/{id}")]
        public async Task<IActionResult> UpdateFitnessClassById(int id, [FromForm] AddFitnessClassDTO updateFitnessClassDTO)
        {
            if (id <= 0)
            {
                return BadRequest("The id can not be zero or negative value");
            }
            if (updateFitnessClassDTO.FitnessClassesImage != null && updateFitnessClassDTO.FitnessClassesImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + updateFitnessClassDTO.FitnessClassesImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await updateFitnessClassDTO.FitnessClassesImage.CopyToAsync(fileStream);
                    }


                    var fitness = await _context.FitnessClasses.FirstOrDefaultAsync(x => x.FitnessClassesId == id);

                    fitness.FitnessClassesName = updateFitnessClassDTO.FitnessClassesName ?? fitness.FitnessClassesName;
                    fitness.FitnessClassesName = updateFitnessClassDTO.FitnessClassesName ?? fitness.FitnessClassesName;
                    fitness.Price = updateFitnessClassDTO.Price ?? fitness.Price;
                    fitness.FitnessClassesName = updateFitnessClassDTO.FitnessClassesName ?? fitness.FitnessClassesName;
                    if (!string.IsNullOrEmpty(updateFitnessClassDTO.StartTime))
                    {
                        fitness.StartTime = TimeOnly.Parse(updateFitnessClassDTO.StartTime);
                    }

                    if (!string.IsNullOrEmpty(updateFitnessClassDTO.EndTime))
                    {
                        fitness.EndTime = TimeOnly.Parse(updateFitnessClassDTO.EndTime);
                    }
                    fitness.Days = updateFitnessClassDTO.Days ?? fitness.Days;
                    fitness.FitnessClassesImage = updateFitnessClassDTO.FitnessClassesImage.FileName ?? fitness.FitnessClassesImage;


                    _context.FitnessClasses.Update(fitness);
                    await _context.SaveChangesAsync();

                    return Ok(fitness);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }

            }
            return BadRequest("Invalid data or missing image.");
        }
        [HttpDelete("DeleteFitnessClassById/{id}")]
        public async Task<IActionResult> DeleteFitnessClassById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("The id can not be zero or negative value");
            }
            var fitness = await _context.FitnessClasses.FirstOrDefaultAsync(x => x.FitnessClassesId == id);
            if (fitness == null)
            {
                return BadRequest("No Fitness Class found with this id");
            }
            _context.FitnessClasses.Remove(fitness);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
