import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserPageComponent } from './user-page.component';
import { UserTeamNavComponent } from '../user-team-nav/user-team-nav.component';

describe('UserPageComponent', () => {
    let component: UserPageComponent;
    let fixture: ComponentFixture<UserPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserPageComponent,
                UserTeamNavComponent
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserPageComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
