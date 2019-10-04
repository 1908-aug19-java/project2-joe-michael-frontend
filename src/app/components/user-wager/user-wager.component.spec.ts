import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserWagerComponent } from './user-wager.component';
import { WagerFilterPipe } from '../../pipes/wager-filter.pipe';

describe('UserWagerComponent', () => {
    let component: UserWagerComponent;
    let fixture: ComponentFixture<UserWagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserWagerComponent,
                WagerFilterPipe
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserWagerComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserWagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
