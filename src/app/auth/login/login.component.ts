import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  isOnActivate: boolean = false;
  developerId: string;
  pin: string;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toaster: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    let params = this.activatedRoute.snapshot.queryParams;
    if (params.developer) {
      this.developerId = params.developer;
      this.pin = params.pin
      this.isOnActivate = true;
    } else {
      this.isOnActivate = false;
      this.createForm();
    }
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
          timeOut: 3000,
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

  activateDevloper() {
    this.auth.activateDevloper(this.developerId, this.pin)
      .subscribe((response) => {
        this.toaster.success('Success', response.msg, {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toaster.error('Error', error.message, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }

}
