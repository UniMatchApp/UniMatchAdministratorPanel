import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  imports: [],
  templateUrl: './checkbox-input.component.html',
  standalone: true,
  styleUrl: './checkbox-input.component.css'
})
export class CheckboxInputComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
