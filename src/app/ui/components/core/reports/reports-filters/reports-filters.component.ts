import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reports-filters',
  templateUrl: './reports-filters.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './reports-filters.component.css'
})
export class ReportsFiltersComponent {
  @Output() filterChange = new EventEmitter<{
    type: string;
    fromDate: string | null;
    toDate: string | null;
  }>();

  selectedType: string = 'ALL';
  fromDate: string | null = null;
  toDate: string | null = null;

  onFilterTypeChange(event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.emitFilterChange();
  }

  onDateChange() {
    if (this.onValidateDate()) {
      this.emitFilterChange();
    }
  }

  private emitFilterChange() {
    this.filterChange.emit({
      type: this.selectedType,
      fromDate: this.fromDate,
      toDate: this.toDate
    });
  }

  onValidateDate(): boolean {
    const from = this.fromDate ? new Date(this.fromDate) : null;
    const to = this.toDate ? new Date(this.toDate) : null;

    if (!from && !to) {
      return true;
    }

    if (from && !to) {
      alert('Please select an end date.');
      return false;
    }

    if (!from && to) {
      alert('Please select a start date.');
      return false;
    }

    if (from && to && from > to) {
      alert('The start date cannot be later than the end date.');
      return false;
    }
    return true;
  }
}
