import {Injectable} from "@angular/core";
import {FormControl, Validators, FormGroup} from "@angular/forms";

@Injectable()
export class FormControlService {

  private hourPattern = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
  private datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;

  constructor(){}

  public commentFormControl(): FormGroup {
    return new FormGroup ({
      commentText: new FormControl('', [Validators.required])
    });
  }

  public registrationFormControl(): FormGroup {
    return new FormGroup ({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public scheduleFormControl(day?: number, start?: string, end?: string): FormGroup {
    return new FormGroup ({
      day: new FormControl((day)?day:0, [
        Validators.required]),
      start: new FormControl((start)?start:'', [
        Validators.required,
        Validators.pattern(this.hourPattern)]),
      end: new FormControl((end)?end:'', [
        Validators.required,
        Validators.pattern(this.hourPattern)])
    }, (formGroup: FormGroup) => {
          if(formGroup.controls.start.pristine || formGroup.controls.end.pristine){
            return null
          }
          return this.startAndEndHourValidation(formGroup.controls.start.value, formGroup.controls.end.value);
    });
  }

  public addEventFormControl(): FormGroup {
    return new FormGroup ({
      name: new FormControl('', [
        Validators.required]),
      start: new FormControl('', [
        Validators.required,
        Validators.pattern(this.hourPattern)]),
      end: new FormControl('', [
        Validators.required,
        Validators.pattern(this.hourPattern)]),
      date: new FormControl('', [
        Validators.required/*, Validators.pattern(this.datePattern)*/]),
    }, (formGroup: FormGroup) => {
      if(formGroup.controls.start.pristine || formGroup.controls.end.pristine){
        return null
      }
      return this.startAndEndHourValidation(formGroup.controls.start.value, formGroup.controls.end.value);
    });
  }

  public startAndEndHourValidation(start: string, end: string){

    let _start = new Date('1990-07-22T'.concat(start));
    let _end = new Date('1990-07-22T'.concat(end));

    if(_end > _start){
      return null
    }

    return {
      startAndEndHour: {
        valid: false
      }
    }
  }

}
