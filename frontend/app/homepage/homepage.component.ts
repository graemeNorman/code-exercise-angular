import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { createOrderFromJsonDTO, Order } from '../types/order';
import { Page } from '../types/page';
import { RestApiService } from "../services/rest-api.service";
import { WholeOrder } from "../models/models";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public orders: Order[];
  public paginationData: Omit<Page<any>, 'items'>;
  public calcLastPage: number;
  public loading = true;
  public defaultPageSize: number = 10;
  public pageSize: number;
  public page: any;
  public componentSubs: Subscription[] = [];

  public constructor(private apiService: RestApiService,
                     private activeRoute: ActivatedRoute,
                     private router: Router) {
    this.page = this.activeRoute.snapshot.queryParamMap.get('page') || 1;
    this.pageSize = +this.activeRoute.snapshot.queryParamMap.get('pageSize') || this.defaultPageSize;

    this.checkUrlPageQuery(this.page);
  }

  ngOnInit() {
    this.fetchOrders(this.pageSize);
  }

  checkUrlPageQuery(pageQuery: any) {
    /** Change null check to use lodash isNull **/
    if (pageQuery !== null && parseFloat(pageQuery) <= 0) {
      this.router.navigate(['/'], {
        relativeTo: this.activeRoute,
        queryParams:
          {
            page: 1
          },
        replaceUrl: true,
      });
      // Reset page value after updating queryParams
      this.page = +this.activeRoute.snapshot.queryParamMap.get('page');
    }
  };

  updateDataFromPagination(event: { pageSize: number, page?: number} ) {
    this.fetchOrders(event.pageSize, event.page);
  }

  fetchOrders(pageSize: number, page?: number) {
    this.componentSubs.push(
      this.apiService.getOrders(pageSize, page)
        .subscribe((data: Page<WholeOrder>) => {
          this.orders = data.items.map(createOrderFromJsonDTO);

          // deconstructing object to remove order items
          const { items, ...paginationData } = data;
          this.paginationData = paginationData;
          this.calcLastPage = this.paginationData.total / this.paginationData.count;

          this.loading = false;
      })
    );
  }

  ngOnDestroy() {
    this.componentSubs.forEach((sub) => sub.unsubscribe());
  }
}
