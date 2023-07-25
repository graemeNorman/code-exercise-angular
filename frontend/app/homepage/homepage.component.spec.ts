import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {Location} from "@angular/common";
import {HomepageComponent} from './homepage.component';
import {OrderRowComponent} from "../order-row/order-row.component";
import {OrderTableComponent} from "../order-table/order-table.component";
import {RestApiService} from "../services/rest-api.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {ROUTES} from "../app.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Observable, of} from "rxjs";
import {Page} from "../types/page";
import {Packaging, PaymentType, ServingStyle, Vendor, WholeOrder} from "../models/models";

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let service: RestApiService;
  let httpMock: HttpTestingController;
  let router: Router;
  let location: Location;

  const mockRespPageOne: Observable<Page<WholeOrder>> = of({"page":1,"pageSize":1,"total":2,"count":1,"items":[{"id":1824,"lastModified":"2018-03-07T10:52:15.000Z","customer":"AlphaBreakers","vendor":Vendor["Mando's"],"commissionRate":0.15,"requestedDeliveryDate":"2018-04-09T06:30:00.000Z","price":{"delivery":0,"items":5299.75,"total":5299.75,"vatRate":20,"vatableItems":0,"vatAmount":0},"paymentType":PaymentType.CARD,"headcount":83,"servingStyle":ServingStyle.INDIVIDUAL_PORTIONS,"deliveredAt":"2018-04-09T07:56:36.000Z","delayMinutes":0,"lateReason":null,"packaging":Packaging.VENDOR_PROVIDED,"driverName":"Nelson Piquet","deliveryLocation":{"lat":51.506497,"long":-0.044610999999999984},"currentLocation":{"lat":51.513181,"long":-0.01464299999999999},"vendorLocation":{"lat":51.48927200000001,"long":-0.12503999999999998}}]});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent, OrderTableComponent, OrderRowComponent],
      providers: [
        RestApiService
      ],
      imports: [
        RouterTestingModule.withRoutes(ROUTES),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RestApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchOrders on ngOnInit with pageSize', () => {
    spyOn(component, 'fetchOrders').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.fetchOrders).toHaveBeenCalledOnceWith(10);
  });

  it('should call fetchOrders on ngOnInit with over-written pageSize value', fakeAsync(() => {
    spyOn(component, 'fetchOrders').and.callThrough();
    component.pageSize = 15;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.fetchOrders).toHaveBeenCalledWith(15);
  }));

  it('should call fetchOrders with event data from pagination component', () => {
    spyOn(component, 'updateDataFromPagination').and.callThrough();
    spyOn(component, 'fetchOrders').and.callThrough();
    const eventData = { pageSize: 1, page: 1 };

    component.updateDataFromPagination(eventData);

    expect(component.fetchOrders).toHaveBeenCalledOnceWith(eventData.pageSize, eventData.page);
  });

  it('should call getOrders service method and return data', fakeAsync(() => {
    spyOn(service, 'getOrders').and.returnValue(mockRespPageOne);
    spyOn(component, 'fetchOrders').and.callThrough();

    component.defaultPageSize = 1;
    component.pageSize = 1;

    component.ngOnInit();
    fixture.detectChanges();

    mockRespPageOne.subscribe((pageOneResp) => {
      const { items, ...paginationData } = pageOneResp;

      expect(component.paginationData).toEqual(paginationData);
      expect(component.orders[0].id).toEqual(pageOneResp.items[0].id);
    })
  }));
});
