import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<h1>home</h1>',
})
export class HomeComponent {
}
