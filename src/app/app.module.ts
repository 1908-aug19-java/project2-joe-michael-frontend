import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModel, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserHomeComponent } from './components/user-home/user-home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';
import { UserTeamNavComponent } from './components/user-team-nav/user-team-nav.component';
import { UserWagerComponent } from './components/user-wager/user-wager.component';
import { UserPredictionsComponent } from './components/user-predictions/user-predictions.component';
import { UserMatchesComponent } from './components/user-matches/user-matches.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserFantasyTeamsComponent } from './components/user-fantasy-teams/user-fantasy-teams.component';
import { UserFollowedTeamsComponent } from './components/user-followed-teams/user-followed-teams.component';
import { UserFollowedPlayersComponent } from './components/user-followed-players/user-followed-players.component';
import { UserMatchComponent } from './components/user-match/user-match.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamComponent } from './components/team/team.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { MatchesFilterPipe } from './matches-filter.pipe';
import { ApiGuard } from './guards/api.guard';

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
        component: TeamsComponent,
        canActivate: [ApiGuard]
    },

    {
        path: 'user',
        component: UserPageComponent,
        canActivate: [LoginGuard, ApiGuard],
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
        HttpClientModule,
        RouterModule.forRoot(

            appRoutes,

            {
                enableTracing: false
            }
        )
    ],
    providers: [
        LoginGuard,
        NoLoginGuard,
        ApiGuard
    ],
    bootstrap: [AppComponent]

})


export class AppModule { }
