import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEmojiComponent } from './recent-emoji.component';

describe('RecentEmojiComponent', () => {
  let component: RecentEmojiComponent;
  let fixture: ComponentFixture<RecentEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
