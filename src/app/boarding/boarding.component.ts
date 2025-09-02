import { Component } from '@angular/core';
import { BoardingService, SequenceRow } from '../boarding.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-boarding',
  imports: [CommonModule],
  templateUrl: './boarding.component.html',
  styleUrl: './boarding.component.scss'
})
export class BoardingComponent {
  file?: File;
  loading = false;
  error = '';
  rows: SequenceRow[] = [];
  
  constructor(private svc: BoardingService) { }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] || undefined;
    this.error = '';
    this.rows = [];
  }

  onUpload() {
    if(!this.file) {
      this.error = 'Please select a file';
      return;
    }
    this.loading = true;
    this.error = '';
    this.svc.uploadFile(this.file).subscribe({
      next: (rows) => {
        this.rows = rows;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Something went wrong while uploading the file';
        this.loading = false;
      }
    });
  }
}
