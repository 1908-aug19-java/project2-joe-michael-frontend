import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { NgModel, FormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';

const appRoutes: Routes = [

  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'user', component: UserHomeComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UserHomeComponent
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
