import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent', () => {
    let component: UserHomeComponent;
    let fixture: ComponentFixture<UserHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserHomeComponent
            ],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: UserHomeComponent}
                ])
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
