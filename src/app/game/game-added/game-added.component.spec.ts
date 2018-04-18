import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddedComponent } from './game-added.component';

describe('GameAddedComponent', () => {
  let component: GameAddedComponent;
  let fixture: ComponentFixture<GameAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
