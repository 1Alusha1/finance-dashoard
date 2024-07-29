import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar-comp',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './sidebar.template.html',
  styleUrl:'./sidebar.style.scss'
})
export class SidebarComponent {}
