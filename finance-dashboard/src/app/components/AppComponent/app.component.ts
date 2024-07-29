import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../SidebarComponent/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: `./app.template.html`,
})


export class AppComponent {}
