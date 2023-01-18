
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lucky-wheel',
  templateUrl: './lucky-wheel.component.html',
  styleUrls: ['./lucky-wheel.component.css']
})
export class LuckyWheelComponent {
  isLogin=false
  oldPass:any
  public da:any
  public listPrizes:any
  ele: any;
  container: any;
  canvas: any;
  num: any;
  btn: any;
  deg = 0;
  transform = "transform";
  transitionEnd = "transitionend";
  isPercentage = true;
  prizes:any;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // this.spin() 
    if (localStorage.getItem('role') != null && document.cookie.length > 0) this.isLogin = true;
     this.getListPrize()
    //this.postUpdateSpin(2)  
  }
  getListPrize(){
    this.http.get('https://zolucky.onrender.com/user/getListPrizes',{withCredentials: true}).subscribe(data => {
      //console.log(this.listPrizes)
      this.listPrizes= JSON.parse(JSON.stringify(data))['listPrizes'];
      this.spin(this.listPrizes)
      
    })
  }
  fnGotBack(data:any){
      if(data == null){
        Swal.fire(
          'Chương trình kết thúc',
          'Đã hết phần thưởng',
          'error'
        )
      } else if (data == 'Chúc bạn may mắn lần sau'){
        Swal.fire(
          'Bạn không trúng thưởng',
          data,
          'error'
        )
      } else{
        Swal.fire(
          'Đã trúng giải',
          data,
          'success'
        )
      }
  }
init= async(opts:any) =>{  
    try{
      this.num=opts.prizes.length
      this.prizes=opts.prizes
      let draw=await this.draw(opts);
      if(draw){
        console.log(draw)
        this.events(opts);
      }
    }catch(e){
      console.log(e)
    } 
  }
  $(id:any) {
    return document.getElementById(id);
  };

draw = (opts:any):any => {
    return new Promise(async (resolve, reject) => {
        try {
          console.log("abc")
          opts = opts || {};
          if (!opts.id || this.num >>> 0 === 0) return;
          var id = opts.id,
            rotateDeg = 360 / this.num / 2 + 90,
            ctx,
            prizeItems = document.createElement("ul"),
            turnNum = 1 / this.num,
            html = [];
      
          this.ele = this.$(id);
          this.canvas = this.ele.querySelector(".hc-luckywheel-canvas");
          this.container = this.ele.querySelector(".hc-luckywheel-container");
          this.btn = this.ele.querySelector(".hc-luckywheel-btn");
          prizeItems.style.cssText = "position: absolute;left: 0;top: 0; width: inherit;height: inherit; z-index: 2;padding-left:0rem;"
          if (!this.canvas.getContext) {
            this.showMsg("Browser is not support");
            return;
          }
          ctx = this.canvas.getContext("2d"); // chi dinh ctx de chi dinh boi canh hien thi
      
          for (var i = 0; i < this.num; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(250, 250); // Center Point
            ctx.moveTo(0, 0);
            ctx.rotate((((360 / this.num) * i - rotateDeg) * Math.PI) / 180);
            // console.log((((360 / this.num) * i - rotateDeg) * Math.PI) / 180)
            // console.log(rotateDeg)
            ctx.arc(0, 0, 250, 0, (2 * Math.PI) / this.num, false); // Radius // ve vong tron tu oo
            if (i % 2 == 0) { // neu chan mau 1, k chan mau 2
              ctx.fillStyle = "#ffb820";
            } else {
              ctx.fillStyle = "#ffcb3f";
            }
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#e4370e";
            ctx.stroke();
            ctx.restore();
            var prizeList = opts.prizes;
            html.push('<li class="hc-luckywheel-item" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;color: #e4370e;font-weight: bold;text-shadow: 0 1px 1px rgb(255 255 255 / 60%);list-style: none" > <span class="hc-luckywheel-span" style="position: relative;display: block;padding-top: 20px; margin: 0 auto;text-align: center; -webkit-transform-origin: 50% 250px; -ms-transform-origin: 50% 250px; transform-origin: 50% 250px;');
            html.push(this.transform + ": rotate(" + i * turnNum + 'turn)">');
            if (opts.mode == "both") {
              html.push("<p id='curve' style='margin: 0;padding: 0' >" + prizeList[i].prizesName + "</p>");
              html.push('<img style="position: relative;top: -20px; left: 0px; width: 100px;height: 100px" src="' + prizeList[i].image + '" />');
            } else if (prizeList[i].image) {
              html.push('<img style="position: relative;top: -20px; left: 0px; width: 100px;height: 100px" src="' + prizeList[i].image + '" />');
            } else {
              html.push('<p style="margin: 0;padding: 0" id="curve">' + prizeList[i].prizesName + "</p>");
            }
            html.push("</span> </li>");
            if (i + 1 === this.num) {
              prizeItems.className = "hc-luckywheel-list";
              this.container.appendChild(prizeItems);
              prizeItems.innerHTML = html.join("");
            }
          }
          resolve(1)
        } catch (e) {
            reject(e)
        }
})
} //ok

  ddraw(opts:any) {
    opts = opts || {};
    if (!opts.id || this.num >>> 0 === 0) return;
    var id = opts.id,
      rotateDeg = 360 / this.num / 2 + 90,
      ctx,
      prizeItems = document.createElement("ul"),
      turnNum = 1 / this.num,
      html = [];

    this.ele = this.$(id);
    this.canvas = this.ele.querySelector(".hc-luckywheel-canvas");
    this.container = this.ele.querySelector(".hc-luckywheel-container");
    this.btn = this.ele.querySelector(".hc-luckywheel-btn");
    prizeItems.style.cssText = "position: absolute;left: 0;top: 0; width: inherit;height: inherit; z-index: 2;padding-left:0rem;"
    if (!this.canvas.getContext) {
      this.showMsg("Browser is not support");
      return;
    }
    ctx = this.canvas.getContext("2d"); // chi dinh ctx de chi dinh boi canh hien thi

    for (var i = 0; i < this.num; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(250, 250); // Center Point
      ctx.moveTo(0, 0);
      ctx.rotate((((360 / this.num) * i - rotateDeg) * Math.PI) / 180);
      // console.log((((360 / this.num) * i - rotateDeg) * Math.PI) / 180)
      // console.log(rotateDeg)
      ctx.arc(0, 0, 250, 0, (2 * Math.PI) / this.num, false); // Radius // ve vong tron tu oo
      if (i % 2 == 0) { // neu chan mau 1, k chan mau 2
        ctx.fillStyle = "#ffb820";
      } else {
        ctx.fillStyle = "#ffcb3f";
      }
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#e4370e";
      ctx.stroke();
      ctx.restore();
      var prizeList = opts.prizes;
      html.push('<li class="hc-luckywheel-item" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;color: #e4370e;font-weight: bold;text-shadow: 0 1px 1px rgb(255 255 255 / 60%);list-style: none" > <span class="hc-luckywheel-span" style="position: relative;display: block;padding-top: 20px; margin: 0 auto;text-align: center; -webkit-transform-origin: 50% 250px; -ms-transform-origin: 50% 250px; transform-origin: 50% 250px;');
      html.push(this.transform + ": rotate(" + i * turnNum + 'turn)">');
      if (opts.mode == "both") {
        html.push("<p id='curve' style='margin: 0;padding: 0' >" + prizeList[i].prizesName + "</p>");
        html.push('<img style="position: relative;top: -20px; left: 0px; width: 100px;height: 100px" src="' + prizeList[i].image + '" />');
      } else if (prizeList[i].image) {
        html.push('<img style="position: relative;top: -20px; left: 0px; width: 100px;height: 100px" src="' + prizeList[i].image + '" />');
      } else {
        html.push('<p style="margin: 0;padding: 0" id="curve">' + prizeList[i].prizesName + "</p>");
      }
      html.push("</span> </li>");
      if (i + 1 === this.num) {
        prizeItems.className = "hc-luckywheel-list";
        this.container.appendChild(prizeItems);
        prizeItems.innerHTML = html.join("");
      }
    }
  }

  showMsg(msg:any) {
    alert(msg);
  }
events(opts:any) {
  let data
  let http=this.http
  let isLogin= this.isLogin
  let isPercentage=this.isPercentage
    function randomIndex(prizes:any):any{
      function sum(num:any):any{    
        if(num==0){
          return prizes[0].percent
        }
        return (prizes[num].percent + sum(num-1)) 
      }
        if(isPercentage){
          var counter = 1;
          for (let i = 0; i < prizes.length; i++) {
            if(prizes[i].number == 0){
              counter++
            }
          }
          if(counter == prizes.length){
            return null
          }
          let rand = Math.random()*100;
          console.log(rand)
          var prizeIndex:number= -1;
          for(let i=0;i<prizes.length;i++){
            if(sum(i)>rand){
              prizeIndex= i
              break
            }
          }
          if(prizes[prizeIndex].number != 0){
            return prizeIndex
          }else{
            return randomIndex(prizes)
          }
        }else{
          var counter = 0;
          for (let i = 0; i < prizes.length; i++) {
            if(prizes[i].number == 0){
              counter++
            }
          }
          if(counter == prizes.length){
            return null
          }
          var rand = (Math.random() * (prizes.length)) >>> 0;
          if(prizes[rand].number != 0){
            prizes[rand].number = prizes[rand].number - 1
            return rand
          }else{
            return randomIndex(prizes)
          }
        }
    }
    function postUpdateSpin(prizeId:any,userId:any){
      http.post('https://zolucky.onrender.com/user/updateSpin', {  
        prizeId,
        userId
      },{
        withCredentials: true
      }).subscribe(data => {      
      })
    }
    function numberGame(userId:any):any{
      http.post('https://zolucky.onrender.com/user/profile',{  
      userId
    }).subscribe(data => {
     return JSON.parse(JSON.stringify(data))['profile'];

    })
    }
    let router=this.router
    let btn = this.btn;
    let addClass=this.addClass
    let deg= this.deg
    let num=this.num
    let bind=this.bind
    let container=this.container
    let transitionEnd= this.transitionEnd
    let transform=this.transform
    let fnGotBack=this.fnGotBack
    let removeClass=this.removeClass
    this.bind(btn,"click", function() {
      if(!isLogin){
        window.alert("Xin vui lòng đăng nhập để tiếp tục!")
        router.navigateByUrl('/login');
        return
      }
      if(numberGame(localStorage.getItem('userId')) ==0){
        window.alert("Bạn đã hết lượt quay")
        //router.navigateByUrl('/login');
        return
      }
    addClass(btn, "disabled");
    var prizeId = randomIndex(opts.prizes)
    console.log(prizeId)
    //postUpdateSpin(prizeId)
    deg = deg || 0;
    deg = deg + (360 - (deg % 360)) + (360 * 10 - prizeId * (360 / num));
    // runRotate(deg);
    container.style[transform] = "rotate(" + deg + "deg)"
    postUpdateSpin(opts.prizes[prizeId].id,localStorage.getItem('userId'))
    bind(container, transitionEnd, function(){
      if ( prizeId == null) {
        return fnGotBack(null);
         
      } else {
        removeClass(btn, "disabled");
         fnGotBack(opts.prizes[prizeId].prizesName);
         return prizeId
      }
    });
    })
    //updateSpin(prizeId)
  }
bind(ele:any, event:any, fn:any) {
    if (typeof addEventListener === "function") {
      ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
      ele.attachEvent("on" + event, fn);
    }
  }

hasClass(ele:any, cls:any) {
    if (!ele || !cls) return false;
    if (ele.classList) {
      return ele.classList.contains(cls);
    } else {
      return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }
  }

  // addClass
 addClass(ele:any, cls:any) {
    if (ele.classList) {
      ele.classList.add(cls);
    } else {
      if (!this.hasClass(ele, cls)) ele.className += "" + cls;
    }
  }

  // removeClass
removeClass(ele:any, cls:any) {
    if (ele.classList) {
      ele.classList.remove(cls);
    }
  }

spin(listPrizes:any) {

    this.init({
      
      id: "luckywheel",
      mode : "both",
      prizes : listPrizes, 
    });
}
// reloadData():void {
//   this.http.get('https://zolucky.onrender.com/user/profile', {
//     withCredentials: true
//   }).subscribe(data => {
//     this.data = JSON.parse(JSON.stringify(data))['user'];
//   })
// }
}
