import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  constructor(private cookie: CookieService) {}

  private getOptions = () => ({
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(this.cookie.check('accessToken') ? {Authorization: `Bearer ${this.cookie.get('accessToken')}`} : {})
      })
  })

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone(this.getOptions())).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message)
    return throwError(error);
  }
}
