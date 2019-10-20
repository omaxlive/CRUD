import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './posts/components/table/table.component';
import { DetailComponent } from './posts/components/detail/detail.component';


const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'detail', component: DetailComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ TableComponent, DetailComponent ];
