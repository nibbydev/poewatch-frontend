import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ModalModule} from 'ngx-bootstrap';
import {TooltipModule} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap';
import {FrontComponent} from './pages/front/front.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {AboutComponent} from './pages/about/about.component';
import {ApiComponent} from './pages/api/api.component';
import {PricesComponent} from './pages/prices/prices.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ApiComponent,
    PricesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
