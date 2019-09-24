import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamNavComponent } from './user-team-nav.component';

describe('UserTeamNavComponent', () => {
  let component: UserTeamNavComponent;
  let fixture: ComponentFixture<UserTeamNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeamNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
