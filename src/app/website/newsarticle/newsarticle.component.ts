import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article, ArticleDetails } from 'src/app/class/class';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsarticle',
  templateUrl: './newsarticle.component.html',
  styleUrls: ['./newsarticle.component.scss']
})
export class NewsarticleComponent implements OnInit {

  ObjArticle: ArticleDetails;
  meadiArray:any[]=[]

  images: any[];

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
  public storageUrl = environment.StorageUrl;
  constructor(private arouter: ActivatedRoute, private global: GlobalService) {

    this.ObjArticle = new ArticleDetails();

  }

  ngOnInit(): void {
    this.arouter.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.GetArticle(+id);
    });


  }


  GetArticle(id) {
    this.meadiArray = []
    this.global.getArticleDetails(id).subscribe(data => {
      if (data.articleVideos) {
        data.articleVideos.map(el => {
          el.videoPath = this.convertToEmbedUrl(el.videoPath)
        })
      }
      this.meadiArray=[...data.articlePictures,...data.articleVideos]
      console.log(this.meadiArray);

      // if (data.articleVideos) {
      //   data.articleVideos.map(el => {
      //     el.videoPath = this.convertToEmbedUrl(el.videoPath)
      //   })
      // }

      this.ObjArticle = data;

    })
  }

  socialShare(type: any) {

    var urls: any = {
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" +
        encodeURI(window.location.href),
      facebook:
        "https://www.facebook.com/dialog/share?app_id=868188764123239&display=popup&href=" +
        encodeURI(window.location.href),
      twitter:
        "https://twitter.com/intent/tweet?text=" +
        encodeURI(this.ObjArticle.articleHeading) +
        "%0A&url=" +
        encodeURI(window.location.href),
      whatsapp:
        "https://api.whatsapp.com/send?text=" +
        encodeURI(
          this.ObjArticle.articleHeading +
          "\n" +
          window.location.href
        ),
    };

    window.open(urls[type], "", "width=400,height=400");

  }

  print() {
    window.print();
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
