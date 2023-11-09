import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEpisodeComponent } from './list-episode.component';

describe('ListEpisodeComponent', () => {
  let component: ListEpisodeComponent;
  let fixture: ComponentFixture<ListEpisodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEpisodeComponent]
    });
    fixture = TestBed.createComponent(ListEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
