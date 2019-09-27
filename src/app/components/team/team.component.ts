import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private userService: UserService, private api: ApiService) { }

  loginSub;
  userSub;
  loginStatus: boolean = this.userService.loggedIn;
  user: User = this.userService.user;

  ngOnInit() {

      this.loginSub = this.userService.getLoginStatus().subscribe(item => this.loginStatus = item);
      this.userSub = this.userService.getUser().subscribe(item => this.user = item);
  }

}
