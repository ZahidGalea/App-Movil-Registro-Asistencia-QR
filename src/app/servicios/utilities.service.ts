import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

  validateModel(model: any) {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        return false;
      }
    }
    return true;
  }

  public isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  };


}
