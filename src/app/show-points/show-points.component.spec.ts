import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPointsComponent } from './show-points.component';

describe('ShowPointsComponent', () => {
  let component: ShowPointsComponent;
  let fixture: ComponentFixture<ShowPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
