// NPM Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from 'angularx-social-login';

// Generated Components
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../../../_component/header/header.component';

// Generated Routing
import { LayoutRoutingModule } from './layout-routing.module';

// Environment
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
})

export class LayoutModule {}
