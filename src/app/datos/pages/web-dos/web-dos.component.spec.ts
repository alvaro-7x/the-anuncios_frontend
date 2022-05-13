import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDosComponent } from './web-dos.component';

describe('WebDosComponent', () => {
  let component: WebDosComponent;
  let fixture: ComponentFixture<WebDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
