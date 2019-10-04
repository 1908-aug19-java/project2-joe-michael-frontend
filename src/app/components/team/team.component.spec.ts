import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TeamComponent } from './team.component';
import { UserTeamNavComponent } from '../user-team-nav/user-team-nav.component';

import { MatchesFilterPipe } from '../../pipes/matches-filter.pipe';
import { RosterFilterPipe } from '../../pipes/roster-filter.pipe';

describe('TeamComponent', () => {
    let component: TeamComponent;
    let fixture: ComponentFixture<TeamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeamComponent,
                UserTeamNavComponent,
                MatchesFilterPipe,
                RosterFilterPipe
            ],

            imports: [

                RouterModule.forRoot([
                    {

                        path: '', component: TeamComponent
                    }
                ]),

                HttpClientModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
