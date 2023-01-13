import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogin=false
  role:any
  currentUrl='';
  constructor( private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem('role') != null && document.cookie.length > 0) this.isLogin = true;
    if (localStorage.getItem('role') != null) this.role = localStorage.getItem('role');
    this.currentUrl= this.router.url;
  }
  logout() {
    document.cookie = "; path=/;";
    localStorage.clear();
    this.isLogin=false
    this.router.navigateByUrl('/home');
  }
}
