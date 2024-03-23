import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationOnGameComponent } from './explanation-on-game.component';

describe('ExplanationOnGameComponent', () => {
  let component: ExplanationOnGameComponent;
  let fixture: ComponentFixture<ExplanationOnGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplanationOnGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplanationOnGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
