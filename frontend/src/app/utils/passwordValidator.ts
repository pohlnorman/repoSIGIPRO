import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password:string=control.value;
        if(password===null || password === undefined || password===""){
            return {passwordInvalido:{required:true,format:false,dv:false}};
        }

        return !validatePassword(password) ? {passwordInvalido:{required:false,format:false,dv:true}} : null;
    };
}
    
function validatePassword(password: string): boolean {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[\W_]/;
  
    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasDigit.test(password) &&
      hasSpecialChar.test(password)
    );
  }