// Default Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Generated Services
import { UserService } from '../../../../_services/user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activateRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): any {
    this.initMethods();
  }

  initMethods(): any {
    /**
   * Redirect User to home page if he is already logged in
   */
    if (this.userService.userValue) {
      this.router.navigate(['/']);
    }
    this.resetSignUpForm();
  }

  resetSignUpForm(): any {
    /**
     * Sign Up form intialization
     */
    this.signupForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  // convenience getter for easy access to form fields
  get signupFormControls(): any {
    return this.signupForm.controls;
  }
  /**
   * @description Sign up new user
   * @param value 
   */
  async submitSignupForm(value) {
    try {
      this.isSubmitted = true;
      if (this.signupForm.invalid) {
        return;
      }
      await this.userService.register(this.signupForm.value);
      this.toastr.success('Registration Success', 'Success');
      this.router.navigate(['/']);
    } catch (err) {
      if (err.error && err.error.error) {
        err = err.error.error;
      }
      this.toastr.error(err, 'Error');
    }
  }
}
