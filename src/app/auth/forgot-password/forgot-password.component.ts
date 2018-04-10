import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private toaster: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {

    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.email]
    });
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
      (error) => {
        this.error = error;
      });
  }

}
