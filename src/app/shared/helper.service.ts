import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export const RegxUserName: RegExp = /^[a-zA-Z]+[0-9]+$/;
export const RegxPhoneNumber: RegExp = /^\d+$/;
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordControl = control.root.get('password');

  if (passwordControl && control.value !== passwordControl.value) {
    return { confirmPassword: true };
  }

  return null;
};

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }




  getErrorMessageforName(form: FormGroup, controlName: string, validationError: any) {

    if (form.get(controlName)?.getError(validationError.name)) {
      return 'Name is requierd';
    }

    return form.get(controlName)?.getError(validationError.pattern) ? 'The userName must contain characters and end with numbers without spaces.' : '';
  }


  getErrorMessageforPasswrod(form: FormGroup, controlName: string, validationError: any) {

    if (form.get(controlName)?.getError(validationError.required)) {
      return 'Passwrod is requierd';
    }

    if (form.get(controlName)?.getError(validationError.maxlength)) {
      return 'MaxLength at max 20 characters long.';
    }
    if (form.get(controlName)?.getError(validationError.minlength)) {
      return 'MinLength at least 6 characters long.';
    }

    return form.get(controlName)?.getError(validationError.pattern) ? 'must include at least one lowercase letter, one uppercase letter, one digit, one special character' : '';
  }


  getErrorMessageforEmail(form: FormGroup, controlName: string, validationError: any) {

    if (form.get(controlName)?.getError(validationError.required)) {
      return 'Email is requierd';
    }

    return form.get(controlName)?.getError(validationError.email) ? 'The email format is invalid.' : '';
  }

  getErrorMessageForPhoneNumber(form: FormGroup, controlName: string, validationError: any) {
    if (form.get(controlName)?.getError(validationError.required)) {
      return 'PhoneNumber is requierd'
    }
    return form.get(controlName)?.getError(validationError.pattern) ? 'Only digit number' : ''
  }

  getErrorMessageForCountry(form: FormGroup, controlName: string, validationError: any) {
    if (form.get(controlName)?.getError(validationError.required)) {
      return 'Country is requierd'
    }
    return ''
  }


}
