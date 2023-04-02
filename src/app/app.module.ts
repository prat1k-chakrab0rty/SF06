import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyComponent } from './key/key.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { OldStatsComponent } from './old-stats/old-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    HomeComponent,
    OldStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
