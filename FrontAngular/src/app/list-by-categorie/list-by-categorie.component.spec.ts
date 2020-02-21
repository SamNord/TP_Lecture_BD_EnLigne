import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByCategorieComponent } from './list-by-categorie.component';

describe('ListByCategorieComponent', () => {
  let component: ListByCategorieComponent;
  let fixture: ComponentFixture<ListByCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListByCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
