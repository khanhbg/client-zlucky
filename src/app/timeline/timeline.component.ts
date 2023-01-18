import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  listWin: any;
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    if (localStorage.getItem('role') == null || document.cookie.length == 0) this.router.navigateByUrl('/home');
    // (document.getElementById('begin_date') as HTMLInputElement).value = new Date().toISOString().substring(0, 10);
    // (document.getElementById('end_date') as HTMLInputElement).value = new Date().toISOString().substring(0, 10);
    this.reloadData()
  }
  reloadData() {
    this.http.post('https://zolucky.onrender.com/user/listWin',{  
      userId:localStorage.getItem('userId'),
    }).subscribe(data => {
      console.log(data)
     this.listWin = JSON.parse(JSON.stringify(data))['listWinPrizes'];
     console.log(this.listWin)
    })
  }
  

}
