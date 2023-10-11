
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
  id = "luckywheel"
  numberGame: any
  isLogin = false
  oldPass: any
  da: any
  listPrizesD: any
  listPrizes: any
  ele: any;
  container: any;
  canvas: any;
  num: any;
  btn: any;
  deg = 0;
  transform = "transform";
  transitionEnd = "transitionend";
  isPercentage = true;
  prizes: any;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') != null && document.cookie.length > 0) {
      this.isLogin = true;
    }
    this.reloadData()

  }
   
  getnumberGame = (userId: any): any => {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.post('http://14.225.205.12:3000/user/numberGame', {
          userId
        }, {
          withCredentials: true
        }).subscribe(data => {
          let numberG: any
          numberG = JSON.parse(JSON.stringify(data))['user']
          //console.log(numberG.gameNumber)
          this.numberGame = numberG.gameNumber
          resolve(1)
        })
      } catch (e) {
        reject(0)
      }
    })
  }

  getListPrize = (): any => {
    return new Promise(async (resolve, reject) => {
      try {
        //console.log('getnumber')
        await this.http.get('http://14.225.205.12:3000/user/getListPrizes',
          { withCredentials: true }).toPromise().then(data => {
            //console.log(this.listPrizes)
            this.listPrizes = JSON.parse(JSON.stringify(data))['listPrizes'];
            //console.log(this.listPrizes)
          })
        resolve(1)
      } catch (e) {
        reject(0)
      }
    })
  }
  getListPrizeDraw = (): any => {
    return new Promise(async (resolve, reject) => {
      try {
        //console.log('getnumberDraw')
        await this.http.get('http://14.225.205.12:3000/user/getListPrizesD',
          { withCredentials: true }).toPromise().then(data => {
            //console.log(this.listPrizes)
            this.listPrizesD = JSON.parse(JSON.stringify(data))['listPrizes'];
            //console.log(this.listPrizesD)
          })
        resolve(1)
      } catch (e) {
        reject(0)
      }
    })
  }
  fnGotBack(data: any) {
    if (data == null) {
      Swal.fire(
        'Chương trình kết thúc',
        'Đã hết phần thưởng',
        'error'
      )
    } else if (data == 'MISS') {
      Swal.fire(
        'Bạn không trúng thưởng',
        data,
        'error'
      )
    } else {
      Swal.fire(
        'Đã trúng giải',
        data,
        'success'
      )
    }
  }

  $(id: any) {
    return document.getElementById(id);
  };

  draw = (listPrizes: any) => {
    try {
      //console.log("draw")
      let rotateDeg = 360 / this.num / 2 + 90,
        ctx,
        prizeItems = document.createElement("ul"),
        turnNum = 1 / this.num,
        html = [];

      this.ele = this.$(this.id);
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
        var prizeList = listPrizes;
        html.push('<li class="hc-luckywheel-item" style="position: absolute;left: 0px;top: -15px;width: 100%;height: 100%;color: #e4370e;font-weight: bold;text-shadow: 0 1px 1px rgb(255 255 255 / 60%);list-style: none" > <span class="hc-luckywheel-span" style="position: relative;display: block;padding-top: 20px; margin: 0 auto;text-align: center; -webkit-transform-origin: 50% 250px; -ms-transform-origin: 50% 250px; transform-origin: 50% 250px;');
        html.push(this.transform + ": rotate(" + i * turnNum + 'turn)">');
        //html.push("<p id='curve' style='margin: 0;padding: 0' >" + prizeList[i].prizesName + "</p>");
        html.push('<img style="position: relative; padding-top:20px; top: -20px; left: 0px; width: 127px;height: 127px" src="' + prizeList[i].image + '" />');
        html.push("</span> </li>");
        if (i + 1 === this.num) {
          prizeItems.className = "hc-luckywheel-list";
          this.container.appendChild(prizeItems);
          prizeItems.innerHTML = html.join("");
        }
      }
    } catch (e) {
      console.log(e)
    }

  } //ok

  showMsg(msg: any) {
    alert(msg);
  }

  randomIndex(prizes: any): any {
    function sum(num: any): any {
      if (num == 0) {
        return prizes[0].percent
      }
      return (prizes[num].percent + sum(num - 1))
    }
    if (this.isPercentage) {
      var counter = 0;
      for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].number == 0) {
          counter++
        }
      }
      if (counter == prizes.length) {
        return null
      }
      let rand = Math.random() * 100;
      //console.log(rand)
      var prizeIndex: number = -1;
      for (let i = 0; i < prizes.length; i++) {
        if (sum(i) > rand) {
          prizeIndex = i
          break
        }
      }
      if (prizes[prizeIndex].number > 0) {
        prizes[prizeIndex].number--
        return prizes[prizeIndex].id
      } else {
        return this.randomIndex(prizes)
      }
    } else {
      var counter = 0;
      for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].number == 0) {
          counter++
        }
      }
      if (counter == prizes.length) {
        return null
      }
      var rand = (Math.random() * (prizes.length)) >>> 0;
      if (prizes[rand].number != 0) {
        prizes[rand].number = prizes[rand].number - 1
        return rand
      } else {
        return this.randomIndex(prizes)
      }
    }
  }
  postUpdateSpin(prizeId: any, userId: any) {
    this.http.post('http://14.225.205.12:3000/user/updateSpin', {
      prizeId,
      userId
    }, {
      withCredentials: true
    }).subscribe(data => {
    })
  }

  spin() {
    //console.log("spin")
    let fnGotBack = this.fnGotBack
    let removeClass = this.removeClass
    let btn = this.btn
    let listPrizesD = this.listPrizesD
    let prizeIndex:any
    if (!this.isLogin) {
      window.alert("Xin vui lòng đăng nhập để tiếp tục!")
      this.router.navigateByUrl('/login');
      return
    }
    if (this.numberGame <= 0) {
      window.alert("Bạn đã hết lượt quay")
      return
    }
    this.addClass(btn, "disabled");
    let prizeId = this.randomIndex(this.listPrizes)
    //console.log(prizeId)
    if (prizeId == null) {
      return fnGotBack(null);
    }
    for (let i = 0; i < this.listPrizesD.length; i++) {
      if (this.listPrizesD[i].id == prizeId) {
        prizeIndex=i
        console.log(this.listPrizesD[i].id)
        break
      }
    }
    //console.log(prizeIndex)
    //postUpdateSpin(prizeId)
    this.deg = this.deg || 0;
    this.deg = this.deg + (360 - (this.deg % 360)) + (360 * 10 - prizeIndex * (360 / this.num));
    // runRotate(deg);
    this.container.style[this.transform] = "rotate(" + this.deg + "deg)"
    this.postUpdateSpin(this.listPrizesD[prizeIndex].id, localStorage.getItem('userId'))
    this.numberGame--
    this.bind(this.container, this.transitionEnd, function () {
      if (prizeId == null) {
        return fnGotBack(null)
      } else {
        removeClass(btn, "disabled");
        fnGotBack(listPrizesD[prizeIndex].prizesName);
        return true
      }
    })
  }
  bind(ele: any, event: any, fn: any): any {
    if (typeof addEventListener === "function") {
      ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
      ele.attachEvent("on" + event, fn);
    }
  }

  hasClass(ele: any, cls: any) {
    if (!ele || !cls) return false;
    if (ele.classList) {
      return ele.classList.contains(cls);
    } else {
      return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }
  }

  // addClass
  addClass(ele: any, cls: any) {
    if (ele.classList) {
      ele.classList.add(cls);
    } else {
      if (!this.hasClass(ele, cls)) ele.className += "" + cls;
    }
  }

  // removeClass
  removeClass(ele: any, cls: any) {
    if (ele.classList) {
      ele.classList.remove(cls);
    }
  }
  reloadData=async()=>{
    try{
      if(this.isLogin){
        await this.getnumberGame(localStorage.getItem('userId'))
      }
      await this.getListPrize()
      await this.getListPrizeDraw()
      this.num = this.listPrizes.length
      //console.log(this.num)
      this.draw(this.listPrizesD);
    }catch(e){
      console.log(e)
    }
  
  }
}