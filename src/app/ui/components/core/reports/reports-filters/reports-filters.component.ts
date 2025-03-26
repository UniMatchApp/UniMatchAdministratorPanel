import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reports-filters',
  templateUrl: './reports-filters.component.html',
  standalone: true,
  styleUrl: './reports-filters.component.css'
})
export class ReportsFiltersComponent {
  @Output() filterChange = new EventEmitter<string>();

  onFilterTypeChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedType);
  }
}
