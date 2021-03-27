import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { MainSearchComponent } from './components/main-search/main-search/main-search.component';
import { NotFoundComponent } from './components/not-found/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: MainSearchComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
