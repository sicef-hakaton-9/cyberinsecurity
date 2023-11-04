import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.state';
import { RegisterUser } from '../store/user/user.actions';
import { SignupDTO } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private store: Store<UserState>) { }

  newUser : SignupDTO = {
    name: '',
    username: '',
    email: '',
    password: ''
  };
  confirmPassword: string = "";
  errorMessage="";
  passwordValidationMessage = "";
  onSubmit() {
    this.passwordValidationMessage = "";
    if(this.newUser.password.length < 8 || !/\d/.test(this.newUser.password)){
      this.passwordValidationMessage = "Password must at least 8 characters long and contain at least one number";
      return;
    }
    else if(this.newUser.password != this.confirmPassword){
      this.errorMessage = "Passwords do not match";
      return;
    }
    else if(this.newUser.username == "" || this.newUser.password == "" || this.newUser.email == ""){
      this.errorMessage = "Please fill in all fields";
      return;
    }
    this.store.dispatch(RegisterUser({ user: {...this.newUser} }));
    if(HttpErrorResponse)
    {
      this.errorMessage = "Username or email already exists";
    }
  }
}
