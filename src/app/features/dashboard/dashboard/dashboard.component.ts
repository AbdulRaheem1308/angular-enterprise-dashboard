import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from '../../../core/services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../../users/user-dialog/user-dialog.component';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  stats: any[] = [];
  recentActivity: any[] = [];
  systemHealth = {
    api: 'online',
    db: 'online',
    storage: 'online'
  };

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  inviteUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { user: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(() => {
          window.location.reload(); // Refresh to see activity
        });
      }
    });
  }

  exportReport() {
    window.print();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.dashboardService.getStats().subscribe(res => {
      if (res.success) {
        this.stats = [
          { title: 'Total Revenue', value: `$${res.data.revenue.toLocaleString()}`, icon: 'payments', trend: '+12.5%', color: 'primary' },
          { title: 'Active Users', value: res.data.activeUsers.toString(), icon: 'person', trend: '+5.2%', color: 'accent' },
          { title: 'New Signups', value: res.data.newSignups.toString(), icon: 'person_add', trend: '+8.1%', color: 'warn' },
          { title: 'Growth Rate', value: `${res.data.growth}%`, icon: 'trending_up', trend: '+2.4%', color: 'success' },
        ];

        // Map dynamic chart data
        if (res.data.chartData) {
          this.lineChartData = {
            labels: res.data.chartData.labels,
            datasets: res.data.chartData.datasets.map((ds: any) => ({
              ...ds,
              fill: true,
              tension: 0.4,
              borderColor: '#6200ee',
              backgroundColor: 'rgba(98, 0, 238, 0.1)',
              pointBackgroundColor: '#6200ee',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#6200ee'
            }))
          };
        }
      }
    });

    // Mock Recent Activity (Typically fetched from API)
    this.recentActivity = [
      { user: 'Admin User', action: 'Created new user', target: 'Jane Smith', time: '5 mins ago', icon: 'person_add', color: 'primary' },
      { user: 'System', action: 'Backup completed', target: 'Cloud Storage', time: '2 hours ago', icon: 'cloud_done', color: 'success' },
      { user: 'Manager User', action: 'Updated report', target: 'Q2 Revenue', time: '4 hours ago', icon: 'description', color: 'accent' },
      { user: 'Security', action: 'Blocked suspicious IP', target: '192.168.1.1', time: '1 day ago', icon: 'security', color: 'warn' },
    ];
  }

  // Charts Config
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{ data: [0,0,0,0,0,0,0], label: 'Revenue' }]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1e1e1e',
        titleColor: '#fff',
        bodyColor: '#ccc'
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' } }
    }
  };

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Enterprise', 'SaaS', 'Consulting'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: ['#6200ee', '#03dac5', '#ff0266']
    }]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
}
