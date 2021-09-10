import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlmDataComponent } from './nlm-data.component';

describe('NlmDataComponent', () => {
  let component: NlmDataComponent;
  let fixture: ComponentFixture<NlmDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlmDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
