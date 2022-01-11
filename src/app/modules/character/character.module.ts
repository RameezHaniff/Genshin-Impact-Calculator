import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AttributeEntryComponent } from './components/attribute-entry/attribute-entry.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {CharacterState} from 'src/app/modules/character/state/character.state';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { NgKnifeModule } from 'ng-knife';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout'


@NgModule({
  declarations: [
    HomepageComponent,
    ResultDisplayComponent,
    AttributeEntryComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    NgKnifeModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatButtonToggleModule,
    NgxsModule.forFeature([CharacterState])
  ]
})
export class CharacterModule { }
