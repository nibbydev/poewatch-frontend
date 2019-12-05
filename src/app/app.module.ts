import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FrontComponent } from './pages/front/front.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ApiComponent } from './pages/api/api.component';
import { PricesComponent } from './pages/prices/prices.component';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent } from './components/title/title.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ItemComponent } from './components/item/item.component';
import { PricesTableComponent } from './pages/prices/prices-table/prices-table.component';
import { FormsModule } from '@angular/forms';
import { ItemPriceboxComponent } from './components/item/item-pricebox/item-pricebox.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { ActiveLeaguePipe } from './pipes/active-league.pipe';
import { PricesTableLoadmoreComponent } from './pages/prices/prices-table/prices-table-loadmore/prices-table-loadmore.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReactiveInputComponent } from './components/reactive-input/reactive-input.component';
import { PricesTableStatusComponent } from './pages/prices/prices-table/prices-table-status/prices-table-status.component';
import { ItemPageComponent } from './pages/item/item-page.component';
import { ItemFormatPipe } from './pipes/item-format.pipe';
import { ItemDetailsComponent } from './pages/item/item-details/item-details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemChartComponent } from './pages/item/item-chart/item-chart.component';
import { LeaguesComponent } from './pages/leagues/leagues.component';
import { LeaguesElementComponent } from './pages/leagues/leagues-element/leagues-element.component';
import { StatsPageComponent } from './pages/stats/stats-page.component';
import { StatsElementComponent } from './pages/stats/stats-element/stats-element.component';
import { StatsChartComponent } from './pages/stats/stats-chart/stats-chart.component';
import { HoursAgoPipe } from './pipes/hours-ago.pipe';
import { SparklineComponent } from './components/sparkline/sparkline.component';
import { DemoComponent } from './pages/demo/demo.component';
import { D3SparkComponent } from './components/d3-spark/d3-spark.component';
import { SortArrowComponent } from './components/sort-arrow/sort-arrow.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

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
    PricesTableComponent,
    EnumToArrayPipe,
    ActiveLeaguePipe,
    PricesTableLoadmoreComponent,
    SpinnerComponent,
    ReactiveInputComponent,
    PricesTableStatusComponent,
    ItemPageComponent,
    ItemFormatPipe,
    ItemDetailsComponent,
    ItemChartComponent,
    LeaguesComponent,
    LeaguesElementComponent,
    StatsPageComponent,
    StatsElementComponent,
    StatsChartComponent,
    HoursAgoPipe,
    SparklineComponent,
    DemoComponent,
    D3SparkComponent,
    SortArrowComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
