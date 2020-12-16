import { Component, OnInit } from '@angular/core';
import {timer, Observable, Subscription, fromEvent, pipe, throwError} from 'rxjs';
import {first, map, timeInterval} from 'rxjs/operators';
import {error} from "@angular/compiler-cli/src/transformers/util";




@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  amountSec = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  sub: Subscription;
  dbclickSub: Subscription;
  dbclick;

  counter;


  constructor() {

  }

  ngOnInit(): void {

    this.counter = new Observable( observeble => {
      return timer(0, 1000).pipe( ).subscribe( (event) => {
        observeble.next(event )
      })
    })


    let wait = document.querySelector(".wait")
    this.dbclick =  new Observable( obs => {
      fromEvent(wait, 'click').pipe( timeInterval() ).subscribe( time => {
        obs.next(time.interval)
        obs.complete();
      });

    })
  }

  dublclick(){
    this.dbclickSub =  this.dbclick.subscribe( ( e:number ) => {
      if (!this.sub){ return }
      else {
        e < 300 ? this.sub.unsubscribe() : null;
        this.dbclickSub.unsubscribe()
      }
    })

  }
  startTime(): void {
     let count = this.amountSec;
     if (!this.sub || this.sub.closed ){
          this.sub = this.counter.subscribe((e) => {
            this.amountSec = count + e;
            this.countTime(this.amountSec);
          });
      } else {
      this.resetCounter();
      }
  }
  reStartCounter(): void {
    if ( this.sub && this.amountSec !== 0 ){
      this.sub.unsubscribe();
      this.resetCounter();
      this.startTime();
    } else {
      this.massage('need to start timer');
    }
  }
  resetCounter(): void {
    this.sub.unsubscribe();
    this.amountSec = 0
    this.countTime( this.amountSec);

  }
  countTime(amountSec): void {

    this.seconds = amountSec % 60;
    this.minutes = Math.floor(amountSec % 3600 / 60);
    this.hours = Math.floor(amountSec % 86400 / 3600);
  }

  massage(massage): void {
    console.log(massage);
  }


}
