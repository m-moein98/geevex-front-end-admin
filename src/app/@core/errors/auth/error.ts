import { HttpErrorResponse } from "@angular/common/http";

export default class AppError {

  constructor(
    private error?: HttpErrorResponse,
  ) { }

}
