// Default Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

// Generated Services
import { UserService } from '../../../../_services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initMethods();
  }

  initMethods(): any {
    /**
     * Redirect User to home page if he is already logged in
     */
    if (this.userService.userValue) {
      this.router.navigate(['/']);
    }
    /**
     * Form initialization
     */
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    /**
     * Socail Media Sign In
     */
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        const data = {
          socailMedia: 'GOOGLE',
          token: user.idToken,
        };
        this.socialLogin(data);
      } else {
        console.log('Logout');
      }
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }
  /**
   * Login Form Submit
   */
  async onSubmit() {
    try {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.loading = true;
      await this.userService.login(this.f.email.value, this.f.password.value);
      this.loading = false;
      /**
       * Redirect user to home page
       */
      this.router.navigate(['/']);
    } catch (err) {
      this.loading = false;
      if (err.error && err.error.error) {
        err = err.error.error;
      }
      this.toastr.error(err, 'Error');
    }
  }
  /**
   * Log in with Google
   */
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  /**
   * Logout from Social media
   */
  signOut(): void {
    this.socialAuthService.signOut(true);
  }
  /**
   * @description Sign-up social media login user and get token
   * @param data 
   */
  async socialLogin(data) {
    try {
      await this.userService.loginWithSocial(data);
      this.router.navigate(['/']);
    } catch (err) {
      console.log('err', err);
      if (err.error && err.error.error) {
        err = err.error.error;
      }
      this.toastr.error(err, 'Error');
    }
  }
}
