import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleSearch } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-newsbyregion',
  templateUrl: './newsbyregion.component.html',
  styleUrls: ['./newsbyregion.component.scss']
})
export class NewsbyregionComponent implements OnInit {

  lstRegArticles : ArticleSearch[];

  RegId : number;

  public storageUrl = environment.StorageUrl;
  
  
  carouselResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  
    
    constructor(private global : GlobalService, public router: Router) {
  
      this.lstRegArticles = [];
     }
  
    ngOnInit(): void {
  
  }
  GetArticlesByRegion(){
    this.global.GetArticlesByRegion(this.RegId).subscribe(res =>{
      this.lstRegArticles = res;
    
    });
    }
   

}
