import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreScreenComponent } from './core-screen.component';

describe('CoreScreenComponent', () => {
  let component: CoreScreenComponent;
  let fixture: ComponentFixture<CoreScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
