import { Component } from '@angular/core';
import { SpinnerService } from '../../core/services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  spinner: string[] = [];
  show: boolean = false;
  hasSpinner: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.getSpinner.subscribe((spinner: string[]): void => {
      this.hasSpinner = spinner.length ? true : false;
      this.spinner = spinner;
      this.processSpinner();
    });
  }

  processSpinner() {
    if (this.spinner.length > 0) {
      const temp: string = JSON.stringify(this.spinner);
      setTimeout(() => {
        this.show = temp === JSON.stringify(this.spinner);
      }, 10);
    } else {
      this.show = false;
    }
  }
}
