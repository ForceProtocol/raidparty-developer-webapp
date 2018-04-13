import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: any;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toaster: ToastrService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  signup() {
    this.auth.signup(this.signupForm.value)
      .subscribe((data) => {
        this.toaster.success('Success', "Signed up successfully", {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toaster.error('Error', "You are not signed up please try again", {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      })
  }

}
