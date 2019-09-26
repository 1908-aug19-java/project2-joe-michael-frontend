import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private userService: UserService) { }

  loginSub;
  userSub;
  loginStatus: boolean = this.userService.loggedIn;
  user: User = this.userService.user;

  ngOnInit() {

      this.loginSub = this.userService.getLoginStatus().subscribe(item => this.loginStatus = item);
      this.userSub = this.userService.getUser().subscribe(item => this.user = item);
  }

}
