import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Article, ArticleSearch } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-breaking-news-header',
  templateUrl: './breaking-news-header.component.html',
  styleUrls: ['./breaking-news-header.component.scss']
})
export class BreakingNewsHeaderComponent  implements OnInit {
  lstSourceArticle : ArticleSearch[];
  lstTragetArticle : ArticleSearch[];
  public storageUrl = environment.StorageUrl;
  constructor(private global : GlobalService,private messageService: MessageService) { 
    this.lstSourceArticle = [];
    this.lstTragetArticle = [];
  }

  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }

  ngOnInit(): void {
    this.GetArticlceToHighlight();
    this.GetHighlightedArticles();
  }

  Save(){
    this.global.ArticleHighlight(2,this.lstTragetArticle).subscribe(res =>{
      this.lstSourceArticle = res;
      this.showMessageService('Article','Breaking News Header Highlight is Saved','success');
      this.lstSourceArticle=[]
      this.lstTragetArticle=[]
    });
  }

  GetArticlceToHighlight(){
     
  let art = new Article();
  art.fkArticleTypeId = 2;
  this.global.GetArticlceToHighlight(art).subscribe(res =>{
    this.lstSourceArticle = res;

  });
  }

  GetHighlightedArticles(){
    let art = new Article();
    art.fkArticleTypeId = 2;

    this.global.GetHighlightedArticles(art).subscribe(res =>{
      this.lstTragetArticle = res;

    });
    }
}
