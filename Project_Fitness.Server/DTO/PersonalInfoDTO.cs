namespace Project_Fitness.Server.DTO
{
    public class PersonalInfoDTO
    {
        public string UserName { get; set; } = null!;

        public string UserEmail { get; set; } = null!;

        public IFormFile? UserImage { get; set; }

        public string? UserPassword { get; set; }

        public string? UserPhone { get; set; }

        public string? UserAddress { get; set; }
    }
}
