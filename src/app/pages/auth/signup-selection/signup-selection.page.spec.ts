import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSelectionPage } from './signup-selection.page';

describe('SignupSelectionPage', () => {
  let component: SignupSelectionPage;
  let fixture: ComponentFixture<SignupSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
