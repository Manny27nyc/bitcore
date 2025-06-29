/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../logger/logger';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private logger: Logger) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next
      .handle(request)
      .retry(1)
      .catch((err: HttpErrorResponse) => {
        const errorMessage =
          err.error instanceof Error
            ? `An error occurred: ${err.error.message}`
            : `Error ${err.status}: ${err.message || err.error}`;
        this.logger.error(errorMessage);
        throw errorMessage;
      });
  }
}
