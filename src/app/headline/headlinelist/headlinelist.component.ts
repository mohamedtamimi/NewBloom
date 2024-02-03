import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Article } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-headlinelist',
  templateUrl: './headlinelist.component.html',
  styleUrls: ['./headlinelist.component.scss']
})
export class HeadlinelistComponent implements  OnInit {
  lstArticle : Article[];
  public storageUrl = environment.StorageUrl;
  @ViewChild('filter') filter: ElementRef;
  constructor(private global : GlobalService,private router : Router) { 
    this.lstArticle = [];
  }

  ngOnInit(): void {
    this.GetUserArticles();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}

GetUserArticles(){
this.global.GetUserArticles(2).subscribe(res =>{
  this.lstArticle = res;
});
}
edit(aut:Article){
  this.router.navigate(['/headline/' + aut.articleId.toString()+'/2']);
}

AddNew(){
  this.router.navigate(['/headline/0/1']);
}

}

