# Bus Boarding Sequence
### A web application to generate booking-wise bus boarding sequences based on seat positions and front-entry constraints. Optimized for faster boarding while considering booking IDs for tie-breakers.
## Features
- Upload booking data (BookingID + Seats)
- Automatically generate boarding sequence.
- Front-end friendly UI showing boarding order.
- Optimized for single front entry buses.
- Manual handling for small datasets (A1, B1, A2, B2, etc.).

## Tech Stack
### Frontend: Angular
### Backend: Node.js + Express
### Hosting:
- Frontend: Vercel - `https://bus-booking-api-f-fu2p.vercel.app/`
- Backend: Render - `srv-d2rjuoffte5s738cuegg`

## Project Structure
```bus-boarding-api/                # Root folder
├── backend/                     # Node.js backend
│   ├── index.js                 # Express server & API endpoints
│   ├── package.json
│   ├── package-lock.json
│   └── sample.txt               # Sample booking data
└── frontend/
    └── bus-boarding-sequence-UI/   # Angular frontend
        ├── src/
        │   └── app/
        │       └── boarding/        # Components & services
        └── angular.json
```

## Setup & Installation
### Backend (Node.js)

1) Navigate to backend:
```
cd bus-boarding-api/backend
```
2) Install dependencies:
```
npm install
```
3) Start the serve locally
```
node index.js || npx nodemon index.js
```
4) The API endpoint will run at:
```
The API endpoint will run at:
```
### Frontend (Angular)

1) Navigate to frontend:
```
cd bus-boarding-api/frontend/bus-boarding-sequence-UI
```

2) Install dependencies:
```
npm install
```

3) Serve locally:
```
ng serve
```

#### The Angular app will run at:
```
http://localhost:4200
```

Make sure the backend URL in boarding.service.ts points to your backend (local or Render URL).

### Sample API Request

`POST https://bus-booking-api-1.onrender.com/api/sequence`

- Request Body (JSON):
```
{
  "bookings": [
    { "Booking_ID": 101, "Seats": ["A1","B1"] },
    { "Booking_ID": 120, "Seats": ["A2","B2"] }
  ]
}
```
- Response:
```
[
  { "Seq": 1, "Booking_ID": 120 },
  { "Seq": 2, "Booking_ID": 101 }
]
```
## Test Cases
✅ 1. Empty / Header-only File
```
Booking_ID Seats
```
```
Expected: Error → No valid booking lines found.
(Ensures parser doesn’t break on blank input.)
```
✅ 2. Single Booking, Single Seat
```
1 A1
```
```
Expected: Sequence = 1 → Booking 1
(Simplest case, baseline sanity check.)
```
✅ 3. Single Booking, Multiple Seats
```
10 A5,B5,C5,D5
```
```
Expected: Still just Booking 10 gets sequence 1
(Ensures booking treated as a unit, not seat-wise.)
```
✅ 4. Two Bookings, Same Row, Window vs Aisle
```
1 A5
2 B5
```
```
Expected:

Booking 1 (A5, window) goes before 2 (B5, aisle).
(Tests “window before aisle” rule.)
```
✅ 5. Two Bookings, Different Rows (Back-to-Front)
```
1 A1
2 B20
```
```
Expected:

Booking 2 (row 20) goes before 1 (row 1).
(Tests back-to-front priority.)
````

✅ 6. Tie in Row + Same Seat Type → Booking ID Tie-break
```
101 A5
100 C5
```
```
Both are row 5, different booking IDs.
Expected:

100 before 101 (since smaller Booking_ID wins).
```
✅ 7. Special Demo Case (Manual Optimization)
Only A1, B1, A2, B2 appear.
```
1 A1
2 B1
3 A2
4 B2
```
```
Expected (fixed order):
3 (A2) → 4 (B2) → 1 (A1) → 2 (B1)

(This checks your “if X is standing, Y can’t cross” optimization.)
```
✅ 8. Multi-seat Booking Across Rows
```
1 A1,B10
2 C20
```
```
Booking 1 has seat in row 10 → maxRow = 10.
Booking 2 has row 20 → maxRow = 20.
Expected: 2 before 1.

(Tests that “max row” is used per booking.)
```
✅ 9. Mixed Sides (Left & Right of bus)
```
1 A20
2 D20
3 C5
4 B5
```
```
Both A20 and D20 (windows, row 20) should go before row 5 passengers.
Expected Order:
1 (A20) → 2 (D20) → then row 5 (4 B5 last after 3 C5 since window before aisle).
```
✅ 10. Messy Spacing + Lowercase
```
  22     a10, b10
  21     C5
```
```
Expected: Still parses fine and outputs:

Booking 22 (row 10) before 21 (row 5).

(Tests robustness against formatting + lowercase.)
```
