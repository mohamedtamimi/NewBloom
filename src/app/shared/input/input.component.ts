import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
 
})
export class InputComponent implements ControlValueAccessor {
  
  @Input() title: string
  @Input() number: number =0
  @Input() title2: string
  @Input() type: string='text'
  @Input() class: string
  @Input() required: boolean=false
  @Input() plus: boolean=false
  @Input() placeholder: string
  @Input() hideTitle: boolean
  @Input() disabled: boolean

  @ViewChild('op') op: any;

  constructor() { }
  innervalue
  innernumber
 

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get value(): any {
    return this.innervalue;
  }

  set value(v: any) {
    if (v !== this.innervalue) {
      this.innervalue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innervalue) {
      this.innervalue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public validate(c: FormControl) {
    return c.errors;
  }

  onKeyEnter(event) {
    if (event.keyCode === 13) {
      this.op.hide()
      this.value=+this.number
      
    }
  }

}
