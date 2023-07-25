import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Page } from "../../types/page";
import { Order } from "../../types/order";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() public paginationData: Omit<Page<any>, 'items'>;
  @Input() public page: any;
  @Input() public pageSize: number;
  @Input() public lastPage: number;
  @Output() outputPaginationData: EventEmitter<{ pageSize: number, page?: any }> = new EventEmitter();

  public orders: Order[];

  ngOnChanges(changes: SimpleChanges) {
    this.page = changes.paginationData.currentValue.page;
    this.pageSize = changes.paginationData.currentValue.pageSize;
    this.paginationData = changes.paginationData.currentValue;
  }

  ngOnInit() {
    this.outputPaginationData.emit(
      { pageSize: this.pageSize }
      );
  }

  paginationFirstPage() {
    this.outputPaginationData.emit(
      { pageSize: this.pageSize, page: 1 }
      );
  }

  paginationLastPage() {
    this.outputPaginationData.emit(
      { pageSize: this.pageSize, page: this.lastPage }
      );
  }

  paginationPrev() {
    this.outputPaginationData.emit(
      { pageSize: this.pageSize, page: (this.page - 1) }
      );
  }

  paginationNext() {
    this.outputPaginationData.emit(
      { pageSize: this.pageSize, page: (this.page + 1) }
      );
  }

  goToPage(event: any) {
    const chosenPage = +event.target.value;
    if (chosenPage <= this.lastPage && chosenPage >= 1) {
      this.outputPaginationData.emit(
        { pageSize: this.pageSize, page: event.target.value }
        );
    }
  }
}
