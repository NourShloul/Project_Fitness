using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            var categories = _context.Categories
                .Select(c => new CategoriesDTO
                {
                    Id = c.Id,
                    CategoryName = c.CategoryName,
                    Description = c.Description,
                    Image = c.Image
                })
                .ToList();

            return Ok(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public IActionResult GetCategory(int id)
        {
            var category = _context.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategoriesDTO
                {
                    Id = c.Id,
                    CategoryName = c.CategoryName,
                    Description = c.Description,
                    Image = c.Image
                })
                .FirstOrDefault();

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // GET: api/Categories/{categoryId}/products
        [HttpGet("{categoryId}/products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
        {
            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == categoryId);
            if (!categoryExists)
            {
                return NotFound(new { Message = $"Category with ID {categoryId} not found." });
            }

            var products = await _context.Products
                                         .Where(p => p.CategoryId == categoryId)
                                         .ToListAsync();

            return Ok(products);
        }

        // GET: api/Categories/ByProduct/5
        [HttpGet("ByProduct/{productId}")]
        public IActionResult GetCategoryByProductId(int productId)
        {
            var category = _context.Products
                .Where(p => p.Id == productId)
                .Include(p => p.Category)
                .Select(p => new CategoriesDTO
                {
                    Id = p.Category.Id,
                    CategoryName = p.Category.CategoryName,
                    Description = p.Category.Description,
                    Image = p.Category.Image
                })
                .FirstOrDefault();

            if (category == null)
            {
                return NotFound("Category for the given product ID not found.");
            }

            return Ok(category);
        }

        // POST: api/Categories
        [HttpPost]
        public IActionResult PostCategory([FromBody] CategoriesDTO categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest("Invalid category data.");
            }

            var category = new Category
            {
                CategoryName = categoryDto.CategoryName,
                Description = categoryDto.Description,
                Image = categoryDto.Image
            };

            _context.Categories.Add(category);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] CategoriesDTO categoryDto)
        {
            if (categoryDto == null || id != categoryDto.Id)
            {
                return BadRequest("Invalid category data.");
            }

            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryDto.CategoryName;
            category.Description = categoryDto.Description;
            category.Image = categoryDto.Image;

            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();

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
