import { FormArray, FormGroup } from '@angular/forms';

export abstract class FormUtils {
  static markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
