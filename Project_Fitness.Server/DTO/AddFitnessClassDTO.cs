﻿namespace Project_Fitness.Server.DTO
{
    public class AddFitnessClassDTO
    {

        public string FitnessClassesName { get; set; } = null!;

        public IFormFile? FitnessClassesImage { get; set; }

        public string? FitnessClassesDescription { get; set; }

        public decimal? Price { get; set; }

        public string? FitnessClassesLocation { get; set; }

        public string? Days { get; set; }

        public TimeOnly? StartTime { get; set; }

        public TimeOnly? EndTime { get; set; }
    }
}
