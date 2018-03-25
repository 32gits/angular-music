import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './grid.css', '/simple-grid-ONLYGRID.css']
})
export class AppComponent {
  title = 'app';
  googleChromeURL = 'https://www.google.com/chrome/';
  angularURL = 'https://angular.io/';

  constructor() {
  }
}


