import { Component } from '@angular/core';
import { BoardingComponent } from "./boarding/boarding.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [BoardingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'boarding-sequence-ui';
}
