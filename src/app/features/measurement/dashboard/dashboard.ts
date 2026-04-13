import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OperationService } from '../../../core/services/operation';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  actions = ['Convert', 'Compare', 'Add', 'Subtract', 'Divide'];
  selectedAction = 'Convert';

  types = ['Length', 'Weight', 'Temperature', 'Volume'];
  selectedType = 'Length';

  unitsMap: any = {
    Length: ['Meter', 'Kilometer', 'Centimeter'],
    Weight: ['Kilogram', 'Gram'],
    Temperature: ['Celsius', 'Fahrenheit'],
    Volume: ['Liter', 'Milliliter']
  };

  value1 = 0;
  value2 = 0;
  result = 0;

  unit1 = 'Meter';
  unit2 = 'Kilometer';
  unit3 = 'Meter';

  compareResult: string = '';

  constructor(
    private operationService: OperationService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      this.router.navigate(['/login']);
    }
  }

  // ✅ Sync result unit with first operand
  syncResultUnit() {
    this.unit3 = this.unit1;
  }

  // ✅ When unit1 changes
  onUnit1Change() {
    this.syncResultUnit();
  }

  get filteredTypes(): string[] {
    if (
      this.selectedAction === 'Add' ||
      this.selectedAction === 'Subtract' ||
      this.selectedAction === 'Divide'
    ) {
      return this.types.filter(type => type !== 'Temperature');
    }
    return this.types;
  }

  selectAction(action: string) {
    this.selectedAction = action;

    if (
      (action === 'Add' || action === 'Subtract' || action === 'Divide') &&
      this.selectedType === 'Temperature'
    ) {
      this.selectedType = 'Length';
    }

    this.reset();
    this.syncResultUnit(); // 🔥 important
  }

  selectType(type: string) {
    this.selectedType = type;

    const units = this.unitsMap[type];
    this.unit1 = units[0];
    this.unit2 = units[1] || units[0];
    this.unit3 = units[0];

    this.syncResultUnit(); // 🔥 important
  }

  reset() {
    this.value1 = 0;
    this.value2 = 0;
    this.result = 0;
    this.compareResult = '';
  }

  calculate() {

    const payloadConvert = {
      value: this.value1,
      unit: this.unit1.toUpperCase()
    };

    const payloadOps = [
      { value: this.value1, unit: this.unit1.toUpperCase() },
      { value: this.value2, unit: this.unit2.toUpperCase() }
    ];

    switch (this.selectedAction) {

      case 'Convert':
        this.operationService.convert(payloadConvert, this.unit2)
          .subscribe(res => {
            this.result = res.value;
            this.cd.detectChanges();
          });
        break;

      case 'Add':
        this.operationService.add(payloadOps)
          .subscribe(res => {
            this.result = res.value;
            this.syncResultUnit(); // 🔥 ensure correct unit
            this.cd.detectChanges();
          });
        break;

      case 'Subtract':
        this.operationService.subtract(payloadOps)
          .subscribe(res => {
            this.result = res.value;
            this.syncResultUnit();
            this.cd.detectChanges();
          });
        break;

      case 'Divide':
        this.operationService.divide(payloadOps)
          .subscribe(res => {
            this.result = res;
            this.syncResultUnit();
            this.cd.detectChanges();
          });
        break;

      case 'Compare':
        this.operationService.compare(payloadOps)
          .subscribe(res => {
            this.compareResult = res ? 'Equal' : 'Not Equal';
            this.cd.detectChanges();
          });
        break;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
