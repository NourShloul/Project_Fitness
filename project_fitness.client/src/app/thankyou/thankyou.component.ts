import { Component, OnInit } from '@angular/core';
import { URLService, ExecutePaymentRequestDto } from '../url/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})

export class ThankyouComponent implements OnInit {

  constructor(private _ser: URLService, private router: Router) { }

  ngOnInit(): void {
    this.executePayment();
  }

  executePayment(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const payerId = urlParams.get('PayerID');

    // Check if paymentId and PayerID are present in the URL
    if (paymentId && payerId) {
      const executePaymentRequest: ExecutePaymentRequestDto = {
        PaymentId: paymentId,
        PayerId: payerId,
        UserId: 1,  // Replace with actual user ID
        GymId: 1,   // Replace with actual Gym ID if necessary
        FitnessClassId: null,  // Update with actual FitnessClassId if necessary
        StartDate: new Date(),
        EndDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),  // Example: 3-month subscription
        Total: 50  // Replace with the actual total price
      };

      // Call the API to execute the payment
      this._ser.executePayment(executePaymentRequest).subscribe(
        (response: any) => {
          console.log('Payment executed successfully:', response);
          // You can redirect to a success page or show a success message
        },
        (error: any) => {
          console.error('Error executing payment:', error);
          // Optionally, handle the error and display an error message
        }
      );
    } else {
      console.error('No paymentId or PayerID found in the URL.');
      // Optionally, redirect to an error page or display an error message
    }
  }
}
