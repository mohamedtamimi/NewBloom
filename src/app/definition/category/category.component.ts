import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  lstCategory : any[];
  ObjCat : Category;
  constructor(private messageService: MessageService,private global : GlobalService,private utl:UtilitiesService,private router : Router) { 
    this.lstCategory = [];
    this.ObjCat = new  Category();
  }
  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }
  ngOnInit(): void {
    const isAllowed= this.formsUser.find(form=>form?.form?.formPath == this.router.url)
    isAllowed? true :this.router.navigateByUrl('/dashboard')
    this.GetAllCategories();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
edit(cat:Category){
  this.ObjCat =cat;
}


GetAllCategories(){
  this.global.GetAllCategories().subscribe(data => {
    this.lstCategory=data
    // data.map(el => {
    //   this.lstCategory.push({ label:this.utl.language === 'en' ? el.categoryName : el.categoryName_ar, categoryId: el.categoryId, routerLink: [`/filter/tag/${el.tagId}`] })
    // })
  });
}

AddNew(){
   

  if(this.ObjCat.categoryName === ''){
    this.showMessageService('Category','Please enter Category Name','error');
    return;

  }
  if(this.ObjCat.categoryName_ar === ''){
    this.showMessageService('Category','Please enter Category Name Arabic','error');
    return;

  }

  this.global.createCategory(this.ObjCat).subscribe(data => {
    this.lstCategory.push(this.ObjCat);
    this.ObjCat = new  Category();
    this.showMessageService('Category','Saved Successfully','success');

  }, error => {
    this.showMessageService('Error','Please Contact Administrator','error');

 
});

}

delete(cat:Category){
 
  this.global.DeleteCategory(cat).subscribe(data => {
    this.GetAllCategories();
    this.showMessageService('Category','Deleted Successfully','success');

  }, error => {
    this.showMessageService('Error','Please Contact Administrator','error');
});
}

}
