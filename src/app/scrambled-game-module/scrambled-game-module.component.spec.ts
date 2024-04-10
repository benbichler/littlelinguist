import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambledGameModuleComponent } from './scrambled-game-module.component';

describe('ScrambledGameModuleComponent', () => {
  let component: ScrambledGameModuleComponent;
  let fixture: ComponentFixture<ScrambledGameModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrambledGameModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrambledGameModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
