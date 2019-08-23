import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDropdownModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FrontComponent } from './pages/front/front.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderComponent } from './modules/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ApiComponent } from './pages/api/api.component';
import { PricesComponent } from './pages/prices/prices.component';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent } from './modules/title/title.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { ItemComponent } from './modules/item/item.component';
import { PriceBoxComponent } from './modules/item/price-box/price-box.component';
import { SparklineComponent } from './modules/item/sparkline/sparkline.component';
import { PricesTableComponent } from './pages/prices/prices-table/prices-table.component';
import { PricesSearchComponent } from './pages/prices/prices-search/prices-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ApiComponent,
    PricesComponent,
    TitleComponent,
    SidebarComponent,
    ItemComponent,
    PriceBoxComponent,
    SparklineComponent,
    PricesTableComponent,
    PricesSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
