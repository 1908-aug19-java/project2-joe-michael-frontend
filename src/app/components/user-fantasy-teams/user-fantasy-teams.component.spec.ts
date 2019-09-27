import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFantasyTeamsComponent } from './user-fantasy-teams.component';

describe('UserFantasyTeamsComponent', () => {
  let component: UserFantasyTeamsComponent;
  let fixture: ComponentFixture<UserFantasyTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFantasyTeamsComponent ]
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
