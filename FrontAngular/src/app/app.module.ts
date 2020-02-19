import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ApiService } from './api.service';
import { AdminComponent } from './admin/admin.component';
import { AddMangaComponent } from './add-manga/add-manga.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { MangasComponent } from './mangas/mangas.component';
import { SearchComponent } from './search/search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailComponent } from './detail/detail.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { FavorisComponent } from './favoris/favoris.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { LectureComponent } from './lecture/lecture.component';
import { CarousselComponent } from './caroussel/caroussel.component';
import { ListByCategorieComponent } from './list-by-categorie/list-by-categorie.component';
import { ListMangasAdminComponent } from './list-mangas-admin/list-mangas-admin.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';
import { PageUneComponent } from './page-une/page-une.component';
import { PageUneCarousselComponent } from './page-une-caroussel/page-une-caroussel.component';


const mesRoutes = [
  {path : '',   redirectTo : '/', pathMatch: 'full' },
  {path : 'admin', component : AdminComponent },
  {path : 'form', component : AddMangaComponent },
  {path : 'update/:id', component : AddMangaComponent },
  {path : 'cate', component : AddCategorieComponent },
  {path : 'update/cat/:id', component : AddCategorieComponent },
  {path : 'detail/categorie/:id', component : DetailCategorieComponent },
  {path : 'liste', component : MangasComponent },
  {path : 'liste/:cat', component : ListByCategorieComponent },
  {path : 'search', component : SearchComponent },
  {path : 'formImages', component : AddImagesComponent },
  {path : 'updateImage/:id', component : AddImagesComponent },
  {path : 'favoris', component : FavorisComponent },
  {path : 'detail/:id', component : DetailComponent },
  {path : 'lecture/:id', component : LectureComponent },
  {path : 'test', component : TestEditorComponent },
  {path : 'listmangasAdmin', component : ListMangasAdminComponent },
  {path : 'list/accueil', component : PageUneComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminComponent,
    AddMangaComponent,
    AddCategorieComponent,
    MangasComponent,
    SearchComponent,
    SidebarComponent,
    DetailComponent,
    AddImagesComponent,
    FavorisComponent,
    TestEditorComponent,
    LectureComponent,
    CarousselComponent,
    ListByCategorieComponent,
    ListMangasAdminComponent,
    DetailCategorieComponent,
    PageUneComponent,
    PageUneCarousselComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(mesRoutes),
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    HttpClientModule,

  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
