namespace Project_Fitness.Server.DTO
{
    public class ProductsDTO
    {

        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public string ProductName { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public IFormFile? ImageFile { get; set; }  
        public string? Image { get; set; }
        public decimal? Discount { get; set; }
    }
}
