import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumButtonComponent } from './drum-button.component';

describe('DrumButtonComponent', () => {
  let component: DrumButtonComponent;
  let fixture: ComponentFixture<DrumButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
