import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PlayerComponent } from './player.component';
import { UserTeamNavComponent } from '../user-team-nav/user-team-nav.component';

describe('PlayerComponent', () => {
    let component: PlayerComponent;
    let fixture: ComponentFixture<PlayerComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [
                PlayerComponent,
                UserTeamNavComponent
             ],

            imports: [

                HttpClientModule,
                RouterModule.forRoot([
                        { path: '', component: PlayerComponent}
                    ]
                )
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
