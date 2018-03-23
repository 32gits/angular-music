import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthModuleComponent } from './synth-module.component';

describe('SynthModuleComponent', () => {
  let component: SynthModuleComponent;
  let fixture: ComponentFixture<SynthModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynthModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
