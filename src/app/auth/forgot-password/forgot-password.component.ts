import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
              private auth: AuthService) {
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
        console.log("Reset Password link has been sent successfully")
      },
      (error) => {
        this.error = error;
      });
  }

}
