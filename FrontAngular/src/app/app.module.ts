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


const mesRoutes = [
  {path : '',   redirectTo : '/', pathMatch: 'full' },
  {path : 'admin', component : AdminComponent },
  {path : 'form', component : AddMangaComponent },
  {path : 'cate', component : AddCategorieComponent },
  {path : 'liste', component : MangasComponent },
  {path : 'search', component : SearchComponent }
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
    SidebarComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(mesRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
