import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class LoaderService {
 /**
  *  Hide/Show Loader
  */
  public isLoading = new BehaviorSubject(false);

  constructor() {}
}
