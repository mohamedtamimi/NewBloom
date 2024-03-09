import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss']
})
export class NewsFilterComponent implements OnInit {

  constructor(private arouter: ActivatedRoute,private global : GlobalService,public ult: UtilitiesService) { }
  articales=[]
  type
  category_Name
  num=8;
  ReadMore:boolean = false

  public storageUrl = environment.StorageUrl;
  ngOnInit(): void {

    this.arouter.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.type = params.get('type');
   
      
      this.getfilters(id, this.type)
      });
      console.log('fliter',this.type);
      

  }

  toggleNumber() {
    this.num = this.ReadMore ? 8 : 99;    
    this.ReadMore = !this.ReadMore;
  }
  getfilters(id,type){    
    this.ReadMore=false
    this.num = 8
    this.global.getFilters(id,type).subscribe( data => {
     console.log(type,data);
     
     this.articales=data
    
     this.category_Name = this.articales[0]?.categoryName
    })
  }

  onclick()
  {
    this.ReadMore = true; //not equal to condition
    this.num = 1000;
  }

}
