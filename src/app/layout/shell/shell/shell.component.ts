import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { FooterComponent } from '../../footer/footer/footer.component';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    SidebarComponent, 
    NavbarComponent, 
    FooterComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  isCollapsed = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.isCollapsed$.subscribe((collapsed: boolean) => {
      this.isCollapsed = collapsed;
    });
  }
}
