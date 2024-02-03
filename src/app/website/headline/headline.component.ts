import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, ArticleSearch } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import {DividerModule} from 'primeng/divider';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

  lstheadline : ArticleSearch[];

  public storageUrl = environment.StorageUrl;
  constructor(private global : GlobalService, public router: Router,private ult: UtilitiesService) {
    this.lstheadline = [];

   }

   ngOnInit(): void {


    this.GetHighlightedArticles();
    }
    GetHighlightedArticles(){
      let art = new Article();
      art.fkArticleTypeId = 2;
  
      this.global.GetHighlightedArticles(art).subscribe(res =>{
        this.lstheadline = res;
  
      });

      }

}
