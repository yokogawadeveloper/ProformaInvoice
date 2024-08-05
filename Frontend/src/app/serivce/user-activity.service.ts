import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  private activeUsersSubject = new BehaviorSubject<number>(0);
  private readonly USER_ACTIVITY_KEY = 'user_activity';
  private readonly ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private readonly CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.startActivityTracking();
    this.checkActiveUsers();
  }

  private startActivityTracking() {
    window.addEventListener('mousemove', () => this.updateUserActivity());
    window.addEventListener('keypress', () => this.updateUserActivity());
    window.addEventListener('click', () => this.updateUserActivity());
    window.addEventListener('scroll', () => this.updateUserActivity());
    window.addEventListener('focus', () => this.updateUserActivity());
    window.addEventListener('blur', () => this.updateUserActivity());
  }

  private updateUserActivity() {
    const currentTime = Date.now();
    localStorage.setItem(this.USER_ACTIVITY_KEY, currentTime.toString());
    this.checkActiveUsers();
  }

  private checkActiveUsers() {
    const currentTime = Date.now();
    let activeUsers = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.USER_ACTIVITY_KEY)) {
        const lastActivity = parseInt(localStorage.getItem(key)!, 10);
        if (currentTime - lastActivity <= this.ACTIVITY_TIMEOUT) {
          activeUsers++;
        } else {
          localStorage.removeItem(key);
        }
      }
    }

    this.activeUsersSubject.next(activeUsers);

    setTimeout(() => this.checkActiveUsers(), this.CHECK_INTERVAL);
  }

  getActiveUsersCount(): Observable<number> {
    return this.activeUsersSubject.asObservable();
  }
}
