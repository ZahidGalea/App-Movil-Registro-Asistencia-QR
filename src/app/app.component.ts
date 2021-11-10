import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
  }

  public isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  };

}
