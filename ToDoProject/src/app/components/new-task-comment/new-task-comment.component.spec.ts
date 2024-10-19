import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskCommentComponent } from './new-task-comment.component';

describe('NewTaskCommentComponent', () => {
  let component: NewTaskCommentComponent;
  let fixture: ComponentFixture<NewTaskCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaskCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
