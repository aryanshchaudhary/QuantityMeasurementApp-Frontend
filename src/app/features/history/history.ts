import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../core/services/history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnInit {

  historyList: any[] = [];
  loading: boolean = true;

  constructor(
    private historyService: HistoryService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkAuth();
    this.loadHistory();
  }

  // ✅ PROTECT ROUTE
  checkAuth() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/dashboard']); // guest redirect
    }
  }

  loadHistory() {
    const name = localStorage.getItem('name');

    if (!name) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.historyService.getHistory(name).subscribe({
      next: (data: any) => {
        this.historyList = data || [];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
