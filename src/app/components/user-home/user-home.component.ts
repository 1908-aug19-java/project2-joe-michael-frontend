import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.checkName();
  }


  user: User = this.userService.user
  
  hasName: Boolean;
  showForm: Boolean = false;

  checkName(){
    console.log(this.user)
    if(this.user.name == null || this.user.name == ""){
      this.hasName = false;
    }
    else{
      this.hasName = true;
    }
  }

  showNameForm() {
    this.showForm = true;
  }

  setName(){
    console.log(this.user.name)
    this.showForm = false;
    this.checkName();
    this.userService.updateUser();
  }

}
