

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from '../Service/form-service.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  errormsg: string = '';

  constructor(
    public formService: FormServiceService,
    private router: Router,
    private toastrService: ToastrService
  ) { }
  isLogedInPage: boolean = true
  isSignUppage: boolean = false
  firstName: any
  lastName: any
  emailId: any
  password: any
  confirmPassword: any
  mobileNumber: any
  loginUserName: any
  loginUserPassword: any

  ngOnInit(): void {
  }

  onChangePage() {
    this.isLogedInPage = !this.isLogedInPage
    this.isSignUppage = !this.isSignUppage
    this.errormsg = ''
  }


  signupAccount() {
    if (this.firstName == 'null' || this.firstName == 'undefined' || this.firstName == '' || this.firstName == null || this.firstName == undefined) {
      this.errormsg = 'Enter First Name'
      return;
    }
    if (this.lastName == 'null' || this.lastName == 'undefined' || this.lastName == '' || this.lastName == null || this.lastName == undefined) {
      this.errormsg = 'Enter Last Name'
      return;
    }
    if (this.emailId == 'null' || this.emailId == 'undefined' || this.emailId == '' || this.emailId == null || this.emailId == undefined) {
      this.errormsg = 'Enter Email ID'
      return;
    }
    if (this.password == 'null' || this.password == 'undefined' || this.password == '' || this.password == null || this.password == undefined) {
      this.errormsg = 'Enter Password'
      return;
    }
    if (this.confirmPassword == 'null' || this.confirmPassword == 'undefined' || this.confirmPassword == '' || this.confirmPassword == null || this.confirmPassword == undefined) {
      this.errormsg = 'Enter Confirm Password'
      return;
    }
    if (this.mobileNumber == 'null' || this.mobileNumber == 'undefined' || this.mobileNumber == '' || this.mobileNumber == null || this.mobileNumber == undefined) {
      this.errormsg = 'Enter Mobile Number'
      return;
    }
    if (this.confirmPassword = !this.password) {
      this.errormsg = 'Passwords do not match'
      return;
    }
    let check = `select * from loginTable where emailid= '${this.emailId}'`
    this.formService.loginCheck(check).subscribe(res => {
      if (res == 1) {
        this.errormsg = 'Email ID already Exist'
        return;
      }
      check = `select * from loginTable where mobile= '${this.mobileNumber}'`
      this.formService.loginCheck(check).subscribe(res => {
        if (res == 1) {
          this.errormsg = 'Mobile Number already Exist'
          return;
        }
        let payload = `insert into loginTable(firstName,lastName,emailId,passwrd,mobile) 
    values ('${this.firstName}','${this.lastName}','${this.emailId}','${this.password}','${this.mobileNumber}')`
        this.formService.signUpDataSave(payload).subscribe(res => {
          this.firstName = ""
          this.lastName = ""
          this.confirmPassword = ""
          this.password = ""
          this.mobileNumber = ""
          this.emailId = ""
          this.errormsg = ''
          this.isSignUppage = !this.isSignUppage
          this.isLogedInPage = !this.isLogedInPage
        })

      })
    })

  }

  login() {
    this.errormsg = '';
    if (!this.loginUserName) {
      this.errormsg = 'Please enter user name'
    }
    let qry = ""
    if (this.loginUserName.includes("@")) {
      qry = `select * from logintable where emailid= '${this.loginUserName.trim()}' limit 1;`
    } else if (Number.isInteger(this.loginUserName)) {
      qry = `select * from logintable where mobile= '${this.loginUserName.trim()}' limit 1;`
    } else {
      this.errormsg = 'User not found.'
      return;
    }

    this.formService.loginData(qry).subscribe(res => {
      if (this.loginUserPassword == res.rows[0]["passwrd"]) {
        localStorage.setItem("userName", res.rows[0]["firstname"])
        localStorage.setItem("lastName", res.rows[0]["lastname"])
        localStorage.setItem("email", res.rows[0]["emailid"])
        localStorage.setItem("mobile", res.rows[0]["mobile"])
        this.router.navigateByUrl("/task");
      }
      this.errormsg = 'User not found.'
    })
  }


  keyPressNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/\d+\.?\d*/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  signUpUser() {
    if (this.firstName == 'null' || this.firstName == 'undefined' || this.firstName == '' || this.firstName == null || this.firstName == undefined) {
      this.errormsg = 'Enter First Name'
      return;
    }
    if (this.lastName == 'null' || this.lastName == 'undefined' || this.lastName == '' || this.lastName == null || this.lastName == undefined) {
      this.errormsg = 'Enter Last Name'
      return;
    }
    if (this.emailId == 'null' || this.emailId == 'undefined' || this.emailId == '' || this.emailId == null || this.emailId == undefined) {
      this.errormsg = 'Enter Email ID'
      return;
    }
    if (this.password == 'null' || this.password == 'undefined' || this.password == '' || this.password == null || this.password == undefined) {
      this.errormsg = 'Enter Password'
      return;
    }
    if (this.confirmPassword == 'null' || this.confirmPassword == 'undefined' || this.confirmPassword == '' || this.confirmPassword == null || this.confirmPassword == undefined) {
      this.errormsg = 'Enter Confirm Password'
      return;
    }
    if (this.mobileNumber == 'null' || this.mobileNumber == 'undefined' || this.mobileNumber == '' || this.mobileNumber == null || this.mobileNumber == undefined) {
      this.errormsg = 'Enter Mobile Number'
      return;
    }
    if (this.confirmPassword = !this.password) {
      this.errormsg = 'Passwords do not match'
      return;
    }
    let payload = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "password": this.password,
      "mobile": this.mobileNumber,
      "emailid": this.emailId
    }
    this.formService.signUpUser(payload).subscribe(res => {
      if (res.success) {
        this.firstName = ""
        this.lastName = ""
        this.confirmPassword = ""
        this.password = ""
        this.mobileNumber = ""
        this.emailId = ""
        this.isSignUppage = !this.isSignUppage
        this.isLogedInPage = !this.isLogedInPage
        this.errormsg = ''
      } else {
        this.errormsg = 'User is already exists'
      }
    })
  }


  loginUser() {
    this.errormsg = '';
    if (!this.loginUserName) {
      this.errormsg = 'Please enter user name'
    }
    let payload = {}
    if (this.loginUserName.includes("@")) {
      payload = {
        "emailid": this.loginUserName,
        "password": this.loginUserPassword
      }
    } else if (Number.isInteger(this.loginUserName)) {
      payload = {
        "mobile": this.loginUserName,
        "password": this.loginUserPassword
      }
    } else {
      this.errormsg = 'User not found.'
      return;
    }
    this.formService.loginUser(payload).subscribe(res => {
      if (res.success) {
        localStorage.setItem("userName", res.data.firstName)
        localStorage.setItem("lastName", res.data.lastname)
        localStorage.setItem("email", res.data.emailid)
        localStorage.setItem("mobile", res.data.mobile)
        this.router.navigateByUrl("/task")
      } else {
        this.errormsg = 'User ID or Password is wrong'
      }
    })
  }


}

