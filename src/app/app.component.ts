import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'store';

  ngOnInit() {
    fromEvent(window, 'storage').subscribe((data) => {
      console.log('storage event', data);
    });
  }

  onClick() {
    localStorage.setItem(`${Math.random() * 100}`, `${Math.random() * 100}`);
  }
}
