import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Datum, GoldApiResponse, MarketStat } from 'src/app/class/externalapi';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-metal',
  templateUrl: './metal.component.html',
  styleUrls: ['./metal.component.scss']
})
export class MetalComponent implements OnInit {

  

doughnetgolddata: any;
doughnetsilvdata: any;
doughnetplatdata: any;
doughnetpladdata: any;

multiAxisData: any;
lstStatGold: MarketStat[];
lstStatSilver: MarketStat[];
lstStatPlat: MarketStat[];
lstStatPlad: MarketStat[];
  constructor(private global : GlobalService) {
    // this.objmetal = new GoldApiResponse();
    // this.metaltype = 'XAU';
    // this.metalName = '';
    // this.lstmetal = [];
    this.lstStatGold = [];
    this.lstStatSilver = [];
    this.lstStatPlat = [];
    this.lstStatPlad = [];
   }

  ngOnInit(): void {

  this.GetAllMetal();


  }
  GetAllMetal(){
     
    this.global.GetAllStatMetal('XAU').subscribe(res =>{
      this.lstStatGold = [];
      this.lstStatGold = res;

     let lbl = [];
     let data = [];
     let bgcolor = [];
     this.lstStatGold.forEach(element => {
      lbl.push(element.name);
      data.push(element.price);
      bgcolor.push(this.getRandomColor());
     });

      this.doughnetgolddata = {
        labels: lbl,
        datasets: [
            {
                data: data,
                backgroundColor: bgcolor,
                hoverBackgroundColor: bgcolor
            }
        ]
    };

    });

    this.global.GetAllStatMetal('XAG').subscribe(res =>{
      this.lstStatSilver = [];
      this.lstStatSilver = res;

      let lbl = [];
      let data = [];
      let bgcolor = [];
      this.lstStatSilver.forEach(element => {
       lbl.push(element.name);
       data.push(element.price);
       bgcolor.push(this.getRandomColor());
      });
 
       this.doughnetsilvdata = {
         labels: lbl,
         datasets: [
             {
                 data: data,
                 backgroundColor: bgcolor,
                 hoverBackgroundColor: bgcolor
             }
         ]
     };

    });

    this.global.GetAllStatMetal('XPT').subscribe(res =>{
      this.lstStatPlat = [];
      this.lstStatPlat = res;

      let lbl = [];
      let data = [];
      let bgcolor = [];
      this.lstStatPlat.forEach(element => {
       lbl.push(element.name);
       data.push(element.price);
       bgcolor.push(this.getRandomColor());
      });
 
       this.doughnetplatdata = {
         labels: lbl,
         datasets: [
             {
                 data: data,
                 backgroundColor: bgcolor,
                 hoverBackgroundColor: bgcolor
             }
         ]
     };
    });

    this.global.GetAllStatMetal('XPD').subscribe(res =>{
      this.lstStatPlad = [];
      this.lstStatPlad = res;

      let lbl = [];
      let data = [];
      let bgcolor = [];
      this.lstStatPlad.forEach(element => {
       lbl.push(element.name);
       data.push(element.price);
       bgcolor.push(this.getRandomColor());
      });
 
       this.doughnetpladdata = {
         labels: lbl,
         datasets: [
             {
                 data: data,
                 backgroundColor: bgcolor,
                 hoverBackgroundColor: bgcolor
             }
         ]
     };

    });


    }


  // LoadData(){
  //   if(this.metaltype === 'XAU'){
  //     this.metalName = 'Gold';
  //   } else  if(this.metaltype === 'XAG'){
  //     this.metalName = 'Silver';
  //   } else  if(this.metaltype === 'XPT'){
  //     this.metalName = 'Platinum';
  //   } else  if(this.metaltype === 'XPD'){
  //     this.metalName = 'Palladium';
  //   }  
  //   this.GetMetalPriceByType();
  // }
  // GetMetalPriceByType(){
  //   this.global.GetMetal(this.metaltype).subscribe(data =>{
  //     this.objmetal = data;
  //     this.lstmetal.push( this.objmetal);
  //   let colors = [];
  //   for (var i = 0; i < 6; i++) {
     
  //     colors.push(this.getRandomColor());
  // }

  //   this.multiAxisData = {
  //     labels: ['Gram 24k','Gram 22k','Gram 21k','Gram 20k','Gram 18k'],
  //     datasets: [{
  //         label:  this.metalName + 'Price',
  //         backgroundColor:colors,
  //         yAxisID: 'y',
  //         data: [this.objmetal.price_gram_24k,this.objmetal.price_gram_22k,this.objmetal.price_gram_21k,this.objmetal.price_gram_20k,this.objmetal.price_gram_18k],
  //     }]
  // };

  //   });
  //   }
    getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#'; // <-----------
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

}
