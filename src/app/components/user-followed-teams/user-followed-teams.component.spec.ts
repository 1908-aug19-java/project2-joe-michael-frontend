import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowedTeamsComponent } from './user-followed-teams.component';

describe('UserFollowedTeamsComponent', () => {
  let component: UserFollowedTeamsComponent;
  let fixture: ComponentFixture<UserFollowedTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowedTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowedTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
