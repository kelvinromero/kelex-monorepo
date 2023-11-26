import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlayerComponent } from './view-player.component';

describe('ViewPlayerComponent', () => {
  let component: ViewPlayerComponent;
  let fixture: ComponentFixture<ViewPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPlayerComponent]
    });
    fixture = TestBed.createComponent(ViewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
