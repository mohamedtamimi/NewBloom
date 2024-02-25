import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { Article, ArticleAuthor, ArticleHeading_Trans, ArticlePictures, ArticleTags, ArticleText, Authors, Category, FileAttachment, Hashtags, Language, Region, Tags } from 'src/app/class/class';
import { GlobalService} from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-articledetails',
  templateUrl: './articledetails.component.html',
  styleUrls: ['./articledetails.component.scss']
})
export class ArticledetailsComponent implements OnInit {
  @ViewChild('uploader', {static: false}) uploader: FileUpload;
  @ViewChild('filter') filter: ElementRef;
  public storageUrl = environment.StorageUrl;
  formsUser = JSON.parse(sessionStorage.getItem('userAuth'))?.user?.group?.sysPrivileges?.$values

  type: number;
  ArticalId : number;
  lstRegion : Region[];
  lstCategory : any[];
  ObjArticle : Article;
  lstheading :  Language[];
  lsttext :  Language[];
  ObjFile: FileAttachment;
  lstpictures : ArticlePictures[];
  lstAuthors : Authors[];
  lstTags : any[];
  lstSelectedAuthors : number[];
  lstSelectedTags : number[];
  objpic : ArticlePictures;
  btnload: boolean;
  loading: boolean=false
  lsthash : string[];
  constructor( private arouter: ActivatedRoute,private global : GlobalService, private messageService: MessageService,private router : Router,private utl:UtilitiesService) {
    this.type = 1;
    this.btnload = false;
    this.ArticalId = 0;
    this.lstSelectedTags = [];
    this.lstSelectedAuthors = [];
    this.lstCategory = [];
    this.lstAuthors = [];
     this.lstTags = [];
    this.lstRegion = [];
    this.ObjArticle =  new Article();
    this.lstheading = [];
    this.lsttext = [];
    this.lstpictures = [];
    this.lsthash = [];
    this.ObjArticle.articleVideos=[]
    this.objpic = new ArticlePictures();
   }
   showMessageService(msgsummary: string, msgdetail: string, smsgeverity: string = 'warn') {
    this.messageService.add({severity: smsgeverity, summary: msgsummary, detail: msgdetail});
    }

  ngOnInit(): void {
    const isAllowed= this.formsUser.find(form=>form?.form?.formPath == this.router.url)
    isAllowed? true :this.router.navigateByUrl('/dashboard')
    this.LoadDefinitions();
    
    this.arouter.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      let id2 = params.get('id2');
      this.ArticalId = +id;
      this.type = +id2;
      if(this.ArticalId > 0){
        this.GetArticalDetails();
      }
     
      });
      if(!this.ObjArticle?.articleVideos?.length) this.ObjArticle.articleVideos= [{ videoPath: '' },]

  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}

GetArticalDetails(){
  this.loading=true

  this.global.getOneArticle(this.ArticalId).subscribe(data =>{
  

    this.ObjArticle = data;
    console.log(this.ObjArticle);
    
    this.ObjArticle.articleHeadingTrans.forEach(element => {
      this.lstheading.find(x => x.langId === element.fkLangId).value = element.translation;
    });

    this.ObjArticle.articleTexts.forEach(element => {
      this.lsttext.find(x => x.langId === element.fkLangId).value = element.text;
    });
    this.ObjArticle.articleAuthors.forEach(element => {
      this.lstSelectedAuthors.push(element.fkAurthorId);
    });
    this.ObjArticle.articleTags.forEach(element => {
      this.lstSelectedTags.push(element.fkTagId);
    });
    this.ObjArticle.articleHashTags.forEach(element => {
      this.lsthash.push(element.hashtagValue);
    });
    this.ObjArticle.articleTexts.forEach(element => {
      this.lsttext.find(x => x.langId === element.fkLangId).value = element.text;
    });
    if (!this.ObjArticle.articleVideos) this.ObjArticle.articleVideos= [{ videoPath: '' }]
      
    
    this.lstpictures = this.ObjArticle.articlePictures;
    this.loading=false

  });

}

convertToEmbedUrl(youtubeUrl) {
  if (youtubeUrl?.includes("youtube")) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\S*)?$/;

    const embedUrl = youtubeUrl.replace(regex, "https://www.youtube.com/embed/$4");
    return embedUrl;
  } else {
    return youtubeUrl;
  }
}

LoadDefinitions(){
  this.global.GetAllCategories().subscribe(data =>{
    data.map(el => {
      this.lstCategory.push({ label:this.utl.language === 'en' ? el.categoryName : el.categoryName_ar, categoryId: el.categoryId, routerLink: [`/filter/tag/${el.tagId}`] })
    })
  });

  this.global.GetAllRegions().subscribe(data => {
    this.lstRegion = data;
  });

  
  this.global.GetAllTag().subscribe(data => {
    data.map(el => {
      this.lstTags.push({ label:this.utl.language=='en'? el.tagValue:el.tagValue_ar, id: el.tagId, routerLink: [`/filter/tag/${el.tagId}`] })
    })
  });
  
  this.global.GetAllAuthor().subscribe(data => {
    this.lstAuthors = data;
  });
  this.global.GetLanguages().subscribe(data => {
    this.lsttext = JSON.parse(JSON.stringify(data));
    this.lstheading = JSON.parse(JSON.stringify(data));

  
  });
}



  async myUploader(event) {
    this.ObjFile = new  FileAttachment();
    //event.files == files to upload
     

    let file = event.files[0];
    this.global.uploadFiles(file).subscribe(response => {
      this.objpic.picturePath = response.file;
    });
  //   this.ObjFile.Name = file.name;
  //   this.ObjFile.Size = file.size;
  //   this.ObjFile.Type = file.type;
  //  this.ObjFile.FileStream = await this.readFileBase64String(file); // fileReader.result.toString();
  
  }
  readFileBase64String(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (!file) {
            resolve('');
        }
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
           // const text = reader.result.toString();
            resolve( reader.result.toString());
  
        };
  
      
    });
  }

  AddAtachment() {
    if(this.objpic.picturePath === ''){
      this.showMessageService('Headline','Please upload picture','error');
return;
    }
    //this.ObjFile = this.adapter.GetFile();
   // this.objpic.picturePath = this.ObjFile.Name;
    //this.objpic.uploadfile = this.ObjFile.FileStream;
    this.objpic.sequence =  this.lstpictures.length;
    this.objpic.fkArticleId = 0;
    this.lstpictures.push(this.objpic);
    this.objpic = new ArticlePictures();   
    this.uploader.clear();
   
  }

DeletePic(objpic : ArticlePictures){
  const index = this.lstpictures.indexOf(objpic, 0);
if (index > -1) {
  this.lstpictures.splice(index, 1);
}
}

  Submit(){
    console.log(this.ObjArticle);
    
    let valid = true;
      if(this.ObjArticle.fkCategoryId === 0){
        this.showMessageService('Article','Please Select Category','error');
   valid = false;
      }
      if(this.lstpictures.length === 0){
        this.showMessageService('Article','Please Upload at least one Picture','error');
   valid = false;
      }
  
      if(this.ObjArticle.fkRegionId === 0){
        this.showMessageService('Article','Please Select Region','error');
        valid = false;
      }
      if(this.ObjArticle.fkRegionId === 0){
        this.showMessageService('Article','Please Select Region','error');
        valid = false;
      }
      this.lstheading.forEach(element => {
        if(element.value === null || element.value === undefined || element.value === '' ){
          this.showMessageService('Article','Please Add Article Heading : ' + element.languageName,'error');
          valid = false;
        }
      });
  
      this.lsttext.forEach(element => {
        if(element.value === null || element.value === undefined ||element.value === ''){
          this.showMessageService('Article','Please Add Article text : ' + element.languageName,'error');
          valid = false;
        }
      });
      if(this.type === 3 && this.ObjArticle.fkStatusId === 0){
        this.showMessageService('Article','Please Approve or reject','error');
        valid = false;
      }
      if(valid){
        this.Create();
      }else{
        return;
      }
        
   
    }



  Create(){
    this.btnload = true;

    this.ObjArticle.fkArticleTypeId = 1;
    this.ObjArticle.isDeleted = false;
    this.ObjArticle.highlight = 0;
   
    if(this.type === 1 || this.type === 2){
      this.ObjArticle.fkStatusId = 0;
    }
    this.ObjArticle.createdBy = '1';
    this.ObjArticle.lastUpdatedBy = '1';

    this.ObjArticle.articleHeadingTrans = [];
    this.lstheading.forEach(element => {
      let head = new ArticleHeading_Trans();
      head.fkLangId = element.langId;
      head.translation = element.value;
      this.ObjArticle.articleHeadingTrans.push(head);
    });
    this.ObjArticle.articleTexts = [];
    this.lsttext.forEach(element => {
      let text = new ArticleText();
      text.fkLangId = element.langId;
      text.text = element.value;
      text.createdBy= '1';
      text.lastUpdatedBy= '1';
      this.ObjArticle.articleTexts.push(text);
    });

    this.ObjArticle.articleTags = [];
    this.lstSelectedTags.forEach(element => {
      let tg = new ArticleTags();
      tg.fkTagId = element;   
      this.ObjArticle.articleTags.push(tg);
    });


    this.ObjArticle.articleAuthors = [];
    this.lstSelectedAuthors.forEach(element => {
      let auth = new ArticleAuthor();
      auth.fkAurthorId = element;   
      this.ObjArticle.articleAuthors.push(auth);
    });
    this.ObjArticle.articleHashTags = [];
    this.lsthash.forEach(element => {
      let hash = new Hashtags();
      hash.hashtagValue = element;   
      this.ObjArticle.articleHashTags.push(hash);
    });

    this.ObjArticle.articlePictures = [];
    this.ObjArticle.articlePictures = this.lstpictures;

    if(this.type === 1){
      this.global.createArticle(this.ObjArticle).subscribe(data => {
        this.btnload = false;

        if(data > 0){
          this.showMessageService('Article','Article is Saved','success');
        }else{
          this.showMessageService('Article','Article is not Saved','error');
        }
        this.router.navigate(['/dashboard/articlelist']);
      });
    }else   if(this.type === 2 || this.type === 3){
   

    this.global.updateArticle(this.ObjArticle).subscribe(data => {
      this.btnload = false;

      if(data > 0){
        this.showMessageService('Article','Article is Saved','success');
      }else{
        this.showMessageService('Article','Article is not Saved','error');
      }
      this.router.navigate(['/dashboard/articlelist']);
    });
  }
  }

  pushNewVideo(){
    this.ObjArticle.articleVideos.push({videoPath: ''})
  }
  deletVideo(i){
    this.ObjArticle.articleVideos.splice(i, 1)
  
  }
}
