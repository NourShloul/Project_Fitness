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
            var subrecipe = _db.SubRecipes.ToList();
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
        [HttpPost("Nutrition/CreateSubRecipe")]
        public IActionResult CreateSubRecipe([FromForm] SubrecipeDTO subrecipeDTO)
        {
            // تحقق من صحة النموذج
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid SubRecipe");
            }

            // تحديد مسار مجلد الصور
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

            // التحقق من رفع الصورة
            if (subrecipeDTO.SubRecipeImage == null || subrecipeDTO.SubRecipeImage.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            // التحقق من وجود المجلد، وإذا لم يكن موجودًا يتم إنشاؤه
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // إنشاء اسم فريد للصورة بإضافة UUID أو Timestamp
            var uniqueFileName = $"{Path.GetFileNameWithoutExtension(subrecipeDTO.SubRecipeImage.FileName)}_{Guid.NewGuid()}{Path.GetExtension(subrecipeDTO.SubRecipeImage.FileName)}";

            // تحديد مسار الصورة
            var imageFilePath = Path.Combine(uploadFolder, uniqueFileName);

            // رفع الصورة
            using (var stream = new FileStream(imageFilePath, FileMode.Create))
            {
                subrecipeDTO.SubRecipeImage.CopyTo(stream);
            }

            // إنشاء كائن SubRecipe وإضافة البيانات
            var subRecipe = new SubRecipe
            {
                SubRecipeName = subrecipeDTO.SubRecipeName,
                PreparationTime = subrecipeDTO.PreparationTime,
                PreparationSteps = subrecipeDTO.PreparationSteps,
                SubRecipeImage = uniqueFileName, // حفظ اسم الصورة الفريد
                Benefits = subrecipeDTO.Benefits,
                RecipeId = subrecipeDTO.RecipeId// قم بتعيين recipe_id هنا
            };

            // إضافة الوصفة الفرعية إلى قاعدة البيانات
            _db.SubRecipes.Add(subRecipe);
            _db.SaveChanges(); // حفظ التغييرات في قاعدة البيانات بشكل متزامن

            return Ok(subRecipe);
        }

        //[HttpPut("Recipe/UpdateSubrecipe/{id}")]
        //public IActionResult UpdateService([FromForm] SubrecipeDTO response, int id)
        //{
        //    var subrecipe = _db.SubRecipes.FirstOrDefault(c => c.SubRecipeId == id);

        //    if (subrecipe == null)
        //        return NotFound("subrecipe doesn't exist");

        //    if (response.SubRecipeId != subrecipe.RecipeId)
        //        subrecipe.RecipeId = response.RecipeId;

        //    if (!string.IsNullOrEmpty(response.SubRecipeName) && response.SubRecipeName != subrecipe.SubRecipeName)
        //        subrecipe.SubRecipeName = response.SubRecipeName;

        //    if (!string.IsNullOrEmpty(response.PreparationTime) && response.PreparationTime != subrecipe.PreparationTime)
        //        subrecipe.PreparationTime = response.PreparationTime;

        //    if (!string.IsNullOrEmpty(response.PreparationSteps) && response.PreparationSteps != subrecipe.PreparationSteps)
        //        subrecipe.PreparationSteps = response.PreparationSteps;

        //    if (!string.IsNullOrEmpty(response.Benefits) && response.Benefits != subrecipe.Benefits)
        //        subrecipe.Benefits = response.Benefits;


        //    _db.SubRecipes.Update(subrecipe);
        //    _db.SaveChanges();

        //    return Ok(subrecipe);
        //}
        [HttpPut("Nutrition/UpdatesubRecipe/{id}")]
        public IActionResult UpdateRecipe([FromForm] SubrecipeDTO subrecipeDTO, int id)
        {
            // تحقق من صحة النموذج
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Recipe data.");
            }

            // البحث عن الوصفة الموجودة باستخدام ID
            var recipe = _db.SubRecipes.FirstOrDefault(c => c.SubRecipeId == id);
            if (recipe == null)
            {
                return NotFound(" sub Recipe not found.");
            }

            // تحديث بيانات الوصفة
            recipe.SubRecipeName = subrecipeDTO.SubRecipeName ?? recipe.SubRecipeName;
            recipe.PreparationTime = subrecipeDTO.PreparationTime ?? recipe.PreparationTime;
            recipe.PreparationSteps = subrecipeDTO.PreparationSteps ?? recipe.PreparationSteps;
            recipe.Benefits = subrecipeDTO.Benefits ?? recipe.Benefits;

            // التحقق من تحميل صورة جديدة
            if (subrecipeDTO.SubRecipeImage != null && subrecipeDTO.SubRecipeImage.Length > 0)
            {
                // تحديد مسار مجلد الصور
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

                // التحقق من وجود المجلد، وإذا لم يكن موجودًا يتم إنشاؤه
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                // إنشاء اسم فريد للصورة الجديدة
                var uniqueFileName = $"{Path.GetFileNameWithoutExtension(subrecipeDTO.SubRecipeImage.FileName)}_{Guid.NewGuid()}{Path.GetExtension(subrecipeDTO.SubRecipeImage.FileName)}";

                // تحديد مسار الصورة
                var imageFilePath = Path.Combine(uploadFolder, uniqueFileName);

                // رفع الصورة
                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    subrecipeDTO.SubRecipeImage.CopyTo(stream);
                }

                // تحديث اسم الصورة في الوصفة
                recipe.SubRecipeImage = uniqueFileName ?? recipe.SubRecipeImage;
            }

            // تحديث الوصفة في قاعدة البيانات
            _db.SubRecipes.Update(recipe);
            _db.SaveChanges(); // حفظ التغييرات بشكل متزامن

            return Ok(recipe); // إرجاع الوصفة المحدثة
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
