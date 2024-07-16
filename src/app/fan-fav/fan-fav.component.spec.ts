import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanFavComponent } from './fan-fav.component';

describe('FanFavComponent', () => {
  let component: FanFavComponent;
  let fixture: ComponentFixture<FanFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanFavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FanFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
