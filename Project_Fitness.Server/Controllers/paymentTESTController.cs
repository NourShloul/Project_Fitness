using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayPal.Api;
using Project_Fitness.Server.Models;
using Project_Fitness.Server.services;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class paymentTESTController : ControllerBase
    {
        private readonly MyDbContext _db;
        string _redirectUrl;
        private PayPalPaymentService payPalService;
        public paymentTESTController(MyDbContext db, IConfiguration config, PayPalPaymentService paypal)
        {

            _db = db;

            _redirectUrl = config["PayPal:RedirectUrl"] + "/api/Categories";

            payPalService = paypal;

        }
        [HttpGet("checkout")]
        public IActionResult CreatePayment()
        {
            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");


            var totalPrice = 100;
            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, 1);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId)
        {
            //var order = cartRepository.Checkout(userId, paymentId);
            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID);
            const string script = "<script>window.close();</script>";
            return Content(script, "text/html");
        }

        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }
    }
}
