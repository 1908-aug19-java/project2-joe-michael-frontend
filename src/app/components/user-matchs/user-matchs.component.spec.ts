import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchsComponent } from './user-matchs.component';

describe('UserMatchsComponent', () => {
  let component: UserMatchsComponent;
  let fixture: ComponentFixture<UserMatchsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchsComponent ]
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
