using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ProfileController(MyDbContext db) { _db = db; }
        [HttpGet("Profile/GetUserById/{id}")]
        public IActionResult GetUser(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID");
            }
            var user = _db.Users.Where(p => p.UserId == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("The user not found or doesnt register in the website");
            }
            return Ok(user);
        }
        [HttpGet("Profile/GetOrdersByUserId/{id}")]
        public IActionResult GetOrders(int id) 
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID");
            }
            var order = _db.Orders.Where(p => p.UserId == id).FirstOrDefault();
            if (order == null)
            {
                return NotFound("The user not found or doesnt register in the website");
            }
            return Ok(order);
        }
        [HttpGet("Profile/GetUserSubscriptionsbyUserId/{id}")]
        public IActionResult GetUserSubsriptions(int id) 
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID");
            }
            var user = _db.Subscriptions.Where(p => p.UserId == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("The user not found or doesnt register in the website");
            }
            return Ok(user);
        }
    }
}
