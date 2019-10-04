import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TeamsComponent } from './teams.component';
import { UserTeamNavComponent } from '../user-team-nav/user-team-nav.component';

describe('TeamsComponent', () => {
    let component: TeamsComponent;
    let fixture: ComponentFixture<TeamsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeamsComponent,
                UserTeamNavComponent
            ],

            imports: [
                RouterModule.forRoot([
                    {path: '', component: TeamsComponent}
                ]),
                HttpClientModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
