import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, ArticleSearch } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsbycategory',
  templateUrl: './newsbycategory.component.html',
  styleUrls: ['./newsbycategory.component.scss']
})
export class NewsbycategoryComponent implements OnInit {

  lstCatArticles: ArticleSearch[];

  @Input() CatId: number = 0;
  num = 6;
  ReadMore: boolean = false

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


  constructor(private global: GlobalService, public router: Router, private ult: UtilitiesService) {
    this.CatId = 0;
    this.lstCatArticles = [];
  }

  ngOnInit(): void {



    this.GetArticlesByCategory();
  }
  GetArticlesByCategory() {
    let art = new Article();
    art.fkArticleTypeId = 1;
    art.fkCategoryId = this.CatId;
    this.global.GetHighlightArticleByRegionCategory(art).subscribe(res => {

      res.map(arc => {
        arc.articleVideos.map(el => {
          el.videoPath = this.convertToEmbedUrl(el.videoPath)
        })
      })

      this.lstCatArticles = res;
      console.log(res);

    });



  }


   toggleNumber() {
    this.num = this.ReadMore ? 3 : 99;    
    this.ReadMore = !this.ReadMore;
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

}
