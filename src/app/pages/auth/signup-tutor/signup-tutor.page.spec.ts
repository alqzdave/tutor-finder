import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupTutorPage } from './signup-tutor.page';

describe('SignupTutorPage', () => {
  let component: SignupTutorPage;
  let fixture: ComponentFixture<SignupTutorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
