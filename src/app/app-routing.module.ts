import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyComponent } from './key/key.component';
import { HomeComponent } from './home/home.component';
import { OldStatsComponent } from './old-stats/old-stats.component';

const routes: Routes = [
  { path: "", component: KeyComponent, },
  { path: "home", component: HomeComponent, },
  { path: "old-stats", component: OldStatsComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
