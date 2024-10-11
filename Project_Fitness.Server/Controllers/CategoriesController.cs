using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoriesController(MyDbContext context)
        {
            _context = context;
        }


        // GET: api/Categories
        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public IActionResult GetCategory(int id)
        {
            var category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // POST: api/Categories
        [HttpPost]
        public IActionResult PostCategory([FromBody] Category category)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Add(category);
                _context.SaveChanges();

                return CreatedAtAction("GetCategory", new { id = category.Id }, category);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public IActionResult PutCategory(int id, [FromBody] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest("Category ID mismatch.");
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
