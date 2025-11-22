import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindTutorPage } from './find-tutor.page';

describe('FindTutorPage', () => {
  let component: FindTutorPage;
  let fixture: ComponentFixture<FindTutorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
