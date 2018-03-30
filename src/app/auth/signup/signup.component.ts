import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: any;

  constructor(private fb: FormBuilder,
              private auth: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {

    this.signupForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  signup() {
    this.auth.signup(this.signupForm.value)
      .subscribe((data) => {
        console.log("Signup successfully");
      },
      (error) => {
        this.error = error;
      })
  }

}
