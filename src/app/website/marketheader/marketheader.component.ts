import {  Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { MarketStat } from 'src/app/class/externalapi';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { TranslateService } from '@ngx-translate/core';


class Market {
  name: string;
  code: string;
  inactive : boolean
}

@Component({
  selector: 'app-marketheader',
  templateUrl: './marketheader.component.html',
  styleUrls: ['./marketheader.component.scss']
})
export class MarketheaderComponent implements OnInit {
  lstStat: MarketStat[];
  @ViewChild('tradingview') tradingview?: ElementRef;
  markt: Market[];

  selectedMarket: Market;
 
  constructor(private utilities : UtilitiesService , private lang : TranslateService, private global : GlobalService, public router: Router,private _renderer2: Renderer2) {

    this.lstStat = [];
    this.selectedMarket = new Market();
    
   }
  ngOnInit(): void {

    
   
  this.markt = [
    {name: this.lang.instant('Crypto_Currency'), code: 'C', inactive: false},
    {name: 'معدن', code: 'M', inactive: false},
    {name: 'مخازن', code: 'S', inactive: false}
];
this.selectedMarket = this.markt[0];
this.GetAllCryptoAndMetal();
    
    }
    
    
    GetAllCryptoAndMetal(){
       
      this.global.GetAllCryptoAndMetal(this.selectedMarket.code).subscribe(res =>{
        this.lstStat = [];
        this.lstStat = res;
         
       ;
      });
      }
      // ngAfterViewInit(): void {
      //   setTimeout(function() {
       
  
      //   let script = this._renderer2.createElement('script');
      //   script.type = `text/javascript`;
      //   script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
      //   script.text = `
      //   {
      //     "symbols": [
      //       {
      //         "proName": "FOREXCOM:SPXUSD",
      //         "title": "S&P 500"
      //       },
      //       {
      //         "proName": "FOREXCOM:NSXUSD",
      //         "title": "US 100"
      //       },
      //       {
      //         "proName": "FX_IDC:EURUSD",
      //         "title": "EUR/USD"
      //       },
      //       {
      //         "proName": "BITSTAMP:BTCUSD",
      //         "title": "Bitcoin"
      //       },
      //       {
      //         "proName": "BITSTAMP:ETHUSD",
      //         "title": "Ethereum"
      //       },
      //       {
      //         "description": "GOLD",
      //         "proName": "TVC:GOLD"
      //       },
      //       {
      //         "description": "AED/USD",
      //         "proName": "FX_IDC:AEDUSD"
      //       },
      //       {
      //         "description": "EMAAR",
      //         "proName": "DFM:EMAAR"
      //       }
      //     ],
      //     "colorTheme": "light",
      //     "isTransparent": false,
      //     "showSymbolLogo": true,
      //     "locale": "en"
      //   }`;
      
      //   this.tradingview?.nativeElement.appendChild(script);
      // }, 1000);
      // }

 
    }