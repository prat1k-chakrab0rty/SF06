import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyComponent } from './key/key.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { OldStatsComponent } from './old-stats/old-stats.component';
import { LogsComponent } from './logs/logs.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    HomeComponent,
    OldStatsComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
