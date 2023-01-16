import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    try {
      let phoneNumber = document.getElementById("login_phoneNumber") as HTMLInputElement;
      let password = document.getElementById("login_password") as HTMLInputElement;
      this.http.post<any>('http://localhost:8080/user/login', {
        phoneNumber: phoneNumber.value,
        password: password.value,
      }, {
        withCredentials: true
      }
      ).subscribe( data => {
        if (data.code == 0) {
          if (data.user.role == 'admin'){
            this.router.navigateByUrl('/dashboard');   
          } 
          else{
            this.router.navigateByUrl('/luckyWheel');
          } 
          document.cookie = "cId=" + data.cId;
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('userId', data.user.id)
        }
        else {
          window.alert(data.message)
        }
      });
    } catch (error) {
      console.log(error);
    }
 }

}
