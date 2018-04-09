import { FormControl } from '@angular/forms';

export class EmailOrMobileValidator {
  static isValid(control: FormControl) {
    const reEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
      control.value
    );

    const reMobile = /^[0-9]{10}$/.test(
      control.value
    );

    if (reEmail || reMobile) {
      return null;
    }

    return {
      invalidEmail: true
    };
  }
}
