import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowedPlayersComponent } from './user-followed-players.component';

describe('UserFollowedPlayersComponent', () => {
  let component: UserFollowedPlayersComponent;
  let fixture: ComponentFixture<UserFollowedPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowedPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
