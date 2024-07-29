import { Component } from "@angular/core";
import { UsersLoan } from "../TableComponent/table.component";
import { UserLoanService } from "../../services/userLoan.service";

@Component({
  selector: "shortInfo-comp",
  templateUrl: "./shortInfo.template.html",
})
export class ShortInfoComponent {
  data: UsersLoan[] = [];
  totalLoansByMonth: any[] = [];
  averageLoanAmountByMonth: any[] = [];
  totalLoanAmountByMonth: any[] = [];
  totalInterestByMonth: any[] = [];
  totalReturnedLoansByMonth: any[] = [];

  constructor(private dataService: UserLoanService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (result: UsersLoan[]) => {
        this.data = result;
        this.processData(this.data);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  processData(data: any[]): void {
    const loansByMonth = data.reduce((acc, loan) => {
      const issuanceMonth = new Date(loan.issuance_date).toLocaleString(
        "default",
        { month: "long", year: "numeric" }
      );
      if (!acc[issuanceMonth]) {
        acc[issuanceMonth] = [];
      }
      acc[issuanceMonth].push(loan);
      return acc;
    }, {});

    this.totalLoansByMonth = Object.keys(loansByMonth).map((month) => ({
      month,
      count: loansByMonth[month].length,
    }));

    this.averageLoanAmountByMonth = Object.keys(loansByMonth).map((month) => ({
      month,
      averageAmount:
        loansByMonth[month].reduce(
          (sum: any, loan: any) => sum + loan.body,
          0
        ) / loansByMonth[month].length,
    }));

    this.totalLoanAmountByMonth = Object.keys(loansByMonth).map((month) => ({
      month,
      totalAmount: loansByMonth[month].reduce(
        (sum: any, loan: any) => sum + loan.body,
        0
      ),
    }));

    this.totalInterestByMonth = Object.keys(loansByMonth).map((month) => ({
      month,
      totalInterest: loansByMonth[month].reduce(
        (sum: any, loan: any) => sum + loan.percent,
        0
      ),
    }));

    this.totalReturnedLoansByMonth = Object.keys(loansByMonth).map((month) => ({
      month,
      count: loansByMonth[month].filter((loan: any) => loan.actual_return_date)
        .length,
    }));
  }
}
