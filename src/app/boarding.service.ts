import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

export interface SequenceRow { seq: number; bookingId: number; }
export interface SequenceResponse  { sequence: SequenceRow[]; }

@Injectable({
  providedIn: 'root'
})
export class BoardingService {
  private baseUrl = 'https://bus-booking-api-1.onrender.com';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<SequenceRow[]> {
  const fd = new FormData();
  fd.append('file', file);
  return this.http.post<SequenceResponse>(`${this.baseUrl}/api/sequence`, fd)
    .pipe(
      map(res => res.sequence),
      catchError((err: HttpErrorResponse) => {
        const msg = err.error.error || err.message || 'An error occurred while uploading the file';
        return throwError(() => new Error(msg));
      })
    );
  }
}
