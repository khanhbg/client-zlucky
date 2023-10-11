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
      let phoneFormat = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (phoneNumber.value=="") {
        window.alert("Vui lòng nhập số điện thoại!");
        return
      }
      if (!phoneNumber.value.match(phoneFormat)) {
        window.alert("Số điện thoại không đúng định dạng");
        return
      }
      if (password.value=="") {
        window.alert("Vui lòng nhập mật khẩu!");
        return
      }
      
      this.http.post<any>('http://14.225.205.12:3000/user/login', {
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
