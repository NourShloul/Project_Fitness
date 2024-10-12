using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CartsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Carts/{userId}
        // Fetch the cart for a specific user by userId
        [HttpGet("{userId}")]
        public async Task<ActionResult<CartDTO>> GetCartByUser(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .Where(c => c.UserId == userId)
                .Select(c => new CartDTO
                {
                    Id = c.Id,
                    UserId = c.UserId,
                    CreatedDate = c.CreatedDate,
                    CartItems = c.CartItems.Select(ci => new CartitemDTO
                    {
                        ProductId = ci.ProductId,
                        Quantity = ci.Quantity,
                        Price = ci.Price
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            return Ok(cart);
        }
        [HttpPost("add/{userId}")]
        public async Task<IActionResult> AddToCart(int userId, [FromBody] CartitemDTO cartItemDto)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    CreatedDate = DateTime.Now,
                    CartItems = new List<CartItem>()
                };
                _context.Carts.Add(cart);
            }

            var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == cartItemDto.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += cartItemDto.Quantity;
            }
            else
            {
                cart.CartItems.Add(new CartItem
                {
                    ProductId = cartItemDto.ProductId,
                    Quantity = cartItemDto.Quantity,
                    Price = cartItemDto.Price
                });
            }

            await _context.SaveChangesAsync();

            return Ok("Item added to cart successfully");
        }

        // DELETE: api/Carts/remove/{productId}
        // Remove an item from the cart
        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveFromCart(int userId, int productId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem == null)
            {
                return NotFound("Product not found in the cart.");
            }

            cart.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Item removed from cart.");
        }

        // POST: api/Carts/placeOrder/{cartId}
        // Convert cart to order after checkout
        [HttpPost("placeOrder/{cartId}")]
        public async Task<IActionResult> PlaceOrder(int cartId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.Id == cartId);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            if (cart.CartItems == null || !cart.CartItems.Any())
            {
                return BadRequest("Cart is empty.");
            }

            var order = new Order
            {
                UserId = cart.UserId.Value,
                OrderDate = DateTime.Now,
                TotalAmount = cart.CartItems.Sum(item => item.Quantity * item.Price),
                OrderItems = cart.CartItems.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            cart.CartItems.Clear();
            await _context.SaveChangesAsync();

            return Ok("Order placed successfully.");
        }
    }
}
