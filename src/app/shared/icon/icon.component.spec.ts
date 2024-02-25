import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfIcon } from './icon.component';

describe('CfIcon', () => {
  let component: CfIcon;
  let fixture: ComponentFixture<CfIcon>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CfIcon],
    });
    fixture = TestBed.createComponent(CfIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
