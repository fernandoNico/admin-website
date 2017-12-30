import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventfilesComponent } from './eventfiles.component';

describe('EventfilesComponent', () => {
  let component: EventfilesComponent;
  let fixture: ComponentFixture<EventfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
