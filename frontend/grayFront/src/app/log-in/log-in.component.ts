import { Component } from '@angular/core';
import { UserState } from '../store/user/user.state';
import { Store } from '@ngrx/store';
import { LoginDTO } from '../models';
import { LoginUser } from '../store/user/user.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private store: Store<UserState>) { }

  user: LoginDTO = {
    username: '',
    password: ''
  }
  errorMessage="";
  onSubmit() {
    if(this.user.username == "" || this.user.password == ""){
      this.errorMessage = "Please fill in all fields";
      return;
    }
    this.store.dispatch(LoginUser({ user: {...this.user} }));
    if(HttpErrorResponse){
      this.errorMessage = "Wrong username or password";
    }
  }

}
