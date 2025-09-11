import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import NotFoundError from "./auth/userNotFound.error";
import AppError from "./auth/error";
import AuthError from "./auth/auth.error";
import AlreadyError from "./auth/alreadyError.error";

const ErrorHandler = (error: HttpErrorResponse, errorMessage?: string): Observable<any> => {
  if (error.status === 401)
    return throwError(() => new AuthError())
  else if (error.status === 404) {
    if (errorMessage)
      alert(errorMessage)
    else
      alert(error.message)
    return throwError(() => new NotFoundError())
  }
  else if (error.status === 406)
    return throwError(() => new AlreadyError())
  else if (error.status === 500)
    return throwError(() => new AppError(error))
  else return throwError(() => { new AppError(error) })

}

export default ErrorHandler;

