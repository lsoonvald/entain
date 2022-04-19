import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBackgroundComponent } from './full-background.component';

describe('FullBackgroundComponent', () => {
  let component: FullBackgroundComponent;
  let fixture: ComponentFixture<FullBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
