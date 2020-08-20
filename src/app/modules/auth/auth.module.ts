// Defaults Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from 'angularx-social-login';

// Generated Routing
import { AuthRoutingModule } from './auth-routing.module';

// Generated Components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// Environment
import { environment } from '../../../environments/environment';
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
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

export class AuthModule {}
