import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order-service.service'; // Assuming you have a service to manage orders

// Define the Order interface
interface Order {
  id: number; // Ensure that id is always a number
  customerName: string;
  quantity: number;
  totalAmount: number;
  status: string;
}

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = []; // Ensure the orders array is typed
  orderForm: FormGroup;
  isEditMode = false; // Track whether we're editing or adding a new order
  currentOrderId: number | null = null; // Track the ID of the order we're editing

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    // Initialize the form group
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      product: ['', Validators.required],
      quantity: [0, Validators.required],
      totalAmount: [0, Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  // Load all orders
  loadOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  // Add or update an order
  onSubmit(): void {
    const orderData = this.orderForm.value;
    if (this.isEditMode && this.currentOrderId) {
      // Update existing order
      this.orderService.updateOrder(this.currentOrderId, orderData).subscribe(() => {
        this.loadOrders();
        this.resetForm();
      });
    } else {
      // Add new order
      this.orderService.addOrder(orderData).subscribe(() => {
        this.loadOrders();
        this.resetForm();
      });
    }
  }

  // Edit an order
  editOrder(order: Order): void {
    this.isEditMode = true;
    this.currentOrderId = order.id;
    this.orderForm.patchValue(order);
  }

  // Delete an order
  deleteOrder(id: number): void {
    if (id) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }

  // Reset form after adding/updating order
  resetForm(): void {
    this.isEditMode = false;
    this.currentOrderId = null;
    this.orderForm.reset({
      customerName: '',
      product: '',
      quantity: 0,
      totalAmount: 0,
      status: 'Pending'
    });
  }
}
