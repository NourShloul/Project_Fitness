using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;


namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class registeruserController : ControllerBase
    {
        private readonly MyDbContext _Db;
        public registeruserController(MyDbContext db) 
        {
            _Db = db;
        }
        [HttpPost("register")]
        public IActionResult regester([FromForm] registerDTO dto)
        {
            if (dto.UserPassword != dto.confirmPassword)
            {
                return BadRequest("Passwords do not match");
            }
            var existingUser = _Db.Users.FirstOrDefault(u => u.UserEmail == dto.UserEmail);
            if (existingUser != null)
            {
                return BadRequest("Email already exists");
            }
            //byte[] passwordHash;
            //byte[] passwordSalt;
            passwordHasherMethod.CreatePasswordHash(dto.UserPassword, out string passwordHash, out string passwordSalt);

            var newuser = new User
            {
                UserName = dto.UserName,
                UserEmail = dto.UserEmail,
                UserPassword=dto.UserPassword,
                CreatedAt = DateTime.Now,
                HashPassword = passwordHash,
                SaltPassword = passwordSalt

            };
            _Db.Users.Add(newuser);
            _Db.SaveChanges();

            return Ok();
        }

        [HttpPost("LOGIN")]
        public IActionResult login([FromForm] loginuserDTO dto)
        {
            var user = _Db.Users.FirstOrDefault(x => x.UserEmail == dto.UserEmail);

            if (user == null)
            {
                return BadRequest();
            }

            if (user == null || !passwordHasherMethod.VerifyPassword(dto.UserPassword, user.HashPassword, user.SaltPassword))
            {
                return Unauthorized("Invalid username or password.");
            }

            // إعادة البيانات مع is_admin
            return Ok(new { user.UserEmail, user.IsAdmin ,user.UserId });
        }


    }
}
