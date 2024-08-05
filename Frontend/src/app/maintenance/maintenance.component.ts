import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  targetDate: Date;

  ngOnInit() {
    const now = new Date();
    this.targetDate = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours from now

    interval(1000).pipe(
      map(() => this.calculateTimeLeft())
    ).subscribe();
  }

  calculateTimeLeft() {
    const now = new Date();
    const difference = this.targetDate.getTime() - now.getTime();

    if (difference > 0) {
      this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      this.seconds = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0');
    } else {
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
    }
  }
}
