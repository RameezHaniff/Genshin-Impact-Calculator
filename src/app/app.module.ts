import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxsModule } from '@ngxs/store';
import {CharacterModule } from 'src/app/modules/character/character.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './modules/character/components/homepage/homepage.component';
import { ResultDisplayComponent } from './modules/character/components/result-display/result-display.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AttributeEntryComponent } from './modules/character/components/attribute-entry/attribute-entry.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CharacterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatButtonToggleModule,
    NgxsModule.forRoot([], {
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
