import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from './utilities.service';



@Injectable()
export class GlobalService {

    private accessToken: any = '';
    user = JSON.parse(sessionStorage.getItem('userAuth'))
    api = 'http://newapibloom.bloomsit.tamimysoft.com/api'
    constructor(public http: HttpClient, public utilities: UtilitiesService) {
    }

    private extractData(res: any) {

        let body = res.json();
        return body || {};
    }
    CreateHeaderWithLangAndCompany() {
        this.accessToken = this.user?.token
        const langid = this.utilities.getLanguage();
        let headers = new HttpHeaders({
            Lang: langid === 'en' ? '1' : '2',
            UserId: '1',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken
        });
        return headers;
    }
    private checkToken() {
        // this.accessToken = this.utilities.getData('accessToken', '');
    }
    errorHandler(error: { status: number; }) {
        if (error.status == 401) {

        }
    }

    uploadFiles(file: string | Blob): Observable<any> {

        let data: FormData = new FormData();


        data.append("files", file, (file as any).name);


        return this.http.post(environment.ApiUrl + 'UploadFiles', data).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    private getHeaders() {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.user.token}`,
            'Accept-Language': localStorage.getItem('currentLang'),
        });

        return headers
    }

    getGroups() {
        return this.http.get<any>(`${this.api}/SysGroup/GetGroups`, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    getPrev(groupId) {
        return this.http.get<any>(`${this.api}/SysPrivilege/GetPrivilege/${groupId}`, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    deletePrev(groupId,formId) {
        return this.http.post<any>(`${this.api}/SysPrivilege/Deleteprivilege/${groupId}/${formId}`,{}, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    createGroup(groupName, jobDesc) {
        return this.http.post<any>(`${this.api}/SysGroup/AddGroup`, { groupName: groupName, jobDesc: jobDesc }, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    editGroup(groupName,id) {
        return this.http.post<any>(`${this.api}/SysGroup/UpdateGroup/${id}`, { groupName: groupName }, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    createPrev(groupId, formId) {
        return this.http.post<any>(`${this.api}/SysPrivilege/CreatePrivilege`, {
            groupId,
            formId,
            "allowAdd": 0,
            "allowSave": 0,
            "allowView": 0,
            "allowDelete": 0,
            "allowPrint": 0
        }, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    createUser(user) {
        return this.http.post<any>(`${this.api}/SysUser/Register`, {
            userName: user.userName,
            userEmail: user.userEmail,
            jobDesc: user.jobDesc,
            userFullName: user.userFullName,
            active: 1,
            userDefaultLang: 'Ar',
            phoneNo: `${user.phoneNo}`,
            userPwd: user.userPwd,
            groupId: user.groupId,
            lastChangePassword: user.lastChangePassword,
        }, {
            // headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    updateUser(user) {
        return this.http.post<any>(`${this.api}/SysUser/UpdateUser/${user.userId}`, {
            userName: user.userName,
            userEmail: user.userEmail,
            userFullName: user.userFullName,
            active: 1,
            userDefaultLang: 'Ar',
            phoneNo: `${user.phoneNo}`,
            jobDesc: user.jobDesc,
            userPwd: user.userPwd,
            groupId: user.groupId,
            lastChangePassword: user.lastChangePassword,
        }, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    updatePassword(user) {
        return this.http.post<any>(`${this.api}/SysUser/UpdatePassword/${user.userId}`, {          
            userPwd: user.userPwd,
        }, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    userStatus(user) {
        return this.http.post<any>(`${this.api}/SysUser/UpdateUser/${user.userId}`, {
            userName: user.userName,
            userEmail: user.userEmail,
            userFullName: user.userFullName,
            active: user.active == 1 ? 0 : 1,
            userDefaultLang: 'Ar',
            phoneNo: `${user.phoneNo}`,
            jobDesc: user.jobDesc,
            userPwd: user.userPwd,
            groupId: user.groupId,
            lastChangePassword: user.lastChangePassword,
        }, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    getForms() {
        return this.http.get<any>(`${this.api}/SysForm/GetSysForm`, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }
    getUsers() {
        return this.http.get<any>(`${this.api}/SysUser/GetUsers`, {
            headers: this.CreateHeaderWithLangAndCompany()
        });
    }

    GetAllArticles(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Articles', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    GetUserArticles(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetUserArticles/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetUnpublishedArticles(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetUnpublishedArticles/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetPublishedArticles(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetPublishedArticles/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    getOneArticle(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Articles/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    getArticleDetails(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetArticleDetails/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    getFilters(id: any, type): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();
        if (type == 'category') {
            return this.http.get(environment.ApiUrl + 'GetArticlesByCategory/' + id, {
                headers: headers
            }).pipe(
                tap(
                    success => success,
                    error => this.errorHandler(error)
                ));
        } else {
            return this.http.get(environment.ApiUrl + 'TagArticle/' + id, {
                headers: headers
            }).pipe(
                tap(
                    success => success,
                    error => this.errorHandler(error)
                ));
        }

    }
    ArticleHighlight(id: any, data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'ArticleHighlight/' + id, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    ArticleRegionHighlight(id: any, regionid: any, data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'ArticleRegionHighlight/' + id + '/' + regionid, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    ArticleCategoryHighlight(id: any, categoryid: any, data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'ArticleCategoryHighlight/' + id + '/' + categoryid, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    GetHighlightedArticles(art: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'ArticleHighlight', art, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetArticlceToHighlight(art: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'GetArticlceToHighlight', art, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }



    GetArticlceToHighlightByRegionCategory(art: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'GetArticlceToHighlightByRegionCategory', art, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetHighlightArticleByRegionCategory(art: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'GetHighlightArticleByRegionCategory', art, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    updateArticle(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();
        return this.http.post(environment.ApiUrl + 'Articles/' + data.articleId, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    createArticle(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Articles', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }



    GetAllAuthor(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Author', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    getOneAuthor(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Author/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    updateAuthor(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Author/' + data.id, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    createAuthor(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Author', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    DeleteAuthor(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'DeleteAuthor', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetAllTag(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Tag', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    getOneTag(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Tag/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    updateTag(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Tag/' + data.id, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    createTag(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Tag', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    DeleteTag(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'DeleteTag', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }




    GetLanguages(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetLanguages', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetAllRegions(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetAllRegions', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    getOneRegions(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Region/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    updateRegions(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Region/' + data.id, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    createRegions(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Region', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'//,
                // 'Authorization': ('Bearer ' + this.accessToken)
            })
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    DeleteRegion(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'DeleteRegion', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'//,
                // 'Authorization': ('Bearer ' + this.accessToken)
            })
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetAllCategories(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();


        return this.http.get(environment.ApiUrl + 'GetAllCategories', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    getOneCategory(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'Category/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    updateCategory(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Category/' + data.id, data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    createCategory(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'Category', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    DeleteCategory(data: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.post(environment.ApiUrl + 'DeleteCategory', data, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetAllArticleType(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetAllArticleType', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }


    GetCrypto(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetCrypto', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetGold(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetGoldApi', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetSilver(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetSilverApi', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetPlatinum(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetPalitnumApi', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    GetPladinium(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetPalladiumApi', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }


    GetLocation(): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get('https://geolocation-db.com/json', {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetWeather(longitude: string, latitude: string): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetWeather/' + longitude + '/' + latitude, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetArticlesByRegion(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetArticlesByRegion/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetArticlesByCategory(id: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetArticlesByCategory/' + id, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
    GetMetal(metal: any): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetMetal/' + metal, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }

    GetAllCryptoAndMetal(code: string): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetAllCryptoAndMetal/' + code, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }


    GetAllStatMetal(code: string): Observable<any> {

        let headers = this.CreateHeaderWithLangAndCompany();

        return this.http.get(environment.ApiUrl + 'GetAllStatMetal/' + code, {
            headers: headers
        }).pipe(
            tap(
                success => success,
                error => this.errorHandler(error)
            ));
    }
}