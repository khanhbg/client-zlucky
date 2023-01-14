import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) { }
    ngOnInit(): void {
      this.login()
    }
    login() {
      try {
        console.log('test')
        this.http.get('https://zolucky.onrender.com', {
        }
        ).subscribe( data => {
          console.log(data)
        });
      } catch (error) {
        console.log(error);
      }
   }
  
}
