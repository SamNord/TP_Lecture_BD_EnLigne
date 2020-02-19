import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMangasAdminComponent } from './list-mangas-admin.component';

describe('ListMangasAdminComponent', () => {
  let component: ListMangasAdminComponent;
  let fixture: ComponentFixture<ListMangasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMangasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMangasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
