import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindStudentsPage } from './find-students.page';

describe('FindStudentsPage', () => {
  let component: FindStudentsPage;
  let fixture: ComponentFixture<FindStudentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
