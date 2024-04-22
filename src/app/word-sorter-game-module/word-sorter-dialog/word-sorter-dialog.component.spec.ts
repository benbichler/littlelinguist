import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterDialogComponent } from './word-sorter-dialog.component';

describe('WordSorterDialogComponent', () => {
  let component: WordSorterDialogComponent;
  let fixture: ComponentFixture<WordSorterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
