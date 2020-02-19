import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUneCarousselComponent } from './page-une-caroussel.component';

describe('PageUneCarousselComponent', () => {
  let component: PageUneCarousselComponent;
  let fixture: ComponentFixture<PageUneCarousselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUneCarousselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUneCarousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
