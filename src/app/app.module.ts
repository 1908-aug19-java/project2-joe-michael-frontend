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

const appRoutes: Routes = [

    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'user', component: UserHomeComponent
    },
    {
        path: 'signup', component: SignUpComponent
    },
    {
        path: 'landing', component: LandingComponent
    },
    {
        path: '#', redirectTo: 'landing', pathMatch: 'full'
    },
    {
        path: '', redirectTo: 'landing', pathMatch: 'full'
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
    providers: [],
    bootstrap: [AppComponent]

})
export class AppModule { }
