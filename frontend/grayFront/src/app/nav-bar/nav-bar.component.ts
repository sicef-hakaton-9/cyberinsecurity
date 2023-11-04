import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.state';
import { selectUsername } from '../store/user/user.selector';
import { User } from '../models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  username = "";
  constructor(private store:Store<UserState>) {
    this.store.select(selectUsername).subscribe((username) => {
      this.username = username || "";});
   }
   isLoggedin: boolean = false;
   ngOnInit(): void {
     if(this.username != ""){
       this.isLoggedin = true;
     }
   }
}
