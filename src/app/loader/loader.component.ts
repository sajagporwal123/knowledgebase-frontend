// Default Modules
import { Component } from '@angular/core';

// Generated Services
import { LoaderService } from '../../_services/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})

export class LoaderComponent {
  public loading: boolean;

  constructor(
    private loaderService: LoaderService
  ) {
    /**
     * Subscribe for hide/show loader
     */
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
}
