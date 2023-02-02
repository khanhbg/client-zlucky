import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') == null || document.cookie.length == 0) this.router.navigateByUrl('/home');
    this.reloadData()
  }

  reloadData():void {
    this.http.post('http://14.225.205.12:3000/user/profile',{  
      userId:localStorage.getItem('userId'),
    }).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data))['profile'];
    })
  }
  update():void{
    this.http.post<any>('http://14.225.205.12:3000/user/updateProfile', {
      userId:localStorage.getItem('userId'),
      userName: this.data.userName,
      phoneNumber: this.data.phoneNumber,
      email:this.data.email
    }, {
      withCredentials: true
    }).subscribe(data => {
      window.alert(data.message)
      if (data.code == 0) {
        this.router.navigateByUrl('/profile')
      }
    })
  }

}
