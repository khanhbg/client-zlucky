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
    this.http.get('https://zolucky.onrender.com/user/profile', {
      withCredentials: true
    }).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data))['profile'];
    })
  }
  update():void{
    
  }
 
}
