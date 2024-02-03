import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Article, ArticleSearch, Category } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categoryheader',
  templateUrl: './categoryheader.component.html',
  styleUrls: ['./categoryheader.component.scss']
})
export class CategoryheaderComponent implements OnInit {
  lstSourceArticle : ArticleSearch[];
  lstTragetArticle : ArticleSearch[];
  lstCategory : any[];
  selectedCategory : number;
  public storageUrl = environment.StorageUrl;
  constructor(private global : GlobalService,private messageService: MessageService,private utl:UtilitiesService) { 
    this.lstSourceArticle = [];
    this.lstTragetArticle = [];
    this.lstCategory = [];
    this.selectedCategory = 0;
  }
  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }
 
  ngOnInit(): void {
    this.LoadDefinitions();
  }
  LoadDefinitions(){
  
  
    this.global.GetAllCategories().subscribe(data =>{
      data.map(el => {
        this.lstCategory.push({ label:this.utl.language === 'en' ? el.categoryName : el.categoryName_ar, categoryId: el.categoryId, routerLink: [`/filter/tag/${el.tagId}`] })
      })
    });
  
   
  }

  Search(){
    this.GetArticlceToHighlight();
    this.GetHighlightedArticles();
  }


  Save(){
    this.global.ArticleCategoryHighlight(1, this.selectedCategory,this.lstTragetArticle).subscribe(res =>{
      this.lstSourceArticle = res;
      this.showMessageService('Article','Article Header Highlight is Saved','success');
      this.lstSourceArticle=[]
      this.lstTragetArticle=[]
    });
  }

  GetArticlceToHighlight(){
     
  let art = new Article();
  art.fkArticleTypeId = 1;
  art.fkCategoryId =  this.selectedCategory;
  this.global.GetArticlceToHighlightByRegionCategory(art).subscribe(res =>{
    this.lstSourceArticle = res;

  });
  }

  GetHighlightedArticles(){
    let art = new Article();
    art.fkArticleTypeId = 1;
    art.fkCategoryId =  this.selectedCategory;

    this.global.GetHighlightArticleByRegionCategory(art).subscribe(res =>{
      this.lstTragetArticle = res;

    });
    }

}
