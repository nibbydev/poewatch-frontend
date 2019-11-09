import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {FrontComponent} from './pages/front/front.component';
import {FooterComponent} from './modules/footer/footer.component';
import {HeaderComponent} from './modules/header/header.component';
import {AboutComponent} from './pages/about/about.component';
import {ApiComponent} from './pages/api/api.component';
import {PricesComponent} from './pages/prices/prices.component';
import {HttpClientModule} from '@angular/common/http';
import {TitleComponent} from './modules/title/title.component';
import {SidebarComponent} from './modules/sidebar/sidebar.component';
import {ItemComponent} from './modules/item/item.component';
import {PricesTableComponent} from './pages/prices/prices-table/prices-table.component';
import {FormsModule} from '@angular/forms';
import {DetailsModalComponent} from './modules/details-modal/details-modal.component';
import {ItemPriceboxComponent} from './modules/item/item-pricebox/item-pricebox.component';
import {ItemSparklineComponent} from './modules/item/item-sparkline/item-sparkline.component';
import {EnumToArrayPipe} from './pipes/enum-to-array.pipe';
import {ActiveLeaguePipe} from './pipes/active-league.pipe';
import {PricesTableLoadmoreComponent} from './pages/prices/prices-table/prices-table-loadmore/prices-table-loadmore.component';
import {SpinnerComponent} from './shared/spinner/spinner.component';
import {ReactiveInputComponent} from './shared/reactive-input/reactive-input.component';
import {PricesTableStatusComponent} from './pages/prices/prices-table/prices-table-status/prices-table-status.component';

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
    ItemPriceboxComponent,
    ItemSparklineComponent,
    PricesTableComponent,
    DetailsModalComponent,
    EnumToArrayPipe,
    ActiveLeaguePipe,
    PricesTableLoadmoreComponent,
    SpinnerComponent,
    ReactiveInputComponent,
    PricesTableStatusComponent,
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
