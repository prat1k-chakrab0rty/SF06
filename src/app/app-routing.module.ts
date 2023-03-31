import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyComponent } from './key/key.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: KeyComponent, },
  { path: "home", component: HomeComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
