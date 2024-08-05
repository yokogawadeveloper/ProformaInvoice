import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserActivityService } from '../serivce/user-activity.service'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  
  private activeUsersSubscription: Subscription;
  public menuShow = false;
  activeUsersCount: number = 0;
  suser: any;
  username: any;
  isadmin: any;
  is_special: any;
  admin: string;

  constructor(
    public router: Router,
    private userActivityService: UserActivityService
  ) {
    // this.username = sessionStorage.getItem("username");
  }

  ngOnInit(): void {
    this.suser = sessionStorage.getItem("suser");
    this.isadmin = sessionStorage.getItem("Isadmin");
    this.is_special = sessionStorage.getItem("is_special");

    // Subscribe to the active users count observable
    this.activeUsersSubscription = this.userActivityService.getActiveUsersCount().subscribe(
      count => this.activeUsersCount = count
    );

  }

  logoutuser() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("active");
    sessionStorage.removeItem("suser");
    sessionStorage.removeItem("Isadmin");
    sessionStorage.removeItem("is_special");
    sessionStorage.removeItem("user_id");
    this.router.navigateByUrl('/proforma/login');
  }

  ngOnDestroy() {
    if (this.activeUsersSubscription) {
      this.activeUsersSubscription.unsubscribe();
    }
  }

}
