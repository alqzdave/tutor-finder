import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupClientPage } from './signup-client.page';

describe('SignupClientPage', () => {
  let component: SignupClientPage;
  let fixture: ComponentFixture<SignupClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
