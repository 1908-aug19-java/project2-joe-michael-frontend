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
    this.setInfo();
  }

  user: User = this.userService.user
  
  hasName: Boolean;
  showForm: Boolean = false;
  numFollowedTeams;
  numFollowedPlayers;
  favoriteTeam;
  favoritePlayer;
  players;
  teams;

  setInfo(){
    console.log(this.user)
    this.players = JSON.parse(sessionStorage.getItem("followedPlayers"));
    this.teams = JSON.parse(sessionStorage.getItem("followedTeams"));
    this.numFollowedPlayers = this.players.length;
    this.numFollowedTeams = this.teams.length;
    //this.favoriteTeam = this.user.teams[0].name;
    //this.favoritePlayer = this.user.players[0].name
  }

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
