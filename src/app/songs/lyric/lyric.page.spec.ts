import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LyricPage } from './lyric.page';

describe('LyricPage', () => {
  let component: LyricPage;
  let fixture: ComponentFixture<LyricPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
