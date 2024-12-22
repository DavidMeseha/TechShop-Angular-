import { Component, forwardRef, Input } from '@angular/core';
import { cn } from '../../../lib/utils';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ControlValueAccessor,
} from '@angular/forms';
import { FieldError } from '../../../types';

@Component({
  selector: 'app-form-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextInputComponent),
      multi: true,
    },
  ],
})
export class FormTextInputComponent implements ControlValueAccessor {
  @Input() className: string = '';
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() errorMessage: FieldError = false;

  @Input() inputName = '';
  @Input() inputPlaceholder = '';
  @Input() inputType = 'text';
  @Input() FormControlName = '';

  cn = cn;

  // Component properties
  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Method to write value from the form model to the view
  writeValue(value: string): void {
    this.value = value;
  }

  // Method to register a callback function that should be called when the value changes
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Method to register a callback function that should be called when the control is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Optional method to set the disabled state of the control
  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  // Method to handle input changes
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value); // Notify the form control of the change
  }

  // Method to handle blur event
  onInputBlur(): void {
    this.onTouched(); // Notify the form control that the input has been touched
  }
}
