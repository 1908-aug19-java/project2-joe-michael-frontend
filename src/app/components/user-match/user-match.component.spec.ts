import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserMatchComponent } from './user-match.component';
import { UserFilterPipe } from '../../pipes/user-filter.pipe';

describe('UserMatchComponent', () => {
    let component: UserMatchComponent;
    let fixture: ComponentFixture<UserMatchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            declarations: [
                UserMatchComponent,
                UserFilterPipe
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserMatchComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMatchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
