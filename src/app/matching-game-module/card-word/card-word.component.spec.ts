import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWordComponent } from './card-word.component';

describe('CardWordComponent', () => {
  let component: CardWordComponent;
  let fixture: ComponentFixture<CardWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
