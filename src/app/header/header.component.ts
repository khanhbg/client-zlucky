import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  numberGame:any
  isLogin=false
  role:any
  currentUrl='';
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    if (localStorage.getItem('role') != null && document.cookie.length > 0) this.isLogin = true;
    if (localStorage.getItem('role') != null) this.role = localStorage.getItem('role');
    if(this.isLogin){
      this.getNumberGame()
    }
    this.currentUrl= this.router.url;
  }
  logout() {
    document.cookie = "; path=/;";
    localStorage.clear();
    this.isLogin=false
    this.router.navigateByUrl('/home');
  }
  getNumberGame(){
    this.http.post('https://zolucky.onrender.com/numberGame',{userId:localStorage.getItem('userId'),},{withCredentials: true}).subscribe(data => {  
      //console.log(this.listPrizes)
      this.numberGame= (JSON.parse(JSON.stringify(data))['user']);
    })
  }
}
