import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP = 38,
  DOWN = 40
}

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit, AfterViewInit {
  selectedId: any;
  count: number = 0;
  constructor() { }

  listOfItem: any[];
  @ViewChild('addbtn') addbtn: ElementRef;
  @ViewChild('deletebtn') deletebtn: ElementRef;

  ngOnInit(): void {
    this.count = 1;
    this.listOfItem = [];

  }


  ngAfterViewInit() {


    fromEvent(this.addbtn.nativeElement, 'click').subscribe(res => {
      let countval = "Box" + this.count++;
      console.log(countval);
      this.print(countval);
      console.log(res);

    });
  }

  print(val) {
    let el = document.createElement('li');
    el.style.boxSizing = 'content-box';
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.padding = '30px';
    el.style.marginTop = '20px';
    el.style.marginRight = '15px';
    //
    el.style.position = 'relative';
    el.style.left = '0px';
    el.style.top = '0px';
    //
    el.style.backgroundColor = '#ffe0b3';
    el.style.display = 'inline';
    el.innerText = val;
    el.id = val;
    var mylist = document.getElementById('elContainer');
    mylist.appendChild(el);
  }

  onchange(event) {

    this.selectedId = null
    var list = null;
    this.selectedId = event.target.id;
    list = document.getElementsByTagName("li");

    for (let i = 0; i < list.length; i++) {
      if ((event.target.style.backgroundColor) == 'rgb(255, 224, 179)') {

        list[this.selectedId].style.backgroundColor = 'rgb(255, 99, 71)';
        this.listOfItem.push(list[this.selectedId]);
        break;
      } else {

        list[this.selectedId].style.backgroundColor = 'rgb(255, 224, 179)';
        this.listOfItem.splice(this.selectedId, 1);

        console.log(this.listOfItem);

        // this.listOfItem.pop();
        break;

      }
    }
  }


  onDeleteClick() {
    var list1 = null;
    console.log("on delete--->", this.selectedId);
    list1 = document.getElementById('elContainer');
    var list = document.getElementsByTagName("li");
    if (this.listOfItem.length != 0) {

      for (let i = 0; i < list.length; i++) {

        this.listOfItem.forEach(element => {
          if ((element.style.backgroundColor) == 'rgb(255, 99, 71)') {
            list[element.id].remove();
          }
        });
        this.listOfItem = [];
      }

    }
    else {
      alert("Please Select the Box Which you want to delete!!!!")
    }
  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    var list = document.getElementsByTagName("li");

    if (this.listOfItem.length != 0) {
      for (let i = 0; i < list.length; i++) {

        this.listOfItem.forEach(element => {
          if ((element.style.backgroundColor) == 'rgb(255, 99, 71)') {
            if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
              element.style.left = parseInt(element.style.left) + 15 + 'px';
            }

            else if (event.keyCode === KEY_CODE.LEFT_ARROW) {
              element.style.left = parseInt(element.style.left) - 5 + 'px';
            }

            else if (event.keyCode === KEY_CODE.UP) {
              element.style.top = parseInt(element.style.top) - 5 + 'px';
            }
            else if (event.keyCode === KEY_CODE.DOWN) {
              element.style.top = parseInt(element.style.top) + 5 + 'px';
            }
          }
        });
      }
    }
    else {
      alert("Please Select the Box Which you want to Move!!!!")
    }
  }

}
