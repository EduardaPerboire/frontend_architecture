import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'access',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'access',
      exposedModule: './AuthenticationModule',
    }).then(m => m.AuthenticationModule)
  },
  {
    path: 'payment',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:4000/remoteEntry.js',
      remoteName: 'payment',
      exposedModule: './CardModule',
    }).then(m => m.CardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
