import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersLoan } from "../components/TableComponent/table.component";

@Injectable({
  providedIn: "root",
})
export class UserLoanService {
  private apiUrl =
    "https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json";

  constructor(private http: HttpClient) {}

  getData(): Observable<UsersLoan[]> {
    return this.http.get<UsersLoan[]>(this.apiUrl);
  }
}
