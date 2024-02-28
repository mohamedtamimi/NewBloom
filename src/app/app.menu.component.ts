import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { UtilitiesService } from './services/utilities.service';
import { Router } from '@angular/router';

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
    forms = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

    model: any[];
    lang = this.utilities.language
    constructor(public appMain: AppMainComponent, private utilities: UtilitiesService,private router:Router) { }

    ngOnInit() {
        // this.initMenu()
        this.afterCheckPremssin()

    }
    initMenu() {
        
        this.model = [

            {
                label: 'Definition',
                items: [
                    { label: 'Category', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/category'] },
                    { label: 'Region', icon: 'pi pi-fw pi-sun', routerLink: ['/dashboard/region'] },
                    { label: 'Author', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/author'] },
                    { label: 'Tags', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/tags'] }
                ]
            },
            {
                label: 'Article',
                items: [
                    { label: 'Article Definition', icon: 'pi pi-fw pi-book', routerLink: ['/definearticle/0/1'] },
                    { label: 'Article', icon: 'pi pi-fw pi-book', routerLink: ['/dashboard/articlelist'] },
                    { label: 'Approve Article', icon: 'pi pi-fw pi-send', routerLink: ['/dashboard/publishlist'] },
                ]
            },
            {
                label: 'Headline',
                items: [
                    { label: 'Ticket', icon: 'pi pi-fw pi-ticket', routerLink: ['/dashboard/lstheadline'] },
                    { label: 'Publish Ticket', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/publishheadline'] },
                ]
            },

            {
                label: 'Design',
                items: [
                    { label: 'Main Header', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/assignheader'] },
                    { label: 'News Headline', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/newsheadline'] },
                    { label: 'Category News', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/categorylist'] },
                    { label: 'Region News', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/regionlist'] }
                ]
            },
            {
                label: 'Pages',
                items: [
                    { label: 'News Home', icon: 'pi pi-fw pi-globe', routerLink: ['/home'] },

                ]
            },
            {
                label: 'Users',
                items: [
                    { label: 'Users', icon: 'pi pi-user', routerLink: ['/dashboard/users'] },
                    { label: 'Roles', icon: 'pi pi-user', routerLink: ['/dashboard/roles'] },
                ]
            },

        ];
     
        
    }
    afterCheckPremssin(){
        this.model = [{ label: 'Definition', items: [] }, { label: 'Article', items: [] }, { label: 'Headline', items: [] }, { label: 'Design', items: [] }, { label: 'Pages', items: [] }, { label: 'Users', items: [] }]
        // #Definition
        if (this.checkPremssion("Category")) {
            this.model[0].items.push({ label: 'Category', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/category'] })
        }
        if (this.checkPremssion("Region")) {
            this.model[0].items.push({ label: 'Region', icon: 'pi pi-fw pi-sun', routerLink: ['/dashboard/region'] })
        }
        if (this.checkPremssion("Author")) {
            this.model[0].items.push({ label: 'Author', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/author'] })
        }
        if (this.checkPremssion("tags")) {
            this.model[0].items.push({ label: 'Tags', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/tags'] })
        }

        // #Article
        if (this.checkPremssion("Article Definition")) {
            this.model[1].items.push({ label: 'Article Definition', icon: 'pi pi-fw pi-book', routerLink: ['/definearticle/0/1'] })
        }
        if (this.checkPremssion("Article")) {
            this.model[1].items.push({ label: 'Article', icon: 'pi pi-fw pi-book', routerLink: ['/dashboard/articlelist'] })
        }
        if (this.checkPremssion("Approve Article")) {
            this.model[1].items.push({ label: 'Approve Article', icon: 'pi pi-fw pi-send', routerLink: ['/dashboard/publishlist'] })
        }

        // #Headline
        if (this.checkPremssion("Ticket")) {
            this.model[2].items.push({ label: 'Ticket', icon: 'pi pi-fw pi-ticket', routerLink: ['/dashboard/lstheadline'] })
        }
        if (this.checkPremssion("Publish Ticket")) {
            this.model[2].items.push({ label: 'Publish Ticket', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/publishheadline'] })
        }

        // #Design
        if (this.checkPremssion("Main Header")) {
            this.model[3].items.push({ label: 'Main Header', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/assignheader'] })
        }

        if (this.checkPremssion("News Headline")) {
            this.model[3].items.push({ label: 'News Headline', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/newsheadline'] })
        }

        if (this.checkPremssion("Category News")) {
            this.model[3].items.push({ label: 'Category News', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/categorylist'] })
        }
        if (this.checkPremssion("Region News")) {
            this.model[3].items.push({ label: 'Region News', icon: 'pi pi-fw pi-bolt', routerLink: ['/dashboard/regionlist'] })
        }

        // #Pages
        if (this.checkPremssion("News Home")) {
            this.model[4].items.push({ label: 'News Home', icon: 'pi pi-fw pi-globe', routerLink: ['/home'] })
        }

        // #Users
        if (this.checkPremssion("Users")) {
            this.model[5].items.push({ label: 'Users', icon: 'pi pi-user', routerLink: ['/dashboard/users'] })
        }
        if (this.checkPremssion("Roles")) {
            this.model[5].items.push({ label: 'Roles', icon: 'pi pi-user', routerLink: ['/dashboard/roles'] })
        }

        this.model=  this.model.filter(item=>item?.items?.length)

    }
    checkPremssion(formName) {
        const value = this.forms.find(item => item?.form?.formName?.toLowerCase() == formName?.toLowerCase())
        if (value) {
            return true
        } else return false
    }
    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
