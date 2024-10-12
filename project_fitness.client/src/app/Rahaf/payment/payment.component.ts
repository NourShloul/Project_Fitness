import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] // Correct spelling here
})
export class PaymentComponent {
  // Properties for storing payment details
  paymentDetails = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };

  onSubmit(): void {
    if (this.isValidPayment()) {
      console.log('Payment Details:', this.paymentDetails);
      alert('Payment submitted successfully!');
  
    } else {
      alert('Please fill out all required fields.');
    }
  }


  isValidPayment(): boolean {
   
    return !!(this.paymentDetails.cardNumber && this.paymentDetails.cardHolder && this.paymentDetails.expiryDate && this.paymentDetails.cvv);
  }

}
