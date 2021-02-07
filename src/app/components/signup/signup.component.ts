import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SignUp } from 'src/app/shared/signup';
import {DataService} from 'src/app/services/data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm : FormGroup;
  signUp :SignUp;
  users : SignUp[] = [];
  user : SignUp;

  @ViewChild("fform") signUpFormDirective; // To reset the form


  constructor(private fb: FormBuilder,private dataService:DataService) { 
    this.createForm();
  }

  
  ngOnInit() {
    this.getDatafromAPI();
    console.log(this.users);
  }

  // addUser(){
  //   const newUser = {
  //     firstName : this.signUp.firstName,
  //     middleName : this.signUp.middleName,
  //     lastName : this.signUp.lastName,
  //     phonenum : this.signUp.phonenum,
  //     email : this.signUp.email
  //   }
  //   this.dataService.sendData(newUser).subscribe( user => console.log(user));
  // }


  signUpErrors = {
    firstName:"",
    middleName:"",
    lastName:"",
    phonenum:"",
    email:"",
    password:""
  }

  validationMessages = {
    firstName: {
      required: "First Name is required.",
      minlength: "First name must be atleast 2 characters long",
      maxlength: "First name cannot be more than 25 characters long",
    },
    middleName: {
      required: "Middle name is required.",
      minlength: "Middle name must be atleast 2 characters long",
      maxlength: "Middle name cannot be more than 25 characters long",
    },
    lastName: {
      required: "Last name is required.",
      minlength: "Last name must be atleast 2 characters long",
      maxlength: "Last name cannot be more than 25 characters long",
    },
    phonenum: {
      required: "Phone number is required",
      pattern: "Phone number must contains only numbers"
    },
    email: {
      required: "Email is required",
      email: "Email is not in valid format",
    },
    password:{
      required:"Password is required"
    }
  }
  createForm(){
    this.signUpForm = this.fb.group({
      firstName:["",[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ],
      lastName:["",[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ],
      middleName:["",[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ],
      phonenum:[0,[Validators.required,Validators.pattern]],
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    });

    this.signUpForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.signUpForm)
      return;
    const form = this.signUpForm;
    for(const field in this.signUpErrors){
      if(this.signUpErrors.hasOwnProperty(field)){
        this.signUpErrors[field] = "";
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.signUpErrors[field]+=messages[key] + " ";
            }
          }
        }
      }
    }  
  }

  onSubmit(){
    console.log("Form data submitted")
    this.signUp = this.signUpForm.value;
    this.dataService.sendData(this.signUp).subscribe((res) => {
      console.log(res);
    });
    this.signUpForm.reset({
      firstName:"",
      middleName:"",
      lastName:"",
      phonenum:0,
      email:"",
      password:""
    });
    this.signUpFormDirective.resetForm();
  }

  getDatafromAPI(){
    this.dataService.getData().subscribe((response)=>{
       // console.log("Response from API",response);
        response.forEach(value => this.users.push(value));

      }, ((error) =>{
        console.log("error is", error)
      } )
    )
  }

}
