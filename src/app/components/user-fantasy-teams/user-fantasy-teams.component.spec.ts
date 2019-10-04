import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserFantasyTeamsComponent } from './user-fantasy-teams.component';
import { FantasyFilterPipe } from '../../pipes/fantasy-filter.pipe';

describe('UserFantasyTeamsComponent', () => {
    let component: UserFantasyTeamsComponent;
    let fixture: ComponentFixture<UserFantasyTeamsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            declarations: [
                UserFantasyTeamsComponent,
                FantasyFilterPipe
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserFantasyTeamsComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserFantasyTeamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
