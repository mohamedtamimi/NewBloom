import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Article } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.scss']
})
export class ArticlelistComponent implements OnInit {
  lstArticle : Article[];
  public storageUrl = environment.StorageUrl;
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  @ViewChild('filter') filter: ElementRef;
  constructor(private global : GlobalService,private router : Router) { 
    
    this.lstArticle = [];
  }

  ngOnInit(): void {
    const isAllowed = (this.formsUser.find(form => form?.form?.formPath === this.router.url) || /^\/definearticle\/\d+\/\d+$/.test(this.router.url));
    isAllowed? true :this.router.navigateByUrl('/dashboard')
    this.GetUserArticles();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}

GetUserArticles(){
this.global.GetUserArticles(1).subscribe(res =>{
  res.sort((a, b) => {        
    return b.articleId - a.articleId;
  })
  this.lstArticle = res;
});
}
edit(aut:Article){
  this.router.navigate(['/definearticle/' + aut.articleId.toString()+'/2']);
}

AddNew(){
  this.router.navigate(['/definearticle/0/1']);
}

}
