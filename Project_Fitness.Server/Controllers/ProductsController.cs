using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.IO;

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

        // POST: api/Products
        [HttpPost]
        public IActionResult PostProduct([FromForm] ProductsDTO productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is required.");
            }

            // Check if image file exists
            if (productDto.ImageFile != null && productDto.ImageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique file name for the image
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + productDto.ImageFile.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the image to the server synchronously
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        productDto.ImageFile.CopyTo(fileStream);
                    }

                    // Create a new product with the image path
                    var product = new Product
                    {
                        CategoryId = productDto.CategoryId,
                        ProductName = productDto.ProductName,
                        Description = productDto.Description,
                        Price = productDto.Price,
                        StockQuantity = productDto.StockQuantity,
                        Image = $"/images/{uniqueFileName}", // Save the image path
                        Discount = productDto.Discount
                    };

                    _context.Products.Add(product);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
            else
            {
                return BadRequest("Image file is required.");
            }
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
