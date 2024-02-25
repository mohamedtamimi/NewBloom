import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PickListModule } from 'primeng/picklist';
import { Article, ArticleSearch } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsheader',
  templateUrl: './newsheader.component.html',
  styleUrls: ['./newsheader.component.scss']
})
export class NewsheaderComponent implements OnInit {
  lstSourceArticle : ArticleSearch[];
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  lstTragetArticle : ArticleSearch[];
  @ViewChild ('PL')PL:PickListModule 
  public storageUrl = environment.StorageUrl;
  constructor(private global : GlobalService,private messageService: MessageService,public utilities: UtilitiesService,private router : Router) { 
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
    this.global.ArticleHighlight(1,this.lstTragetArticle).subscribe(res =>{
      this.lstSourceArticle = res;
      this.showMessageService('Article','Article Header Highlight is Saved','success');
      this.lstSourceArticle=[]
      this.lstTragetArticle=[]
    });
  }

  GetArticlceToHighlight(){
     
  let art = new Article();
  art.fkArticleTypeId = 1;
  this.global.GetArticlceToHighlight(art).subscribe(res =>{
    this.lstSourceArticle = res;

  });
  }

  GetHighlightedArticles(){
    let art = new Article();
    art.fkArticleTypeId = 1;

    this.global.GetHighlightedArticles(art).subscribe(res =>{
      this.lstTragetArticle = res;

    });
    }

}
