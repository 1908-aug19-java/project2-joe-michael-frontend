import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserMatchsComponent } from './user-matchs.component';
import { UpcomingLeagueFilterPipe } from '../../pipes/upcoming-league-filter.pipe';

describe('UserMatchsComponent', () => {
    let component: UserMatchsComponent;
    let fixture: ComponentFixture<UserMatchsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserMatchsComponent,
                UpcomingLeagueFilterPipe
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserMatchsComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMatchsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
