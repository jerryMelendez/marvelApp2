import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'my-data',
    loadChildren: () => import('./pages/my-data/my-data.module').then( m => m.MyDataPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/categories/characters/characters.module').then( m => m.CharactersPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'comics',
    loadChildren: () => import('./pages/categories/comics/comics.module').then( m => m.ComicsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'creators',
    loadChildren: () => import('./pages/categories/creators/creators.module').then( m => m.CreatorsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/categories/events/events.module').then( m => m.EventsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'series',
    loadChildren: () => import('./pages/categories/series/series.module').then( m => m.SeriesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'stories',
    loadChildren: () => import('./pages/categories/stories/stories.module').then( m => m.StoriesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
