namespace Project_Fitness.Server.DTO
{
    public class SubrecipeDTO
    {
        public int SubRecipeId { get; set; }
        public int RecipeId { get; set; }
        public string SubRecipeName { get; set; } = null!;

        public string? PreparationTime { get; set; }

        public string? PreparationSteps { get; set; }

        public string? SubRecipeImage { get; set; }

        public string? Benefits { get; set; }
    }
}
