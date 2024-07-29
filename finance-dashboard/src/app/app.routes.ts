import { Routes } from "@angular/router";
import { TableComponent } from "./components/TableComponent/table.component";
import { ShortInfoComponent } from "./components/ShortInfo/shortInfo.component";

export const routes: Routes = [
  { path: "table", component: TableComponent },
  { path: "summary", component: ShortInfoComponent },
];
