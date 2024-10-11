using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubrecipeController : ControllerBase
    {
        private readonly MyDbContext _db;
        public SubrecipeController(MyDbContext db) 
        {
            _db = db;
        }
        [HttpGet("Recipe/GetAllSubrecipe")]
        public ActionResult GetAllSubrecipe() 
        {
            var subrecipe = _db.Recipes.ToList();
            if (subrecipe == null)
            {
                return NoContent();
            }
            return Ok(subrecipe);
        }
        [HttpGet("Recipe/GetSubrecipeById/{id}")]
        public IActionResult GetSubrecipeById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Subrecipe");
            }
            var recipe = _db.SubRecipes.Where(p => p.SubRecipeId == id).FirstOrDefault();
            if (recipe == null)
            {
                return NotFound("No subrecipe found");
            }
            return Ok(recipe);
        }

        [HttpGet("Recipe/GetSubrecipeByRecipeId/{id}")]
        public IActionResult GetSubrecipeByRecipeId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Recipe ID");
            }
            var subrecipe = _db.SubRecipes.Where(p => p.RecipeId == id).ToList();

            if (subrecipe != null && subrecipe.Count > 0)
            {
                return Ok(subrecipe);
            }

            return NotFound("No subrecipe found for the given Recipe ID");
        }

        [HttpPost("Recipe/CreateSubrecipe")]
        public IActionResult CreateSubrecipe([FromForm] SubrecipeDTO subrecipeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var subRecipe = new SubRecipe
            {
                SubRecipeName = subrecipeDTO.SubRecipeName,
                PreparationTime = subrecipeDTO.PreparationTime,
                PreparationSteps = subrecipeDTO.PreparationSteps,
                //SubRecipeImage = subrecipe.SubRecipeImage,
                Benefits = subrecipeDTO.Benefits

            };

            _db.SubRecipes.Add(subRecipe);
            _db.SaveChanges();

            return Ok(subRecipe);
        }
        [HttpPut("Recipe/UpdateSubrecipe/{id}")]
        public IActionResult UpdateService([FromForm] SubrecipeDTO response, int id)
        {
            var subrecipe = _db.SubRecipes.FirstOrDefault(c => c.SubRecipeId == id);

            if (subrecipe == null)
                return NotFound("subrecipe doesn't exist");

            if (response.SubRecipeId != subrecipe.RecipeId)
                subrecipe.RecipeId = response.RecipeId;

            if (!string.IsNullOrEmpty(response.SubRecipeName) && response.SubRecipeName != subrecipe.SubRecipeName)
                subrecipe.SubRecipeName = response.SubRecipeName;

            if (!string.IsNullOrEmpty(response.PreparationTime) && response.PreparationTime != subrecipe.PreparationTime)
                subrecipe.PreparationTime = response.PreparationTime;

            if (!string.IsNullOrEmpty(response.PreparationSteps) && response.PreparationSteps != subrecipe.PreparationSteps)
                subrecipe.PreparationSteps = response.PreparationSteps;

            if (!string.IsNullOrEmpty(response.Benefits) && response.Benefits != subrecipe.Benefits)
                subrecipe.Benefits = response.Benefits;


            _db.SubRecipes.Update(subrecipe);
            _db.SaveChanges();

            return Ok(subrecipe);
        }

        [HttpDelete("Recipe/DeleteSubrecipe/{id}")]
        public IActionResult DeleteSubrecipe(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid Subrecipe");
            }
            var subrecipe = _db.SubRecipes.FirstOrDefault(p => p.SubRecipeId == id);
            if (subrecipe != null)
            {

                _db.SubRecipes.Remove(subrecipe);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("No Subrecipe Found");

        }


    }
}
