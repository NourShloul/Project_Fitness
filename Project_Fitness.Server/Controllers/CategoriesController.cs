using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.Linq;

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
        // GET: api/Categories/{categoryId}/products
        [HttpGet("{categoryId}/products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
        {
            // Check if the category exists first
            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == categoryId);
            if (!categoryExists)
            {
                return NotFound(new { Message = $"Category with ID {categoryId} not found." });
            }

            // Fetch products for the category
            var products = await _context.Products
                                         .Where(p => p.CategoryId == categoryId)
                                         .ToListAsync();

            // Return an empty list if no products are found
            return Ok(products);
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

        // GET: api/Categories/ByProduct/5
        // Get category by product ID
        [HttpGet("ByProduct/{productId}")]
        public IActionResult GetCategoryByProductId(int productId)
        {
            var category = _context.Products
                .Where(p => p.Id == productId)
                .Include(p => p.Category) // Include the category relationship
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
