import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'store-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<h1>store</h1>',
})
export class StoreComponent {}
