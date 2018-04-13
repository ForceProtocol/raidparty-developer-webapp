import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toaster: ToastrService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/games/list'])
    }
  }

  createForm() {

    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  login() {
    this.auth.login(this.loginForm.value)
      .subscribe((data) => {
        this.toaster.success('Success', "Logged in successfully", {
          timeOut: 1000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/games/list']);
      },
      (error) => {
        this.toaster.error('Error', error.message, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }

}
