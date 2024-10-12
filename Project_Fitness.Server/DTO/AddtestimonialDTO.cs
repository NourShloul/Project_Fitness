using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.DTO
{
    public class AddtestimonialDTO
    {
        public int? UserId { get; set; }

        public string? TestimonialMessege { get; set; }

        public bool? IsAccept { get; set; }

        public virtual User? User { get; set; }
    }
}
