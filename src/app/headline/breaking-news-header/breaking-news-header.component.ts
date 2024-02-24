import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  lstSourceArticle : ArticleSearch[];
  lstTragetArticle : ArticleSearch[];
  public storageUrl = environment.StorageUrl;
  constructor(private global : GlobalService,private messageService: MessageService,private router : Router) { 
    this.lstSourceArticle = [];
    this.lstTragetArticle = [];
  }

  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }

  ngOnInit(): void {
    const isAllowed= this.formsUser.find(form=>form?.form?.formPath == this.router.url)
    isAllowed? true :this.router.navigateByUrl('/dashboard')
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
