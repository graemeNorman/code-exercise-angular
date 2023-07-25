import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule  } from "@angular/router/testing";
import { HttpClient } from "@angular/common/http";
import { RestApiService } from "./rest-api.service";

describe('NavigationService', () => {
  let service: RestApiService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:4300/orders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(RestApiService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrders', () => {

    it('should call getOrders and handle valid response', (done) => {
      service.getOrders(10).subscribe(res => {
        expect(res).toBeTruthy();
        done();
      });

      const mockReq = httpMock.expectOne(`${apiUrl}?pageSize=10`);
      expect(mockReq.request.method).toEqual('GET');
      expect(mockReq.request.params.get("pageSize")).toBe('10');
      mockReq.flush({});
      httpMock.verify();
    });

    it('should call getOrders with pageSize & page and handle valid response', (done) => {
      service.getOrders(25, 2).subscribe(res => {
        expect(res).toBeTruthy();
        done();
      });

      const mockReq = httpMock.expectOne(`${apiUrl}?page=2&pageSize=25`);
      expect(mockReq.request.method).toEqual('GET');
      expect(mockReq.request.params.get("pageSize")).toBe('25');
      expect(mockReq.request.params.get("page")).toBe('2');
      mockReq.flush({});
      httpMock.verify();
    });

    it('should navigate to the first page when the provided page is < 1', (done) => {
      service.getOrders(10, 0).subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      const mockReq = httpMock.expectOne(`${apiUrl}?pageSize=10`);
      expect(mockReq.request.method).toEqual('GET');
      expect(mockReq.request.params.get("page")).toBe(null);
      mockReq.flush({});
      httpMock.verify();
    });
  });
});
