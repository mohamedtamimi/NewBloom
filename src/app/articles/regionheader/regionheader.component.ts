import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Article, ArticleSearch, Region } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-regionheader',
  templateUrl: './regionheader.component.html',
  styleUrls: ['./regionheader.component.scss']
})
export class RegionheaderComponent implements OnInit {
  lstSourceArticle : ArticleSearch[];
  lstTragetArticle : ArticleSearch[];
  lstRegion : Region[];
  selectedRegion : number;
  public storageUrl = environment.StorageUrl;
  constructor(private global : GlobalService,private messageService: MessageService) { 
    this.lstSourceArticle = [];
    this.lstTragetArticle = [];
    this.lstRegion = [];
    this.selectedRegion = 0;
  }
  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }
 
  ngOnInit(): void {
    this.LoadDefinitions();
  }
  LoadDefinitions(){
  
  
    this.global.GetAllRegions().subscribe(data => {
      this.lstRegion = data;
    });
  
   
  }

  Search(){
    this.GetArticlceToHighlight();
    this.GetHighlightedArticles();
  }


  Save(){
    this.global.ArticleRegionHighlight(1,this.selectedRegion,this.lstTragetArticle).subscribe(res =>{
      this.lstSourceArticle = res;
      this.showMessageService('Article','Article Header Highlight is Saved','success');
    });
  }

  GetArticlceToHighlight(){
     
  let art = new Article();
  art.fkArticleTypeId = 1;
  art.fkRegionId = this.selectedRegion;
  this.global.GetArticlceToHighlightByRegionCategory(art).subscribe(res =>{
    this.lstSourceArticle = res;

  });
  }

  GetHighlightedArticles(){
    let art = new Article();
    art.fkArticleTypeId = 1;
    art.fkRegionId = this.selectedRegion;
    this.global.GetHighlightArticleByRegionCategory(art).subscribe(res =>{
      this.lstTragetArticle = res;

    });
    }

}
