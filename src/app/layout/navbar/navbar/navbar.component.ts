import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatDividerModule,
    MatBadgeModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  userName: string = 'Guest';
  notifications: any[] = [];
  unreadCount: number = 0;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  navigateToSettings(tabIndex: number = 0) {
    this.router.navigate(['/settings'], { queryParams: { tab: tabIndex } });
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.loadNotifications();
      }
    });
  }

  loadNotifications() {
    this.dashboardService.getNotifications().subscribe(res => {
      if (res.success) {
        this.notifications = res.data;
        this.unreadCount = this.notifications.filter(n => !n.read).length;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    window.location.reload();
  }
}
