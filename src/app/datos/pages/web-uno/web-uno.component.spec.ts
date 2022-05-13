import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUnoComponent } from './web-uno.component';

describe('WebUnoComponent', () => {
  let component: WebUnoComponent;
  let fixture: ComponentFixture<WebUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
