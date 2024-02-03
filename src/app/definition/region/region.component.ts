import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Region } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  
  lstRegion : Region[];
  ObjRegion : Region;

  constructor(private messageService: MessageService,private global : GlobalService) { 
    this.lstRegion = [];
    this.ObjRegion = new  Region();
  }
  showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }

  ngOnInit(): void {

    this.GetAllRegions();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
edit(cat:Region){
  this.ObjRegion =cat;
}

GetAllRegions(){
  this.global.GetAllRegions().subscribe(data => {
    this.lstRegion = data;
  });
}

AddNew(){

   
 
  if(this.ObjRegion.regionName === ''){
    this.showMessageService('Regions','Please enter Region Name','error');
    return;

  }

  if(this.ObjRegion.regionName_ar === ''){
    this.showMessageService('Regions','Please enter Region Name Arabic','error');
    return;

  }
  this.global.createRegions(this.ObjRegion).subscribe(data => {
    this.lstRegion.push(this.ObjRegion);
    this.ObjRegion = new  Region();
    this.showMessageService('Regions','Saved Successfully','success');

  }, error => {
    this.showMessageService('Error','Please Contact Administrator','error');
});

}

delete(reg:Region){
 
  this.global.DeleteRegion(reg).subscribe(data => {
    this.GetAllRegions();
    this.showMessageService('Regions','Deleted Successfully','success');
  }, error => {
    this.showMessageService('Error','Please Contact Administrator','error');

});
}
}
