using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
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

        [HttpGet("getorderitem{id}")]
        public IActionResult getorderitem(int id )
        {
            var orderitem =_db.OrderItems
                .Include(u => u.Product).Where(u => u.OrderId == id).Select(x=>new{
                productname=x.Product.ProductName,
                price=x.Price,
                quantity=x.Quantity,

                });
            
            return Ok(orderitem);
        }
        [HttpPost("UpdateUserInfo/{id:int}")]
        public async Task<IActionResult> editPersonalProfile(PersonalInfoDTO personal, int id ) {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            if (personal.UserImage != null && personal.UserImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + personal.UserImage.FileName;

                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);
               

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    await personal.UserImage.CopyToAsync(fileStream);
                }

                

                user.UserImage = $"/images/{uniqueFileName}";
            }

            user.UserName = personal.UserName ?? user.UserName;
            user.UserAddress = personal.UserAddress ?? user.UserAddress;
            user.UserPhone = personal.UserPhone ?? user.UserPhone;

            try
            {
                _db.Users.Update(user);
                await _db.SaveChangesAsync();
                return Ok(new { Message = "User info updated successfully", ImageUrl = user.UserImage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating user info", Error = ex.Message });
            }
            
        }

    }
}
