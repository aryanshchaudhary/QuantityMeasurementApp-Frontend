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
  ) {}

  // ✅ LOGIN CHECK
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token !== 'undefined' && token !== 'null';
  }

  // ✅ NAVIGATION
  goToHistory() {
    this.router.navigate(['/history']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/dashboard']);
  }

  // ✅ FILTER TYPES
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

  syncResultUnit() {
    this.unit3 = this.unit1;
  }

  onUnit1Change() {
    this.syncResultUnit();
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
    this.syncResultUnit();
  }

  selectType(type: string) {
    this.selectedType = type;

    const units = this.unitsMap[type];
    this.unit1 = units[0];
    this.unit2 = units[1] || units[0];
    this.unit3 = units[0];
  }

  reset() {
    this.value1 = 0;
    this.value2 = 0;
    this.result = 0;
    this.compareResult = '';
  }

  // ✅ MAIN CALCULATION
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
          .subscribe({
            next: (res) => {
              this.result = res.value;
              this.saveHistory();
              this.cd.detectChanges();
            },
            error: () => alert("Convert failed")
          });
        break;

      case 'Add':
        this.operationService.add(payloadOps)
          .subscribe({
            next: (res) => {
              this.result = res.value;
              this.saveHistory();
              this.cd.detectChanges();
            },
            error: () => alert("Add failed")
          });
        break;

      case 'Subtract':
        this.operationService.subtract(payloadOps)
          .subscribe({
            next: (res) => {
              this.result = res.value;
              this.saveHistory();
              this.cd.detectChanges();
            },
            error: () => alert("Subtract failed")
          });
        break;

      case 'Divide':
        this.operationService.divide(payloadOps)
          .subscribe({
            next: (res) => {
              this.result = res;
              this.saveHistory();
              this.cd.detectChanges();
            },
            error: () => alert("Divide failed")
          });
        break;

      case 'Compare':
        this.operationService.compare(payloadOps)
          .subscribe({
            next: (res) => {
              this.compareResult = res ? 'Equal' : 'Not Equal';
              this.cd.detectChanges();
            },
            error: () => alert("Compare failed")
          });
        break;
    }
  }

  // ✅ SAVE HISTORY (ONLY IF LOGGED IN)
  saveHistory() {
    if (!this.isLoggedIn()) return;

    const payload = {
      name: localStorage.getItem('name'),
      operation: this.selectedAction.toUpperCase(),
      type: this.selectedType,

      value1: this.value1,
      unit1: this.unit1,

      value2: this.value2,
      unit2: this.unit2,

      result: this.result,
      resultUnit: this.unit3
    };

    this.operationService.saveHistory(payload).subscribe({
      next: () => console.log("✅ History saved"),
      error: err => console.error("❌ History error", err)
    });
  }
}
