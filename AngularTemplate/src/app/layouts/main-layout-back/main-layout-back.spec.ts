import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutBack } from './main-layout-back';

describe('MainLayoutBack', () => {
  let component: MainLayoutBack;
  let fixture: ComponentFixture<MainLayoutBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
