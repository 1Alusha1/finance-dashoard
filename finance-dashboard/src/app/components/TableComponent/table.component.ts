import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoanService } from "../../services/userLoan.service";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UsersLoan {
  id: number;
  user: string;
  issuance_date: string;
  return_date: string;
  actual_return_date: string;
  body: number;
  percent: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.template.html',
})
export class TableComponent implements OnInit {
  data: UsersLoan[] = [];
  filteredData: UsersLoan[] = [];

  private issuanceDateFilter = new BehaviorSubject<string>('');
  private returnDateFilter = new BehaviorSubject<string>('');
  private overdueFilter = new BehaviorSubject<boolean>(false);

  constructor(private dataService: UserLoanService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (result: UsersLoan[]) => {
        this.data = result;
        console.log('Initial data:', this.data); // Debug log
        this.applyFilters();
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    combineLatest([
      this.issuanceDateFilter,
      this.returnDateFilter,
      this.overdueFilter
    ]).subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredData = this.data.filter(loan => {
      const issuanceDateMatch = this.issuanceDateFilter.value
        ? new Date(loan.issuance_date) >= new Date(this.issuanceDateFilter.value)
        : true;
      const returnDateMatch = this.returnDateFilter.value
        ? new Date(loan.actual_return_date) <= new Date(this.returnDateFilter.value)
        : true;
      const overdueMatch = this.overdueFilter.value
        ? (new Date(loan.return_date) < new Date() && !loan.actual_return_date) || (loan.actual_return_date && new Date(loan.actual_return_date) > new Date(loan.return_date))
        : true;
      return issuanceDateMatch && returnDateMatch && overdueMatch;
    });
    console.log('Filtered data:', this.filteredData); // Debug log
  }

  filterByIssuanceDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = target.value;
    console.log('Issuance date filter set to:', date); // Debug log
    this.issuanceDateFilter.next(date);
  }

  filterByReturnDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = target.value;
    console.log('Return date filter set to:', date); // Debug log
    this.returnDateFilter.next(date);
  }

  filterByOverdue(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    console.log('Overdue filter set to:', checked); // Debug log
    this.overdueFilter.next(checked);
  }
}
