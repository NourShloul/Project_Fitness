using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Project_Fitness.Server.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonialController : ControllerBase
    {
        private readonly MyDbContext _db;

        public TestimonialController(MyDbContext db)
        {
            _db = db;
        }


    }
}
