import { Component, ViewChild } from '@angular/core';
import ToastController from '../../core/controllers/toast.controller';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @ViewChild('success', { static: false }) public success: any;
  @ViewChild('warning', { static: false }) public warning: any;
  @ViewChild('danger', { static: false }) public danger: any;

  constructor(
    private toastController: ToastController
  ) { }

  ngAfterViewInit(): void {
    this.toastController.addComponent({
      success: this.success,
      warning: this.warning,
      danger: this.danger
    });
  }
}
