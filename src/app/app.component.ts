import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seatsToBook: number = 0;           // Number of seats to book
  bookedSeats: number[] = [];         // List of booked seats
  selectedSeats: number[] = [];       // List of selected seats

  // 0 = available, 1 = booked
  seats: number[][] = [
    [0, 0, 0, 0, 0, 0, 0],  // Row 1
    [0, 0, 0, 0, 0, 0, 0],  // Row 2
    [0, 0, 0, 0, 0, 0, 0],  // Row 3
    [0, 0, 0, 0, 0, 0, 0],  // Row 4
    [0, 0, 0, 0, 0, 0, 0],  // Row 5
    [0, 0, 0, 0, 0, 0, 0],  // Row 6
    [0, 0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0]          // Row 7 (last row, 3 seats)
  ];

  reserveSeats() {
    if (this.seatsToBook < 1 || this.seatsToBook > 7) {
      alert('Please book between 1 and 7 seats');
      return;
    }

    if (this.selectedSeats.length !== this.seatsToBook) {
      alert(`Please select exactly ${this.seatsToBook} seats.`);
      return;
    }

    const availableSeats = this.selectedSeats.filter(seat => 
      this.seats[Math.floor((seat - 1) / 7)][(seat - 1) % 7] === 0
    );

    if (availableSeats.length > 0) {
      for (const seat of availableSeats) {
        this.seats[Math.floor((seat - 1) / 7)][(seat - 1) % 7] = 1; // Mark as booked
      }
      this.bookedSeats.push(...availableSeats);
      alert('Seats booked successfully: ' + availableSeats.join(', '));
      this.selectedSeats = []; // Clear selection after booking
    } else {
      alert('Selected seats are not available');
    }
  }

  toggleSeatSelection(seatNumber: number): void {
    const index = this.selectedSeats.indexOf(seatNumber);
    if (index > -1) {
        this.selectedSeats.splice(index, 1); // Deselect if already selected
    } else {
        if (this.selectedSeats.length < this.seatsToBook && this.seats[Math.floor((seatNumber - 1) / 7)][(seatNumber - 1) % 7] === 0) {
            this.selectedSeats.push(seatNumber); // Select seat
        } else {
            alert('You cannot select more than ' + this.seatsToBook + ' seats or select a booked seat.');
        }
    }
}
}
