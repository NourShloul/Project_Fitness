using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly MyDbContext _context;
        public CartItemsController(MyDbContext context)
        {
            _context = context;

        }
        [HttpGet("getcartitembyid/{id}")]
        public IActionResult Get(int id) { 
            var cartitem = _context.CartItems.FirstOrDefault(x => x.Id == id);
            if (cartitem == null) {
                return BadRequest();
            }
            return Ok(cartitem);

        }

        [HttpPost("addcartitem")]
        public IActionResult addcartitem([FromBody] CartitemDTO cartitem)
        {
            var cart = new CartItem
            {
                Price = cartitem.Price,
                ProductId = cartitem.ProductId,
                CartId = cartitem.CartId,
                Quantity = cartitem.Quantity,
            };

            _context.CartItems.Add(cart);
            _context.SaveChanges();
            return Ok();

        }
    }
}
