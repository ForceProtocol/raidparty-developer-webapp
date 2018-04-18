import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  changePasswordForm: FormGroup;
  error: string;
  isForgetPassword: boolean = true;
  developerId: string;
  pin: string;


  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {

    if (this.activatedRoute.snapshot.queryParams.developer) {
      this.isForgetPassword = false;
      this.developerId = this.activatedRoute.snapshot.queryParams.developer;
      this.pin = this.activatedRoute.snapshot.queryParams.pin;
      this.changePasswordForm = this.fb.group({
        password: ['', Validators.required]
      });
    } else {
      this.isForgetPassword = true;
      this.forgotPasswordForm = this.fb.group({
        email: ['', Validators.email]
      });
    }
  }

  resetPassword() {
    this.auth.resetPassword(this.forgotPasswordForm.value)
      .subscribe((data) => {
        this.toaster.success('Success', "Your reset password request has been sent successfully", {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/login']);
      },
      (errorObj) => {
        this.toaster.error('Error', errorObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        })
      });
  }

  changePassword() {
    this.auth.changePassword(this.changePasswordForm.value, this.developerId, this.pin)
      .subscribe((response) => {
        this.toaster.success('Success', response.msg, {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/login']);
      },
      (errorObj) => {
        this.toaster.error('Error', errorObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        })
      });
  }

}
