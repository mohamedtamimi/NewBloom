

export class ArticleDetails {
    articleId: number;
    fkArticleTypeId: number;
    fkCategoryId: number;
    fkRegionId: number;
    highlight: number | null;
    readTime: string;
    categoryName: string;
    regionName: string;
    articleVideos:any
    articleHeading: string;
    articleText: string;
    publishDate: string | null;
    articleAuthors: ArticleAuthor[];
    articlePictures: ArticlePictures[];
    articleTags: Tags[];
    articleHashTags: Hashtags[];
}

export class ArticleSearch {
     articleId: number;
     fkArticleTypeId: number;
     fkCategoryId: number;
     fkRegionId: number;
     readTime: string;
     categoryName: string;
     regionName: string;
     articleHeading: string;
     publishDate: string;
     mainImage: string;
     highlight : number;
     articleText: string;
 }


export class Article
{
     articleId :number;
     fkArticleTypeId :number;
     fkCategoryId :number;
     fkRegionId :number;
     readTime :string;
     publishDate :Date;
     publishTime :Date;
     isDeleted :boolean;
     highlight :number;
     highlightRegion :number;
     highlightCategory :number;
     fkStatusId :number;
     articleSource :string;
     articleVideos:ArticleVideos[] |any
     lastUpdatedBy :string;
     lastUpdateDate :Date;
     createdBy :string;
     createdDate :Date;
     categoryName :string;
     regionName : string;
     articleHeading:string;
     articleHeadingTrans : ArticleHeading_Trans[];
     articlePictures : ArticlePictures[];
     articleTexts : ArticleText[];
     articleTags : ArticleTags[];
     articleAuthors : ArticleAuthor[];
     articleHashTags : Hashtags[];

  constructor()
{ 
     this.articleHashTags = [];
     this.articleAuthors = [];
     this.articleTags = [];
     this.articleHeadingTrans = [];
     this.articlePictures = [];
     this.articleTexts = [];
     this.articleSource = "";
     this.categoryName = "";
     this.regionName = "";
     this.articleHeading = "";
     this.articleId = 0;
     this.fkArticleTypeId = 0;
     this.fkCategoryId = 0;
     this.fkRegionId = 0;
     this.readTime = "";
     this.publishDate = new Date();
     this.publishTime = new Date();
     this.isDeleted = false;
     this.highlight = 0;
     this.fkStatusId = 0;
     this.lastUpdatedBy = "";
     this.lastUpdateDate = new Date();
     this.createdBy = "";
     this.createdDate = new Date();
}
}
export class Hashtags
{
     fkArticleId :number;
     hashtagValue :string;
  constructor()
{
     this.fkArticleId = 0;
     this.hashtagValue = '';
}
}
export class ArticleAuthor
{
     fkArticleId :number;
     fkAurthorId :number;
  constructor()
{
     this.fkArticleId = 0;
     this.fkAurthorId = 0;
}
}
export class ArticleVideos
{
     videoDesc? :string;
     videoPath :string;
  constructor()
{
     this.videoDesc ='';
     this.videoPath = '';
}
}

export class ArticleHeading_Trans
{
     fkLangId :number;
     fkArticleId :number;
     translation :string;
  constructor()
{
     this.fkLangId = 0;
     this.fkArticleId = 0;
     this.translation = "";
}
}

export class ArticlePictures
{
     pictureId :number;
     pictureDesc :string;
     picturePath :string;
     sequence :number;
     createdDate :Date;
     isDeleted :boolean;
     lastUpdatedBy :string;
     lastUpdateDate :Date;
     createdBy :string;
     fkArticleId :number;
     uploadfile : string;
  constructor()
{
     this.uploadfile = '';
     this.pictureId = 0;
     this.pictureDesc = "";
     this.picturePath = "";
     this.sequence = 0;
     this.createdDate = new Date();
     this.isDeleted = false;
     this.lastUpdatedBy = "";
     this.lastUpdateDate = new Date();
     this.createdBy = "";
     this.fkArticleId = 0;
}
}

export class ArticleTags
{
     fkTagId :number;
     fkArticleId :number;
  constructor()
{
     this.fkTagId = 0;
     this.fkArticleId = 0;
}
}

export class ArticleText
{
     fkArticleId :number;
     text :string;
     createdDate :Date;
     lastUpdatedBy :string;
     lastUpdateDate :Date;
     createdBy :string;
     fkLangId :number;
  constructor()
{
     this.fkArticleId = 0;
     this.text = "";
     this.createdDate = new Date();
     this.lastUpdatedBy = "";
     this.lastUpdateDate = new Date();
     this.createdBy = "";
     this.fkLangId = 0;
}
}

export class ArticleType
{
     articleTypeId :number;
     articleTypeName :string;
  constructor()
{
     this.articleTypeId = 0;
     this.articleTypeName = "";
}
}

export class ArticleVideo
{
     videoId :number;
     videoDesc :string;
     videoPath :string;
     sequence :number;
     createdDate :Date;
     isDeleted :boolean;
     lastUpdatedBy :string;
     lastUpdateDate :Date;
     createdBy :string;
     fkArticleId :number;
  constructor()
{
     this.videoId = 0;
     this.videoDesc = "";
     this.videoPath = "";
     this.sequence = 0;
     this.createdDate = new Date();
     this.isDeleted = false;
     this.lastUpdatedBy = "";
     this.lastUpdateDate = new Date();
     this.createdBy = "";
     this.fkArticleId = 0;
}
}

export class Authors
{
     aurthorId :number;
     authorName :string;
     authorName_ar :string;
     introduction :string;
  constructor()
{
     this.aurthorId = 0;
     this.authorName = "";
     this.authorName_ar = "";
     this.introduction = "";
}
}

export class Category
{
     categoryId :number;
     categoryName :string;
     categoryName_ar :string;
     fkParentCategoryId :number;
     parentcategoryName :string;
  constructor()
{
     this.categoryId = 0;
     this.categoryName = "";
     this.categoryName_ar = "";
     this.parentcategoryName = "";
     this.fkParentCategoryId = 0;
}
}

export class Category_Trans
{
     fkLangId :number;
     fkCategoryId :number;
     translation :string;
  constructor()
{
     this.fkLangId = 0;
     this.fkCategoryId = 0;
     this.translation = "";
}
}

export class Language
{
     langId :number;
     languageName :string;
     value : string;
  constructor()
{
     this.langId = 0;
     this.languageName = "";
     this.value = "";
}
}

export class Region
{
     regionId :number;
     regionName :string;
     regionName_ar :string;
  constructor()
{
     this.regionId = 0;
     this.regionName = "";
     this.regionName_ar = "";
}
}

export class Region_Trans
{
     fkLangId :number;
     fkRegionId :number;
     translation :string;
  constructor()
{
     this.fkLangId = 0;
     this.fkRegionId = 0;
     this.translation = "";
}
}

export class Sys_Forms
{
     formID :number;
     formName :string;
     moduleID :number;
     formPath :string;
     formOrder :number;
     parentID :number;
     visible :number;
     hasMobile :boolean;
     showToEmp :boolean;
     showToClient :boolean;
     isLookup :boolean;
     icon :string;
  constructor()
{
     this.formID = 0;
     this.formName = "";
     this.moduleID = 0;
     this.formPath = "";
     this.formOrder = 0;
     this.parentID = 0;
     this.visible = 0;
     this.hasMobile = false;
     this.showToEmp = false;
     this.showToClient = false;
     this.isLookup = false;
     this.icon = "";
}
}

export class Sys_Forms_languages
{
     fkLangId :number;
     fkFormID :number;
     formName_lang :string;
  constructor()
{
     this.fkLangId = 0;
     this.fkFormID = 0;
     this.formName_lang = "";
}
}

export class Sys_Groups
{
     groupID :number;
     fkCompanyId :number;
     groupName :string;
     defaultPage :number;
  constructor()
{
     this.groupID = 0;
     this.fkCompanyId = 0;
     this.groupName = "";
     this.defaultPage = 0;
}
}

export class Sys_Module_Language
{
     fklangId :number;
     moduleId :number;
     moduleName_lang :string;
  constructor()
{
     this.fklangId = 0;
     this.moduleId = 0;
     this.moduleName_lang = "";
}
}

export class Sys_Modules
{
     moduleID :number;
     fkParentModule :number;
     moduleName :string;
     seq :number;
     icon :string;
  constructor()
{
     this.moduleID = 0;
     this.fkParentModule = 0;
     this.moduleName = "";
     this.seq = 0;
     this.icon = "";
}
}

export class Sys_Privileges
{
     groupID :number;
     formID :number;
     allowAdd :number;
     allowSave :number;
     allowView :number;
     allowDelete :number;
     allowPrint :number;
  constructor()
{
     this.groupID = 0;
     this.formID = 0;
     this.allowAdd = 0;
     this.allowSave = 0;
     this.allowView = 0;
     this.allowDelete = 0;
     this.allowPrint = 0;
}
}

export class Sys_Users
{
     userId :number;
     userName :string;
     user_fullName :string;
     userPwd :string;
     uniqueNumber :string;
     userStatus :number;
     userType :number;
     lastChange_password :Date;
     userEmail :string;
     phoneNo :string;
     jobDesc :string;
     remarks :string;
     active :number;
     isFirstLogin :number;
     lastLoginDate :Date;
     fkCompanyId :number;
     fkOrgUnitId :number;
     fkEmployeeId :string;
     userDefaultLang :string;
     isDefaultUser :boolean;
     cREATED_bY :string;
     cREATED_dATE :Date;
     lAST_uPDATE_bY :string;
     lAST_uPDATE_dATE :Date;
  constructor()
{
     this.userId = 0;
     this.userName = "";
     this.user_fullName = "";
     this.userPwd = "";
     this.uniqueNumber = "";
     this.userStatus = 0;
     this.userType = 0;
     this.lastChange_password = new Date();
     this.userEmail = "";
     this.phoneNo = "";
     this.jobDesc = "";
     this.remarks = "";
     this.active = 0;
     this.isFirstLogin = 0;
     this.lastLoginDate = new Date();
     this.fkCompanyId = 0;
     this.fkOrgUnitId = 0;
     this.fkEmployeeId = "";
     this.userDefaultLang = "";
     this.isDefaultUser = false;
     this.cREATED_bY = "";
     this.cREATED_dATE = new Date();
     this.lAST_uPDATE_bY = "";
     this.lAST_uPDATE_dATE = new Date();
}
}

export class Sys_Users_Groups
{
     fkUserId :number;
     fkGroupId :number;
  constructor()
{
     this.fkUserId = 0;
     this.fkGroupId = 0;
}
}

export class Tags
{
     tagId :number;
     tagValue :string;
     tagValue_ar :string;
  constructor()
{
     this.tagId = 0;
     this.tagValue = "";
     this.tagValue_ar = "";
}
}


export class FileAttachment {
     Object: File | Blob;
     FileStream: string;
     Name: string;
     Type: string;
     Size: string;
     constructor() {
   
       this.Name = '';
       this.FileStream = '';
     }
   }