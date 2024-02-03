import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem, PrimeNGConfig } from 'primeng/api';
import { LocationDetails, MarketStat, WeatherResponse } from 'src/app/class/externalapi';
import { MapsAPILoader } from '@agm/core';
import { google } from '@google/maps';
import { GlobalService } from 'src/app/services/global.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Article, ArticleSearch, Tags } from 'src/app/class/class';
import { TranslatePipe } from 'src/app/translate';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-newsappcomponent',
  templateUrl: './newsappcomponent.component.html',
  styleUrls: ['./newsappcomponent.component.scss']
})
export class NewsappcomponentComponent implements OnInit {
  lstHeaderNews : ArticleSearch[];

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
  
  items: any[] = [];

  public storageUrl = environment.StorageUrl;

  menuMode = 'static';
  isScrolled = false;

  lstTags: Tags[] | any;
  lstStat: MarketStat[];
  ObjWeatherResponse: WeatherResponse;
  ObjLocationDetails: LocationDetails;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  city: string;
  private geoCoder;
  public language: any = {};

  constructor(private pipe: TranslatePipe, private global: GlobalService, private translate: TranslateService, private utilities: UtilitiesService, public router: Router, private mapsAPILoader: MapsAPILoader,
    private primengConfig: PrimeNGConfig, public ult: UtilitiesService) {

    this.ObjWeatherResponse = new WeatherResponse();
    this.ObjLocationDetails = new LocationDetails();
    this.lstStat = [];
    this.lstTags = [];
    this.city = '';
    this.language = this.utilities.language;

    this.GetAllCategories()

  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    this.isScrolled = scrollPosition >= 100;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    //  this.GetAllCryptoAndMetal();
    this.GetAlltags();
    this.language = this.utilities.language;

    this.GetHighlightedArticles();
  }

  updateDateTime() {
    const now = new Date().toLocaleDateString(`${this.language}-EG`);
    const nowTime = new Date()
    const date = now.toString()
    const day= nowTime.toLocaleDateString(`${this.language}-EG`, { weekday: 'long' })
    const time = nowTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return {date, time,day}
  }

  Redirect() {
    this.router.navigateByUrl('/login');
  }
  GetAllCategories() {
    const subscription = this.global.GetAllCategories().subscribe((results: any) => {

      console.log(results);
      if (results.length > 8) {
        this.items = results.slice(0, 8).map(el => ({
          label: this.language === 'en' ? el.categoryName : el.categoryName_ar, routerLink: [`/filter/category/${el.categoryId}`],
          categoryId: el.categoryId
        }));

        const moreItems = results.slice(8).map(el => ({
          label: this.language === 'en' ? el.categoryName : el.categoryName_ar, routerLink: [`/filter/category/${el.categoryId}`],
          categoryId: el.categoryId
        }));

        this.items.push({ label: this.utilities.transl('More'), items: moreItems });
      } else {
        this.items = results.map(el => ({
          label: this.language === 'en' ? el.categoryName : el.categoryName_ar,
          categoryId: el.categoryId
        }));
      }
      this.items.push({ label: this.utilities.transl('Tags'), items: this.lstTags },)




      subscription.unsubscribe()
    }, error => {
      console.log(error);
      subscription.unsubscribe()
    })
  }
  ChangeLanguage(lang: string) {

    this.utilities.setLanguage(lang);
    this.language = this.utilities.language;
    window.location.reload();
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.GetWeather();
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.city = results[0].address_components.find(x => x.types[0] === "locality").long_name.toString();
          // this.city = results[0].address_components[results[0].address_components.length - 2].long_name.toString();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  GetAllCryptoAndMetal() {

    this.global.GetAllCryptoAndMetal('M').subscribe(res => {
      this.lstStat = [];
      this.lstStat = res;

      ;
    });
  }
  GetAlltags() {

    this.global.GetAllTag().subscribe(res => {

      res.map(el => {
        this.lstTags.push({ label:this.language=='en'? el.tagValue:el.tagValue_ar, id: el.tagId, routerLink: [`/filter/tag/${el.tagId}`] })
      })
    });
  }
  GetWeather() {


    this.global.GetWeather(this.longitude.toString(), this.latitude.toString()).subscribe(res => {

      this.ObjWeatherResponse = res;


    });



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
        console.log("res", res)
    });
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
