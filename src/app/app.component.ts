import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ToastComponent } from "./shared/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastComponent,
    SpinnerComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    BrowserModule,
    HttpClient,
  ]
})
export class AppComponent {

}
