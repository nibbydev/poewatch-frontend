import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './pages/front/front.component';
import { AboutComponent } from './pages/about/about.component';
import { PricesComponent } from './pages/prices/prices.component';
import { ApiComponent } from './pages/api/api.component';
import { ItemPageComponent } from './pages/item/item-page.component';
import { LeaguesComponent } from './pages/leagues/leagues.component';
import { StatsPageComponent } from './pages/stats/stats-page.component';
import { DemoComponent } from './pages/demo/demo.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { LabComponent } from './pages/lab/lab.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    data: {
      pageTitle: 'Poe Watch',
      navTitle: 'Front',
      isNew: false,
      enabled: true,
      comment: ''
    },
  }, {
    path: 'prices',
    component: PricesComponent,
    data: {
      pageTitle: 'Price Statistics',
      navTitle: 'Prices',
      isNew: false,
      enabled: true,
      comment: 'Price statistics and history'
    },
  }, {
    path: 'api',
    component: ApiComponent,
    data: {
      pageTitle: 'API Documentation',
      navTitle: 'API',
      isNew: false,
      enabled: true,
      comment: 'Documentation for developers'
    },
  }, {
    path: 'leagues',
    component: LeaguesComponent,
    data: {
      pageTitle: null,
      navTitle: 'Leagues',
      isNew: false,
      enabled: true,
      comment: 'Listings and countdowns for leagues'
    },
  }, {
    path: 'stats',
    component: StatsPageComponent,
    data: {
      pageTitle: 'Statistics',
      navTitle: 'Statistics',
      isNew: false,
      enabled: true,
      comment: 'Site and backend statistics'
    }
  }, {
    path: 'about',
    component: AboutComponent,
    data: {
      pageTitle: 'About',
      navTitle: 'About',
      isNew: false,
      enabled: true,
      comment: 'Info about the site'
    },
  }, {
    path: 'characters',
    component: CharactersComponent,
    data: {
      pageTitle: 'Characters',
      navTitle: 'Characters',
      isNew: false,
      enabled: false,
      comment: 'Look up players by character or account names'
    }
  }, {
    path: 'item',
    component: ItemPageComponent,
    data: {
      pageTitle: 'Item details',
      navTitle: null,
      isNew: false,
      enabled: false,
      comment: null
    },
  }, {
    path: 'demo',
    component: DemoComponent,
    data: {
      pageTitle: 'Demo',
      navTitle: null,
      isNew: false,
      enabled: false,
      comment: null
    }
  }, {
    path: 'lab',
    component: LabComponent,
    data: {
      pageTitle: 'Labyrinth layouts',
      navTitle: 'Lab',
      isNew: true,
      enabled: true,
      comment: null
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
