import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Article } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-articlepublishlist',
  templateUrl: './articlepublishlist.component.html',
  styleUrls: ['./articlepublishlist.component.scss']
})
export class ArticlepublishlistComponent implements OnInit {
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  lstArticle : Article[];
  public storageUrl = environment.StorageUrl;
  @ViewChild('filter') filter: ElementRef;
  constructor(private global : GlobalService,private router : Router) { 
    this.lstArticle = [];
  }

  ngOnInit(): void {
    const isAllowed= this.formsUser.find(form=>form?.form?.formPath == this.router.url)
    isAllowed? true :this.router.navigateByUrl('/dashboard')
    this.GetUnPublishArticles();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}

GetUnPublishArticles(){
  this.global.GetUnpublishedArticles(1).subscribe(res =>{
    this.lstArticle = res;
  });
  }

edit(aut:Article){
  this.router.navigate(['/definearticle/' + aut.articleId.toString()+'/3']);
}

AddNew(){

}
}
