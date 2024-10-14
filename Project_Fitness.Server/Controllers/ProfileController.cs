using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

            var user = _db.Users
                .Include(u => u.Orders) // جلب الطلبات
                .Include(u => u.Subscriptions) // جلب الاشتراكات
           
                .Where(u => u.UserId == id).Select(c=> new {
                    userImage=c.UserImage,
                    username =c.UserName,
                    useremail=c.UserEmail,
                    userphone=c.UserPhone,
                    useraddres=c.UserAddress,
                    orde=c.Orders.Select(o => new {
                    date=o.OrderDate,
                    total=o.TotalAmount,
                    status=o.Status,
                    }).ToList(),
                    name = c.Subscriptions.Select(c => new {
                   gymname= c.Gym.GymName,
                    classname=c.FitnessClasses.FitnessClassesName,
                    startdate=c.SubscriptionStartDate,
                    enddate=c.SubscriptionEndDate,
                    gymprice=c.Gym.Price,
                    classprice=c.FitnessClasses.Price,
                    } ).ToList(),
                
                }).FirstOrDefault();

            if (user == null)
            {
                return NotFound("The user not found or doesn't register in the website");
            }

            //return Ok(new
            //{
            //    User = user,
            //    Orders = user.Orders,
            //    Subscriptions = user.Subscriptions
            //});
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
