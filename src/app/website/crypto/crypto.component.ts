import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Datum } from 'src/app/class/externalapi';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {

  cryptoRes : Datum[];

  constructor(private global : GlobalService) {
    this.cryptoRes = [];
   }

  ngOnInit(): void {

    this.GetCryptoRates();

  }

  GetCryptoRates(){
    this.global.GetCrypto().subscribe(res =>{
       
      this.cryptoRes = res.data;
      this.cryptoRes =  this.cryptoRes.sort(x => x.quote.usd.price);
    });
    }

}
