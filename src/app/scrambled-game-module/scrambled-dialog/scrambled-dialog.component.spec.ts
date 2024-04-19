import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambledDialogComponent } from './scrambled-dialog.component';

describe('ScrambledDialogComponent', () => {
  let component: ScrambledDialogComponent;
  let fixture: ComponentFixture<ScrambledDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrambledDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrambledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
