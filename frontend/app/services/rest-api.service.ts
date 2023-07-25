import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Order } from "../types/order";
import { environment } from "../../environments/environment";
import { Page } from "../types/page";
import { WholeOrder } from "../models/models";

@Injectable({
  providedIn: 'root',
})

export class RestApiService {
  apiURL = environment.apiBase;

  constructor(private http: HttpClient) {}

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };

  buildParams(pageSize: number, page?: number) {
    let queryBuilder = new HttpParams();
    if (page) {
      if (page <= 0) {
        queryBuilder = queryBuilder.append("page", 1);
      } else {
        queryBuilder = queryBuilder.append("page", page);
      }
    }
    if (pageSize) {
      queryBuilder = queryBuilder.append("pageSize", pageSize);
    }
    return queryBuilder;
  }

  getOrders(pageSize: number, page?: number): Observable<Page<WholeOrder>> {
    let queryParams = this.buildParams(pageSize, page);

    return this.http.get<Page<WholeOrder>>(
      `${this.apiURL}/orders`, { params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
