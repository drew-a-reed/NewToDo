import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskboardPickerComponent } from './taskboard-picker.component';

describe('TaskboardPickerComponent', () => {
  let component: TaskboardPickerComponent;
  let fixture: ComponentFixture<TaskboardPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskboardPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskboardPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
