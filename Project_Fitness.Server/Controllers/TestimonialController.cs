﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonialController : ControllerBase
    {
        private readonly MyDbContext _db;

        public TestimonialController(MyDbContext db)
        {
            _db = db;
        }

        [HttpPost("AddTestimonial/{id}")]
        public IActionResult Addtestimonial(int id, [FromBody] AddtestimonialDTO addtestimonialDTO)
        {
            if (id == null || id == 0)
            {
                return BadRequest("The id is null or 0 here");
            }

            var user = _db.Users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var addtestimonial = new Testimonial
            {
                UserId = id,
                UserName = user.UserName,
                Email = user.Email,
                TheTestimonial = addtestimonialDTO.TheTestimonial
            };
            _db.Testimonials.Add(addtestimonial);
            _db.SaveChanges();
            return Ok();
        }
    }
}
