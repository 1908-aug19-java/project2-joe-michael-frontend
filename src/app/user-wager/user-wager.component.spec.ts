import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWagerComponent } from './user-wager.component';

describe('UserWagerComponent', () => {
  let component: UserWagerComponent;
  let fixture: ComponentFixture<UserWagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWagerComponent ]
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
