// Default Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Generated Modules
import { AppRoutingModule } from './app-routing.module';

// Generated Components
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';

// Generated Interceptor
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { LoaderInterceptor } from '../_helpers/loader.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor, /** Display loader on every Http Request */
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, /** Add JWT token in every Http Request Header*/
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {}
