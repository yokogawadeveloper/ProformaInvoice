import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Subscription } from 'rxjs';
import { UserActivityService } from './serivce/user-activity.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  activeUsersCount: number = 0;
  private activeUsersSubscription: Subscription;

  constructor(
    private router: Router,
    private userActivityService: UserActivityService
  ) { }
  title = 'prod';
  ngOnInit() {
    if (environment.maintenance) {
      this.router.navigate(['/maintenance']);
      window.history.pushState(null, '', window.location.href);
    }

    // Subscribe to the active users count observable
    this.activeUsersSubscription = this.userActivityService.getActiveUsersCount().subscribe(
      count => this.activeUsersCount = count
    );
  }

  ngOnDestroy() {
    if (this.activeUsersSubscription) {
      this.activeUsersSubscription.unsubscribe();
    }
  }

}
