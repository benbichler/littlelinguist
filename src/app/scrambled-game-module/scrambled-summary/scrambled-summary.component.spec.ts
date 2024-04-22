import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambledSummaryComponent } from './scrambled-summary.component';

describe('ScrambledSummaryComponent', () => {
  let component: ScrambledSummaryComponent;
  let fixture: ComponentFixture<ScrambledSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrambledSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrambledSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
