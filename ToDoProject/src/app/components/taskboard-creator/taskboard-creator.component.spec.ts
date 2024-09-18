import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskboardCreatorComponent } from './taskboard-creator.component';

describe('TaskboardCreatorComponent', () => {
  let component: TaskboardCreatorComponent;
  let fixture: ComponentFixture<TaskboardCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskboardCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskboardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
