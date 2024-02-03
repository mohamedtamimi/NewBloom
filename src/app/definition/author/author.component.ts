import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Authors } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  lstAuthor : Authors[];
  ObjAuthor : Authors;
  @ViewChild('filter') filter: ElementRef;
  constructor(private messageService: MessageService,private global : GlobalService) { 
    this.lstAuthor = [];
    this.ObjAuthor = new  Authors();
  }

  ngOnInit(): void {
    this.GetAllAuthrs();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}

showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
  this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
  }


edit(aut:Authors){
  this.ObjAuthor =aut;
}

GetAllAuthrs(){
  this.global.GetAllAuthor().subscribe(data => {
    this.lstAuthor = data;
  });
}

AddNew(){
  if(this.ObjAuthor.authorName === ''){
    this.showMessageService('Category','Please enter Authors Name','error');
    return;

  }
  if(this.ObjAuthor.authorName_ar === ''){
    this.showMessageService('Authors','Please enter Authors Name Arabic','error');
    return;

  }
  this.global.createAuthor(this.ObjAuthor).subscribe(data => {
    this.GetAllAuthrs();
    this.ObjAuthor = new  Authors();
    this.showMessageService('Authors','Saved Successfully','success');

  }, error => {
    this.showMessageService('Authors','Please Contact Administrator','error');
});

}
delete(AR:Authors){
 
  this.global.DeleteAuthor(AR).subscribe(data => {
    this.GetAllAuthrs();
    this.showMessageService('Authors','Deleted Successfully','success');
  
  }, error => {
    this.showMessageService('Authors','Please Contact Administrator','error');
});
}



}
