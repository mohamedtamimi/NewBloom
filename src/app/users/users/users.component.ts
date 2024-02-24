import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { InputComponent } from 'src/app/shared/input/input.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  users: any = []
  roles: any = []
  UserDialog: boolean = false
  loading: boolean = false
  editMode: boolean = false

  user: any = { userName: null, userEmail: null, userFullName: null, active: true, phoneNo: null, userPwd: null, rePassword: null, groupId: null, lastChangePassword: new Date(), jobDesc: null }
  constructor(private globalService: GlobalService, public messageService: MessageService,private router:Router) { }

  ngOnInit(): void {
    const isAllowed= this.formsUser?.find(form=>form?.form?.formPath == this.router.url)
    isAllowed? true :this.router.navigateByUrl('/dashboard')
    this.getUSers()
    this.getGroups()
  }


  getGroups() {
    const subscription = this.globalService.getGroups().subscribe((results: any) => {
      this.roles = results.$values
      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }
  getUSers() {
    const subscription = this.globalService.getUsers().subscribe((results: any) => {
      
      results.$values.sort((a, b) => {        
        return b.$id - a.$id;
      })
      this.users = results.$values
      console.log( this.users);
      
      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }
  createUser() {
    if (this.user.userPwd != this.user.rePassword) {
      this.messageService?.add({ severity: 'error', detail: 'تأكد من تكرار كلمة المرور بشكل صحيح' });
      return
    }
    this.loading = true
    const subscription = this.globalService.createUser(this.user).subscribe((results: any) => {
      this.loading = false
      this.UserDialog = false
      this.getUSers()
      subscription.unsubscribe()
    }, error => {
      this.loading = false

      console.log(error);
      subscription.unsubscribe()
    })
  }
  updateUser() {
    if (!this.user.userPwd && !this.user.rePassword) {
     delete this.user.userPwd
    }
    if ((this.user.userPwd != this.user.rePassword)&&this.editMode==false) {
      this.messageService?.add({ severity: 'error', detail: 'تأكد من تكرار كلمة المرور بشكل صحيح' });
      return
    }
    this.loading = true
    const subscription = this.globalService.updateUser(this.user).subscribe((results: any) => {
      this.loading = false
      this.UserDialog = false
      this.getUSers()
      subscription.unsubscribe()
    }, error => {
      this.loading = false

      console.log(error);
      subscription.unsubscribe()
    })
  }
  edit(user) {
    this.editMode = true
    this.user = user
    this.UserDialog = true
    this.user.userPwd = ''
    this.user.rePassword = ''
  }
  initUser() {
    this.UserDialog = true
    this.editMode = false
    this.user = { userName: null, userEmail: null, userFullName: null, active: true, phoneNo: null, userPwd: null, rePassword: null, groupId: null, lastChangePassword: new Date(), jobDesc: null }
  }

  userStatus(){
    const subscription = this.globalService.userStatus(this.user).subscribe((results: any) => {
      this.loading = false
      this.UserDialog = false
      this.getUSers()
      subscription.unsubscribe()
    }, error => {
      this.loading = false

      console.log(error);
      subscription.unsubscribe()
    })
  }
}
