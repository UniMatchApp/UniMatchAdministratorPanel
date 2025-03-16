import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSideBarComponent } from './administrator-side-bar.component';

describe('AdministratorSideBarComponent', () => {
  let component: AdministratorSideBarComponent;
  let fixture: ComponentFixture<AdministratorSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
