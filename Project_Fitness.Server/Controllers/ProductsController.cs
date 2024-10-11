using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.Linq;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProductsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _context.Products
                .Select(p => new ProductsDTO
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    ProductName = p.ProductName,
                    Description = p.Description,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    Image = p.Image,
                    Discount = p.Discount
                }).ToList();

            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _context.Products
            .Where(p => p.Id == id)
                .Select(p => new ProductsDTO
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    ProductName = p.ProductName,
                    Description = p.Description,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    Image = p.Image,
                    Discount = p.Discount
                }).FirstOrDefault();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // GET: api/Products/ByCategory/5
        // Get products by CategoryId
        [HttpGet("ByCategory/{categoryId}")]
        public IActionResult GetProductsByCategory(int categoryId)
        {
            var products = _context.Products
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new ProductsDTO
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    ProductName = p.ProductName,
                    Description = p.Description,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    Image = p.Image,
                    Discount = p.Discount
                }).ToList();

            return Ok(products);
        }

        // POST: api/Products
        [HttpPost]
        public IActionResult PostProduct([FromForm] ProductsDTO productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is required.");
            }

            var product = new Product
            {
                CategoryId = productDto.CategoryId,
                ProductName = productDto.ProductName,
                Description = productDto.Description,
                Price = productDto.Price,
                StockQuantity = productDto.StockQuantity,
                Image = productDto.Image,
                Discount = productDto.Discount
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, productDto);
        }

        // POST: api/Products/ByCategory
        // Post products by CategoryId
        [HttpPost("ByCategory")]
        public IActionResult PostProductByCategory([FromForm] ProductsDTO productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is required.");
            }

            var product = new Product
            {
                CategoryId = productDto.CategoryId,
                ProductName = productDto.ProductName,
                Description = productDto.Description,
                Price = productDto.Price,
                StockQuantity = productDto.StockQuantity,
                Image = productDto.Image,
                Discount = productDto.Discount
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetProductsByCategory), new { categoryId = product.CategoryId }, productDto);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
