import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontComponent} from './pages/front/front.component';
import {AboutComponent} from './pages/about/about.component';
import {PricesComponent} from './pages/prices/prices.component';
import {ApiComponent} from './pages/api/api.component';

const routes: Routes = [
  {path: '', component: FrontComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'api', component: ApiComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
