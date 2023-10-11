import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent {
  constructor(private http: HttpClient, private router: Router) { }
  src = [0, 0, 0, 0, 0, 0, 0]
  missionNumber: any
  async ngOnInit() {
    console.log("abc")
    await this.showAttendance()
  }
  async showAttendance() {
    try {
      await this.getNumberMission()
      for (let i = 0; i < this.missionNumber; i++) {
        this.src[i] = 1
      }
    } catch (e) {
      console.log(e)
    }
  }
  async attendances(){
    await this.attendance()
    //await this.getNumberMission()
    await this.showAttendance()
  } 
  attendance = (): any => {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.post('http://14.225.205.12:3000/user/attendance', { userId: localStorage.getItem('userId') },
          { withCredentials: true }).subscribe(data => {
            // if(data){
            //   console.log(data.code)
            // }
            window.alert(JSON.parse(JSON.stringify(data))['message'])
            resolve(1)
          })
      } catch (e) {
        reject(e)
      }
    })

  }

  getNumberMission = (): any => {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.post('http://14.225.205.12:3000/user/getAttendanceNumber', {
          userId: localStorage.getItem('userId')
        },
          {
            withCredentials: true
          }).subscribe(data => {
            this.missionNumber = JSON.parse(JSON.stringify(data))['number'];
            resolve(1)
          })
      } catch (e) {
        reject(e)
      }
    })
  }
}
