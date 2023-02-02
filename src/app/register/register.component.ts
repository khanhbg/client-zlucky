
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
  }
  register() {
    try {
      let userName = document.getElementById("userName") as HTMLInputElement;
      let email = document.getElementById("email") as HTMLInputElement;
      let phoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
      let password = document.getElementById("password") as HTMLInputElement;
      let rePassword = document.getElementById("rePassword") as HTMLInputElement;
      console.log(password.value)
      if (password.value !== rePassword.value) {
        window.alert("Xác nhận mật khẩu chưa khớp!");
        return
      }
      this.http.post<any>('http://14.225.205.12:3000/user/register', {
        withCredentials: true,
        userName: userName.value,
        email:email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        rePassword: rePassword.value,
        
      }).subscribe(data => {
        console.log(data)
        if (data.code == 0) {
          window.alert("Đăng ký thành công!");
          this.router.navigateByUrl('/login');
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
