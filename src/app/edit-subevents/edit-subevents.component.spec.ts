import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubeventsComponent } from './edit-subevents.component';

describe('EditSubeventsComponent', () => {
  let component: EditSubeventsComponent;
  let fixture: ComponentFixture<EditSubeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
