import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingDialogComponent } from './matching-dialog.component';

describe('MatchingDialogComponent', () => {
  let component: MatchingDialogComponent;
  let fixture: ComponentFixture<MatchingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
