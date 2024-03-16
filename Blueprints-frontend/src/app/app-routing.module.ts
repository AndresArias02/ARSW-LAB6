import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetBlueprintsComponent } from './get-blueprints/get-blueprints.component';

const routes: Routes = [
  {path: 'index.html',component:GetBlueprintsComponent},
  {path :'',redirectTo: 'index.html',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
