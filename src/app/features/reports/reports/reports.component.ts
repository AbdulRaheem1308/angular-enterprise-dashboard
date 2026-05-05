import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    BaseChartDirective
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  kpis = [
    { label: 'Retention Rate', value: '94.2%', icon: 'reusable_item', color: '#6200ee' },
    { label: 'Avg. Session', value: '12m 45s', icon: 'timer', color: '#03dac5' },
    { label: 'Bounce Rate', value: '12.5%', icon: 'trending_down', color: '#ff0266' },
    { label: 'Conversion', value: '3.8%', icon: 'shopping_cart', color: '#fb8c00' },
  ];

  // Pie Chart (Regional Distribution)
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
    }
  };
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America'],
    datasets: [{
      data: [450, 300, 200, 100],
      backgroundColor: ['#6200ee', '#03dac5', '#ff0266', '#fb8c00']
    }]
  };

  // Bar Chart (Year-over-Year Comparison)
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    },
    plugins: {
      legend: { position: 'top' }
    }
  };
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55], label: '2023 Performance', backgroundColor: '#6200ee', borderRadius: 6 },
      { data: [28, 48, 40, 19, 86, 27], label: '2024 (Target)', backgroundColor: '#03dac5', borderRadius: 6 }
    ]
  };

  exportPDF() {
    window.print();
  }

  exportCSV() {
    const headers = ['Metric', 'Value'];
    const rows = this.kpis.map(kpi => `${kpi.label},${kpi.value}`);
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enterprise_report_${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
