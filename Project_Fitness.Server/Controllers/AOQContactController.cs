﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AOQContactController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AOQContactController (MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllContacts")]
        public IActionResult GetAllContacts()
        {
            var Con=_db.ContactUs.ToList();
            return Ok(Con);
        }


        [HttpGet("GetByDesc")]
        public IActionResult GetContact() 
        {
            var contacts = _db.ContactUs.OrderByDescending(c => c.CreatedAt).ToList();

            return Ok(contacts);
        }

        [HttpPost("AddContact")]
        public IActionResult AddMessage([FromForm] ContactRequest request)
        {
            var newContact = new ContactU
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Message = request.Message,
            };
            _db.ContactUs.Add(newContact);
            _db.SaveChanges();
            return Ok(new { message = "Contact added successfully" });
        }

    }
}
