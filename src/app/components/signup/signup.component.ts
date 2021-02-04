import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SignUp } from 'src/app/shared/signup';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm : FormGroup;
  signUp :SignUp;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.signUpForm = this.fb.group({
      firstName:"",
      lastName:"",
      middleName:"",
      phonenum:"",
      email:""
    })
  }

  onSubmit(){
    this.signUp = this.signUpForm.value;
  }



}
