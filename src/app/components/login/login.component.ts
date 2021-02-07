import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {Login} from 'src/app/shared/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup;
  login : Login;

  constructor(private route: Router,private fb:FormBuilder,private dataService:DataService) {
    this.createLoginForm();
   }

  ngOnInit() {
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email:"",
      password:""
    })
  }


  submit(){
    this.login = this.loginForm.value;
    this.dataService.checkUser(this.login).subscribe((res) => console.log(res));
  }



  goToHome(){
    this.route.navigateByUrl('/');
  }

}
