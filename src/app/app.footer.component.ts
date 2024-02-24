import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';
import { UtilitiesService } from './services/utilities.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})
export class AppFooterComponent implements OnInit {

  user=JSON.parse(sessionStorage.getItem('userAuth'))
userMode:boolean=false
  items: any[] = [];
  moreItems = []; // Array for additional items to display in the dialog
  displayMoreDialog = false; // Control the visibility of the dialog
  @ViewChild('op') op: OverlayPanel;

  constructor(public router: Router, private global: GlobalService, private utilities: UtilitiesService,) { }


  ngOnInit() {
    this.userMode= this.user?true:false
    console.log( this.user);
    console.log( this.userMode);
    
    this.GetAllCategories()
  }
  Redirect() {
    this.router.navigateByUrl('/login');
  }
  GetAllCategories() {
    const subscription = this.global.GetAllCategories().subscribe((results: any) => {

      console.log(results);
      if (results.length > 8) {
        this.items = results.slice(0, 8).map(el => ({
          label: this.utilities.language === 'en' ? el.categoryName : el.categoryName_ar, routerLink: [`/filter/category/${el.categoryId}`],
          categoryId: el.categoryId
        }));

        const moreItems = results.slice(8).map(el => ({
          label: this.utilities.language === 'en' ? el.categoryName : el.categoryName_ar, routerLink: [`/filter/category/${el.categoryId}`],
          categoryId: el.categoryId
        }));
        this.moreItems = moreItems
        this.items.push({
          label: this.utilities.transl(''), icon: 'pi pi-angle-down', items: moreItems, command: (event) => {
            console.log('toogle');

            this.op.show(event)

          }
        });
      } else {
        this.items = results.map(el => ({
          label: this.utilities.language ? el.categoryName : el.categoryName_ar,
          categoryId: el.categoryId
        }));
      }




      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }

}
