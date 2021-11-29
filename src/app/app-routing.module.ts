import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeEntryComponent } from './modules/character/components/attribute-entry/attribute-entry.component';
import { HomepageComponent } from './modules/character/components/homepage/homepage.component';
import { SimpleCalcComponent } from './modules/temp-module/components/simple-calc/simple-calc.component';

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path : 'calculator', component: AttributeEntryComponent},
  { path: '',   redirectTo: '/homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
