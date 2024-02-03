import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Tags } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;

  lstTags : any[];
  ObjTag : Tags;
  constructor(private messageService: MessageService,private global : GlobalService,private utl:UtilitiesService) { 
    this.lstTags = [];
    this.ObjTag = new  Tags();
  }
  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }
  ngOnInit(): void {
    this.GetAllTags();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
edit(tag:Tags){
  this.ObjTag =tag;
}


GetAllTags(){
  this.global.GetAllTag().subscribe(data => {
   this.lstTags=data
  });
}

AddNew(){
   

  if(this.ObjTag.tagValue === ''){
    this.showMessageService('Tags','Please enter Tag','error');
    return;

  }


  this.global.createTag(this.ObjTag).subscribe(data => {
    this.GetAllTags();
    this.ObjTag = new  Tags();
    this.showMessageService('Tags','Saved Successfully','success');

  }, error => {
    this.showMessageService('Error','Please Contact Administrator','error');

 
});

}

delete(tag:any){
  let body={
    tagId:tag.id
  }
 
  this.global.DeleteTag(body).subscribe(data => {
    this.GetAllTags();
    this.showMessageService('Tags','Deleted Successfully','success');

  }, error => {
    this.showMessageService('Error','Please Contact Administrator','error');
});
}


}
