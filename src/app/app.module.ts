import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModel, FormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';
import { UserTeamNavComponent } from './user-team-nav/user-team-nav.component';
import { UserWagerComponent } from './user-wager/user-wager.component';
import { UserPredictionsComponent } from './user-predictions/user-predictions.component';
import { UserMatchesComponent } from './user-matches/user-matches.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserFantasyTeamsComponent } from './user-fantasy-teams/user-fantasy-teams.component';
import { UserFollowedTeamsComponent } from './user-followed-teams/user-followed-teams.component';
import { UserFollowedPlayersComponent } from './user-followed-players/user-followed-players.component';
import { UserMatchComponent } from './user-match/user-match.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { MatchesFilterPipe } from './matches-filter.pipe';

const appRoutes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoLoginGuard]
    },

    {
        path: 'teams/:id',
        component: TeamComponent
    },

    {
        path: 'teams',
        component: TeamsComponent
    },

    {
        path: 'user',
        component: UserPageComponent,
        canActivate: [LoginGuard],
        children: [

            {
                path: 'home',
                component: UserHomeComponent
            },

            {
                path: 'fantasy-teams',
                component: UserFantasyTeamsComponent
            },

            {
                path: 'followed-teams',
                component: UserFollowedTeamsComponent
            },

            {
                path: 'followed-players',
                component: UserFollowedPlayersComponent
            },

            {
                path: 'wagers',
                component: UserWagerComponent
            },

            {
                path: 'matches',
                component: UserMatchesComponent,
            },

            {
                path: 'matches/:id',
                component: UserMatchComponent
            },

            {
                path: 'predictions',
                component: UserPredictionsComponent
            },

            {
                path: '**',
                redirectTo: 'home'
            }

        ]
    },

    {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [NoLoginGuard]
    },

    {
        path: 'landing',
        component: LandingComponent
    },

    {
        path: '#',
        redirectTo: 'landing',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: 'landing',
        pathMatch: 'full'
    }

];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        UserHomeComponent,
        SignUpComponent,
        LandingComponent,
        UserTeamNavComponent,
        UserWagerComponent,
        UserPredictionsComponent,
        UserMatchesComponent,
        UserPageComponent,
        UserFantasyTeamsComponent,
        UserFollowedTeamsComponent,
        UserFollowedPlayersComponent,
        UserMatchComponent,
        TeamsComponent,
        TeamComponent,
        UserSearchComponent,
        MatchesFilterPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule.forRoot(

            appRoutes,

            {
                enableTracing: true
            }
        )
    ],
    providers: [
        LoginGuard,
        NoLoginGuard
    ],
    bootstrap: [AppComponent]

})


export class AppModule { }
