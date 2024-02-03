import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { Article, ArticleSearch } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import { MetalComponent } from '../metal/metal.component';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  projectcount:number = 0;

  accuratecount:number = 0;
  clientcount:number = 0;
  customerfeedback:number = 0;
  snapchatcount:number = 0;

  // @ViewChild('gold', {static: false}) gold: MetalComponent;
  // @ViewChild('silver', {static: false}) silver: MetalComponent;
  // @ViewChild('plat', {static: false}) plat: MetalComponent;
  // @ViewChild('plad', {static: false}) plad: MetalComponent;
  
lstbreaking: ArticleSearch[];

lstHeaderNews : ArticleSearch[];


public storageUrl = environment.StorageUrl;


carouselResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

galleriaResponsiveOptions: any[] = [
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '960px',
    numVisible: 4
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 1
  }
];


  constructor(private global : GlobalService, public router: Router,public ult: UtilitiesService) {

    this.lstHeaderNews = [];

    this.lstbreaking = [];
   }

  ngOnInit(): void {

this.GetHighlightedArticles();

}


  GetHighlightedArticles(){
    let art = new Article();
    art.fkArticleTypeId = 1;

    this.global.GetHighlightedArticles(art).subscribe(res =>{

      res.map(arc=>{
        arc.articleVideos?.map(el=>{
          el.videoPath= this.convertToEmbedUrl( el.videoPath)
        })
      })
      this.lstHeaderNews = res;
        console.log("result", res)
    });
    }
  LoadMetal(){
    // this.gold.metaltype = 'XAU';
    // this.gold.LoadData();
    // this.silver.metaltype = 'XAG';
    // this.silver.LoadData();
    // this.plad.metaltype = 'XPD';
    // this.plad.LoadData();
    // this.plat.metaltype = 'XPT';
    // this.plat.LoadData();
  }
  convertToEmbedUrl(youtubeUrl) {
    if (youtubeUrl.includes("youtube")) {
      const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\S*)?$/;

      const embedUrl = youtubeUrl.replace(regex, "https://www.youtube.com/embed/$4");
      return embedUrl;
    } else {
      return youtubeUrl;
    }
  }

  projectcountstop:any = setInterval(()=>{
    this.projectcount++;
    //we need to stop this at  particular point; will use if condition
    if(this.projectcount == 997)
    {
      //clearinterval will stop tha function
      clearInterval(this.projectcountstop);
    }

  },8) //10 is milisecond you can control it


  accuratecountstop:any = setInterval(()=>{
    this.accuratecount++;
    if(this.accuratecount == 100)
    {
      
      clearInterval(this.accuratecountstop);
    }
  },10) 

  clientcountstop:any = setInterval(()=>{
    this.clientcount++;
    if(this.clientcount == 200)
    {
      
      clearInterval(this.clientcountstop);
    }
  },10)

  customerfeedbackstop:any = setInterval(()=>{
    this.customerfeedback++;
    if(this.customerfeedback == 240)
    {
      
      clearInterval(this.customerfeedbackstop);
    }
  },10)

  snapchatcounttop:any = setInterval(()=>{
    this.snapchatcount++;
    if(this.snapchatcount == 280)
    {
      clearInterval(this.snapchatcounttop);
    }
  },10)

  

}
