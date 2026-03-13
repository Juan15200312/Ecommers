import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutCli } from './main-layout-cli';

describe('MainLayoutCli', () => {
  let component: MainLayoutCli;
  let fixture: ComponentFixture<MainLayoutCli>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutCli]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutCli);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
