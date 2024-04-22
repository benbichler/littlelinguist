import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterSummaryComponent } from './word-sorter-summary.component';

describe('WordSorterSummaryComponent', () => {
  let component: WordSorterSummaryComponent;
  let fixture: ComponentFixture<WordSorterSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
