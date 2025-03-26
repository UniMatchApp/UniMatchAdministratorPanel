import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  standalone: true,
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Output() searchTextChange = new EventEmitter<string>();

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTextChange.emit(inputValue);
  }
}
