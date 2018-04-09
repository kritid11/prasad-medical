import { FormGroup } from '@angular/forms';

export class PasswordMatchValidator {

  static isMatching(group: FormGroup){

    //console.log("password check");

    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['confirmPassword'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      //console.log("mismatch");
      group.controls['confirmPassword'].setErrors({"pw_mismatch": true});
      return { "pw_mismatch": true };
    } else{
      return null;
    }
  }

}
