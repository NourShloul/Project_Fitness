import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLService, CreatePaymentRequestDto, ExecutePaymentRequestDto } from '../../url/url.service';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']
})
export class GymDetailsComponent implements OnInit {

  parameter: any;
  DetailsArray: any;
  userId:any

  constructor(private _ser: URLService, private _route: ActivatedRoute, private URLService: URLService) { }

  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getDetails(this.parameter);
    this.checkForPaymentExecution();

    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
      console.log('user ID from Cart:', this.userId);
    });
  }


  getDetails(id: any) {
    this._ser.getGymDetails(id).subscribe((data: any) => {
      this.DetailsArray = data;
      console.log(this.DetailsArray, 'details');
    });

  }

  addsubscribtion(price: number, months: number): void {
    debugger
    this._ser['month'].next(months);
    this._ser['month'].subscribe((value) => {
      console.log('Current months value:', value);  // Logs the emitted value
    });
    const request: CreatePaymentRequestDto = {
      redirectUrl: window.location.origin,  
      total: price,  
      message: `Subscription for ${months} months`,
      userId: Number(this.userId)  
    };

    this._ser.createPayment(request).subscribe(
      (response: any) => {
        debugger
        if (response && response.approvalUrl) {
          console.log(response.approvalUrl)
          window.location.href = response.approvalUrl;  
        } else {
          console.error('Payment could not be created.');
        }
      },
      (error: any) => {
        console.error('Error creating payment:', error);
      }
    );
  }
  checkForPaymentExecution(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const payerId = urlParams.get('PayerID');

    if (paymentId && payerId) {
      const executePaymentRequest: ExecutePaymentRequestDto = {
        PaymentId: paymentId,
        PayerId: payerId,
        UserId: 1,  
        GymId: this.DetailsArray?.gymId || null,  
        FitnessClassId: null,  
        StartDate: new Date(),
        EndDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),  
        Total: this.DetailsArray?.price || 0  
      };

      this._ser.executePayment(executePaymentRequest).subscribe(
        (response: any) => {
          console.log('Payment executed and subscription created successfully:', response);
        },
        (error: any) => {
          console.error('Error executing payment:', error);
        }
      );
    }
  }
}
