import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserTeamNavComponent } from './user-team-nav.component';

describe('UserTeamNavComponent', () => {
    let component: UserTeamNavComponent;
    let fixture: ComponentFixture<UserTeamNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserTeamNavComponent
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserTeamNavComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserTeamNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
