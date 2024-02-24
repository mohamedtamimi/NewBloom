import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  roles = []
  forms: any = [
    // {name:'Category',route:'/dashboard/category',isAllowed:false},
    // {name:'Region',route:'/dashboard/region',isAllowed:false},
    // {name:'Author',route:'/dashboard/author',isAllowed:true},
    // {name:'Tags',route:'/dashboard/tags',isAllowed:false},
    // {name:'Article Definition',route:'/definearticle/0/1',isAllowed:false},
    // {name:'Article',route:'/dashboard/articlelist',isAllowed:false},
    // {name:'Approve Article',route:'/dashboard/publishlist',isAllowed:false},
    // {name:'Ticket',route:'/dashboard/lstheadline',isAllowed:false},
    // {name:'Publish Ticket',route:'/dashboard/publishheadline',isAllowed:false},
    // {name:'Main Header',route:'/dashboard/assignheader',isAllowed:false},
    // {name:'News Headline',route:'/dashboard/newsheadline',isAllowed:false},
    // {name:'Category News',route:'/dashboard/categorylist',isAllowed:false},
    // {name:'Region News',route:'/dashboard/regionlist',isAllowed:false},
    // {name:'News Home',route:'/dashboard/home',isAllowed:false},
    // {name:'Users',route:'/dashboard/users',isAllowed:false},
    // {name:'Roles',route:'/dashboard/roles',isAllowed:false},
    // {name:'Users Roles',route:'/dashboard/usersroles',isAllowed:false},

  ]
  selectedRole: any = null
  rolesSideBar: boolean = false
  roleDialog: boolean = false
  lang = 'ar'
  groupName = null
  selectedGroup = null
  groupID
  jobDesc = null
  loading: boolean = false
  createRoleSide: boolean = false
  showPages: boolean = false
  formsMode: boolean = false
  constructor(private globalService: GlobalService, public messageService: MessageService,private router:Router) { }

  ngOnInit(): void {
    const isAllowed= this.formsUser.find(form=>form?.form?.formPath == this.router.url)
    isAllowed? true :this.router.navigateByUrl('/dashboard')
    
    
    this.getGroups()
   

  }


  getGroups() {
    const subscription = this.globalService.getGroups().subscribe((results: any) => {
      results.$values.sort((a, b) => {        
        return b.$id - a.$id;
      })
      this.roles = results.$values.filter(item => !("$ref" in item))
      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }
  createGroup() {
    this.loading = true
    const subscription = this.globalService.createGroup(this.groupName, this.jobDesc).subscribe((results: any) => {
      this.loading = false
      this.getForms()

      this.selectedGroup = results
      this.groupID=results.groupId
      this.formsMode = true
      this.messageService.add({ severity: 'success', detail: 'تم أضافة الدور قم الان بإضافة الصفحات لهذا الدور', life: 6000 })
      subscription.unsubscribe()
    }, error => {
      this.loading = false
      console.log(error);
      subscription.unsubscribe()
    })
  }
  editGroup() {
    console.log(this.groupID);
        this.loading = true
    const subscription = this.globalService.editGroup(this.groupName,this.groupID).subscribe((results: any) => {
    
      this.messageService.add({ severity: 'success', detail: 'تم تعديل هذا الدور', life: 3000 })
      this.rolesSideBar=false
      this.getGroups()
      subscription.unsubscribe()
    }, error => {
      this.loading = false
      console.log(error);
      subscription.unsubscribe()
    })
  }
  getPrev(group?,status?:boolean) {
    this.groupID=group?.groupId
    this.showPages=false
    const subscription = this.globalService.getPrev(status?group.groupId:group).subscribe((results: any) => {
      this.getForms()
      this.selectedRole=results.$values
      this.groupName=group.groupName
      this.rolesSideBar=true;
      subscription.unsubscribe()
    }, error => {
      subscription.unsubscribe()
    })
  }
  createPrev(form) {
    const subscription = this.globalService.createPrev(this.groupID, form.formId).subscribe((results: any) => {
      if (this.rolesSideBar) {
        this.getPrev(this.groupID,false)
      }
      this.groupID=results.groupId
      this.messageService?.add({ severity: 'success', detail: 'تم إضافة الدور', });
      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }
  getForms() {
    
    const subscription = this.globalService.getForms().subscribe((results: any) => {
      this.forms =[]
      this.forms = results.$values
      if (this.selectedRole) {
        this.forms = this.forms.filter(obj2 => !this.selectedRole.some(obj1 => obj1.form.formName === obj2.formName));

      }
console.log(this.forms);

      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }
  openSIdebar(data) {
    this.selectedRole = data?.group?.sysPrivileges?.$values?.filter(item => !("$ref" in item))
    this.rolesSideBar = true
  }
  initRole(){
   this.createRoleSide =true;
   this.formsMode=false;
   this.selectedRole=null
   this.groupName=null
   this.groupID=null

    
  }
}
