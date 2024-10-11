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
    public class CartsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CartsController(MyDbContext context)
        {
            _context = context;
        }

        //// GET: api/Carts
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CartDTO>>> GetCarts()
        //{
        //    var carts = await _context.Carts
        //        .Include(c => c.CartItems)
        //        .Select(c => new CartDTO
        //        {
        //            Id = c.Id,
        //            UserId = c.UserId,
        //            CreatedDate = c.CreatedDate,
        //            CartItems = c.CartItems.Select(ci => new CartitemDTO
        //            {
        //                ProductId = ci.ProductId,
        //                Quantity = ci.Quantity,
        //                Price = ci.Price
        //            }).ToList()
        //        })
        //        .ToListAsync();

        //    return Ok(carts);
        //}

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartDTO>> GetCart(int id)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .Where(c => c.Id == id)
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
                return NotFound();
            }

            return Ok(cart);
        }

        // POST: api/Carts
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // PUT: api/Carts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.Id == id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //// POST: api/Carts/placeOrder/5
        //// Place an order and empty the cart after that
        //[HttpPost("placeOrder/{cartId}")]
        //public async Task<IActionResult> PlaceOrder(int cartId)
        //{
        //    var cart = await _context.Carts
        //        .Include(c => c.CartItems)
        //        .FirstOrDefaultAsync(c => c.Id == cartId);

        //    if (cart == null)
        //    {
        //        return NotFound("Cart not found.");
        //    }

        //    if (cart.CartItems == null || !cart.CartItems.Any())
        //    {
        //        return BadRequest("Cart is empty.");
        //    }

        //    // Create the order
        //    var order = new Order
        //    {
        //        UserId = cart.UserId.Value,
        //        OrderDate = DateTime.Now,
        //        TotalAmount = cart.CartItems.Sum(item => item.Quantity * item.Price),
        //        OrderItem = cart.CartItems.Select(item => new OrderItem
        //        {
        //            ProductId = item.ProductId,
        //            Quantity = item.Quantity,
        //            Price = item.Price
        //        }).ToList()
        //    };

        //    // Add the order and remove the cart items (empty the cart)
        //    _context.Orders.Add(order);
        //    cart.CartItems.Clear();
        //    await _context.SaveChangesAsync();

        //    return Ok("Order placed successfully and cart is now empty.");
        //}

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
