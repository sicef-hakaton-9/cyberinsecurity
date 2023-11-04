import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.state';
import { RegisterUser } from '../store/user/user.actions';
import { SignupDTO } from '../models';

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

  onSubmit() {
    this.store.dispatch(RegisterUser({ user: {...this.newUser} }));
  }
}
