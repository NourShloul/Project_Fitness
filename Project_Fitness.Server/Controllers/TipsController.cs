using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public TipsController(MyDbContext db) { _db = db; }

        [HttpGet("Nutrition/GetAllTips")]
        public IActionResult GetAllTips()
        {
            var tip = _db.Tips.ToList();
            if (tip == null)
            {
                return NoContent();
            }
            return Ok(tip);

        }

        [HttpGet("Nutrition/GetTipsById/{id}")]
        public IActionResult GetTipsById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Tip ID");
            }
            var tip = _db.Tips.Where(p => p.TipsId == id).FirstOrDefault();
            if (tip == null)
            {
                return NotFound("No Tip found for the given Tip ID");
            }
            return Ok(tip);
        }
        [HttpPost("Nutrition/CreateTips")]
        public IActionResult CreateTips([FromForm] TipDTO tipDTO)
        {
            // تحديد مسار مجلد الصور
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

            // التحقق من رفع الصورة
            if (tipDTO.TipsImage == null || tipDTO.TipsImage.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            // التحقق من صحة النموذج قبل حفظ البيانات
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Tip data.");
            }

            // التحقق من وجود المجلد، وإذا لم يكن موجودًا يتم إنشاؤه
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // تحديد مسار الصورة
            var imageFilePath = Path.Combine(uploadFolder, tipDTO.TipsImage.FileName);

            // رفع الصورة إلى المجلد المحدد
            using (var stream = new FileStream(imageFilePath, FileMode.Create))
            {
                tipDTO.TipsImage.CopyTo(stream);
            }

            // إنشاء كائن Tip وإضافة البيانات
            var tip = new Tip
            {
                TipsName = tipDTO.TipsName,
                TipsImage = tipDTO.TipsImage.FileName, // حفظ اسم الصورة في قاعدة البيانات
                TipsDescription = tipDTO.TipsDescription
            };

            // إضافة الـ Tip إلى قاعدة البيانات
            _db.Tips.Add(tip);
            _db.SaveChanges(); // حفظ التغييرات بشكل متزامن

            return Ok(tip); // إرجاع كائن الـ Tip المضاف
        }
        [HttpPut("Nutrition/UpdateTips/{id}")]
        public IActionResult UpdateTips([FromForm] TipDTO tipDTO, int id)
        {
            // تحديد مسار مجلد الصور
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageTips");

            // البحث عن النصيحة الموجودة باستخدام ID
            var tip = _db.Tips.FirstOrDefault(c => c.TipsId == id);
            if (tip == null) return NotFound(); // إذا لم يتم العثور على النصيحة، نرجع NotFound

            // تحديث بيانات النصيحة
            tip.TipsName = tipDTO.TipsName ?? tip.TipsName; // تحديث الاسم إذا كان موجودًا
            tip.TipsDescription= tipDTO.TipsDescription ?? tip.TipsDescription;
            // تحديث الصورة إذا تم تقديم صورة جديدة
            if (tipDTO.TipsImage != null)
            {
                // تحقق من وجود المجلد، وإذا لم يكن موجودًا يتم إنشاؤه
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                // تحديد مسار الصورة
                var imageFilePath = Path.Combine(uploadFolder, tipDTO.TipsImage.FileName);

                // تحميل الصورة
                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    tipDTO.TipsImage.CopyTo(stream); // حفظ الصورة بشكل متزامن
                }

                // تحديث مسار الصورة في الكائن
                tip.TipsImage = tipDTO.TipsImage.FileName ?? tip.TipsImage; // تأكد من إضافة هذا الحقل في TipDTO و Tip
            }

            // تحديث النصيحة في قاعدة البيانات
            _db.Tips.Update(tip);
            _db.SaveChanges(); // حفظ التغييرات بشكل متزامن

            return Ok(tip); // إرجاع النصيحة المحدثة
        }


        [HttpDelete("Nutritiom/DeleteTips/{id}")]
        public IActionResult DeleteTips(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid Tips");
            }
            var tip = _db.Tips.FirstOrDefault(p => p.TipsId == id);
            if (tip != null)
            {

                _db.Tips.Remove(tip);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("No Tip found");


        }

        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {

            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();
        }
    }
}
