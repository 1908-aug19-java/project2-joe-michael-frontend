import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

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
