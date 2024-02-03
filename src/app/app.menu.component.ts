import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { UtilitiesService } from './services/utilities.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container " >
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" style="font-size: large;" [style.text-align]="lang=='ar'?'start':null" [attr.aria-label]="item.label">{{item.label|translate}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child  of item.items " [item]="child " [index]="i" role="none"></li>
                    </ul>
                </li>
         
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];
 lang =this.utilities.language
    constructor(public appMain: AppMainComponent, private utilities: UtilitiesService,) { }

    ngOnInit() {
        console.log(this.lang);
        
        this.model = [
            // {
            //     label: 'Home',
            //     items:[
            //         {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/']}
            //     ]
            // },
            {
                label:'Definition',
                items: [
                    { label: 'Category', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/category'] },
                    { label: 'Region', icon: 'pi pi-fw pi-sun', routerLink: ['/dashboard/region'] },
                    { label: 'Author', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/author'] },
                    { label: 'Tags', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/tags'] }
                ]
            },
            {
                label:'Article',
                items: [
                    { label: 'Article Definition', icon: 'pi pi-fw pi-book', routerLink: ['/definearticle/0/1'] },
                    { label: 'Article', icon: 'pi pi-fw pi-book', routerLink: ['/dashboard/articlelist'] },
                    { label: 'Approve Article', icon: 'pi pi-fw pi-send', routerLink: ['/dashboard/publishlist'] },
                ]
            },
            {
                label:'Headline',
                items: [
                    { label: 'Ticket', icon: 'pi pi-fw pi-ticket', routerLink: ['/dashboard/lstheadline'] },
                    { label: 'Publish Ticket', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/publishheadline'] },
                ]
            },
            // {
            //     label: 'Blog',
            //     items:[
            //         {label: 'Blog',icon: 'pi pi-fw pi-ticket', routerLink: ['/dashboard/lstblog']},
            //         {label: 'Publish Blog',icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/publishblog']},
            //     ]
            // },
            {
                label: 'Design',
                items: [
                    { label: 'Main Header', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/assignheader'] },
                    { label: 'News Headline', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/newsheadline'] },
                    { label: 'Category News', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/categorylist'] },
                    { label: 'Region News', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/regionlist'] }
                ]
            },
            // {
            //     label: 'Social Media',
            //     items:[
            //         {label: 'Share Article',icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/sharearticle']}
            //     ]
            // },
            {
                label: 'Pages',
                items: [
                    { label: 'News Home', icon: 'pi pi-fw pi-globe', routerLink: ['/home'] },

                ]
            },

        ];
       
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
