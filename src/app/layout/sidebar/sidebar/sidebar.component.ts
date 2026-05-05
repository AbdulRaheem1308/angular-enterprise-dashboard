import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatIconModule, 
    MatTooltipModule,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    '[class.collapsed]': 'isCollapsed'
  }
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Users', icon: 'people', route: '/users', role: 'admin' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  filteredMenuItems = this.menuItems;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((collapsed: boolean) => {
      this.isCollapsed = collapsed;
    });

    this.authService.currentUser$.subscribe((user: any) => {
      if (user) {
        this.filteredMenuItems = this.menuItems.filter(item => !item.role || item.role === user.role);
      }
    });
  }
}
