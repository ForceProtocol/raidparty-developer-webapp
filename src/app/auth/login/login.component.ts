import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
              private auth: AuthService) {
    this.createForm();
  }

  ngOnInit() {
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
        console.log("Logged in successfully");
      },
      (error) => {
        this.error = error
      })
  }

}