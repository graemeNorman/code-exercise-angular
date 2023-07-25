import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderRowComponent } from './order-row/order-row.component';
import { StatusPillComponent } from './status-pill/status-pill.component';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { PaginationComponent } from "./components/pagination/pagination.component";

export const ROUTES: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '**',
    component: HomepageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    OrderTableComponent,
    OrderRowComponent,
    HomepageComponent,
    StatusPillComponent,
    PaginationComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
