import { Component } from '@angular/core';
import { UserState } from '../store/user/user.state';
import { Store } from '@ngrx/store';
import { LoginDTO } from '../models';
import { LoginUser } from '../store/user/user.actions';

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

  onSubmit() {
    this.store.dispatch(LoginUser({ user: {...this.user} }));
  }

}
