import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMangaComponent } from './form-manga.component';

describe('FormMangaComponent', () => {
  let component: FormMangaComponent;
  let fixture: ComponentFixture<FormMangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
