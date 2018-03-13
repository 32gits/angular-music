import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumModuleComponent } from './drum-module.component';

describe('DrumModuleComponent', () => {
  let component: DrumModuleComponent;
  let fixture: ComponentFixture<DrumModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
