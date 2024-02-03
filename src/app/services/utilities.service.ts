/* eslint-disable @typescript-eslint/naming-convention */
import { DOCUMENT, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,Inject, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

declare let google: any;
declare let $: any;

@Injectable()
export class UtilitiesService {

    public disabledButtons: any = {};
    public sharedData: any = {};
    private eventsHandlers: any = {};
    private isRemember = false;
    private geocoder: any = null;
    private audios: any = {};
    private user: any = {};
    private languages: any = [];
    public language: any = {};
    public languageIndex: any = -1;


    constructor(public santitzer: DomSanitizer,
        public zone: NgZone,
        private location: Location,
        @Inject(DOCUMENT) private document: Document,
        private http: HttpClient,
        public translateService: TranslateService) {
        this.sharedData.cart = this.getData('cart', { products: [] });
        this.user = this.getData('user', {});
        this.sharedData.user = this.getData('user', {});
        this.setLanguage();
    }


    getTranslation(str : string)
    {
        
        return  this.translateService.get(str,{}).subscribe((res: string) => {
      
    });
    }

    setLanguage(lang: any = null) {
        let dir = 'ltr';

        if (!lang) {
            lang = this.getData('lang', 'en');
        }

        if (lang == 'ar') {
            this.setData('lang', 'ar');
            this.language = 'ar';
            dir = 'rtl';

        } else {
            this.setData('lang', lang);
            lang = 'en';
            this.language = lang;
            
        }

        document.dir = dir;

        document.getElementsByTagName('html')[0].setAttribute('lang', lang);
        const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
        htmlTag.dir = lang !== "en" ? "rtl" : "ltr";

        this.translateService.setDefaultLang(lang);
        this.translateService.use(lang);
        this.publishEvent('update:lang', lang);
        console.log(lang);
        
    }
    transl(key: any): any {
        return this.translateService?.instant(key)
      }

    translate(key: any, args: any = {}) {
        const regexp = new RegExp(/\{\{trans\([a-zA-Z0-9\_\-\ ]*\)\}\}/, 'gm');
        let match;
        let string = this.translateService.instant(key, args);

        while ((match = regexp.exec(string)) !== null) {
            let key = match[0].replace("{{trans(", "").replace(")}}", "");
            let newString = this.translate(key, args);
            string = string.replace(match[0], newString);
        }

        return string;
    }

    getLanguage() {
        return this.language;
    }

    disableButton(key: any, value = true) {
        this.disabledButtons[key] = value;
    }


    dataLang(data: any, key: any) {
        const keyLang = document.dir == 'rtl' ? '' : '_en';
        return data && data[key + keyLang] ? data[key + keyLang] : (data && data[key] ? data[key] : '');
    }

    touchedForm(form: any) {
        for (let i in form.controls) {
            form.controls[i].touched = true;
        }
    }

    setData(key: any, data: any) {
        localStorage.setItem(key, JSON.stringify(data));

    }

    getData(key: any, defaultValue: any = null) {
        let data = defaultValue;

        try {
            const savedData: any = localStorage.getItem(key);

            data = JSON.parse(savedData);

        } catch (error) {
            data = defaultValue;
        }

        return data ? data : defaultValue;
    }

    removeData(key: any) {
        localStorage.removeItem(key);

    }

    clearData() {
        localStorage.clear();
    }

    setLang(lang: any) {
        this.languageIndex = this.languages.findIndex((item: any) => item.code == lang);
        this.language = lang;
        this.setData('language', this.language);

        document.dir = this.languages[this.languageIndex].dir;
        document.body.dir = this.languages[this.languageIndex].dir;
        document.getElementsByTagName('html')[0].setAttribute('lang', lang);
        this.publishEvent('update:lang', lang);
    }

    subscribeEvent(tag: any, handler: any) {
        if (!this.eventsHandlers[tag]) {
            this.eventsHandlers[tag] = [];
        }

        let hasString = false;
        if (handler.toString) {
            hasString = true;
        }

        let found = false;
        for (const i in this.eventsHandlers[tag]) {

            if (hasString && this.eventsHandlers[tag][i].toString() == handler.toString()) {
                found = true;
                this.eventsHandlers[tag][i] = handler;
            } else if (!hasString && this.isEqual(this.eventsHandlers[tag][i], handler)) {
                found = true;
                this.eventsHandlers[tag][i] = handler;
            }
        }

        if (!found) {
            this.eventsHandlers[tag].push(handler);
        }

    }

    publishEvent(tag: any, data: any = null) {
        if (this.eventsHandlers[tag] && this.eventsHandlers[tag].length > 0) {
            for (let i in this.eventsHandlers[tag]) {
                this.eventsHandlers[tag][i](data);
            }
        }
    }

    publishEventStartWith(tag: any, data = null) {
        const keys = Object.keys(this.eventsHandlers);
        const searchedFields = [];

        for (const key of keys) {
            if (key.startsWith(tag)) {
                searchedFields.push(key);
            }
        }

        for (const key of searchedFields) {
            if (this.eventsHandlers[key] && this.eventsHandlers[key].length > 0) {
                for (const i in this.eventsHandlers[key]) {
                    this.eventsHandlers[key][i](data);
                }
            }
        }

    }

    removeEvent(tag: any, handlerId: number = -1) {
        if (this.eventsHandlers[tag]) {
            if (handlerId >= 0) {
                if (this.eventsHandlers[tag][handlerId]) {
                    delete this.eventsHandlers[tag][handlerId];
                }
            } else {

                for (const i in this.eventsHandlers[tag]) {
                    delete this.eventsHandlers[tag][i];
                }
                delete this.eventsHandlers[tag];
            }
        }
    }

    // returns ar for arabic language and en otherwise.
    getDeviceLanguage() {

        // get the language from the browser, this can be like "en", "en-US", "fr", "fr-FR", "es-ES"
        let deviceLanguage = window.navigator.language.toLowerCase();

        if (deviceLanguage.startsWith('ar')) {

            deviceLanguage = 'ar';
        } else {

            deviceLanguage = 'en';
        }

        return deviceLanguage;
    }

    getMapDetails(lat: any, lng: any, cb: any) {


        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }

        this.zone.run(() => {
            this.geocoder.geocode({
                latLng: { lat, lng }
            }, (responses: any) => {
                this.zone.run(() => {


                    if (responses && responses.length > 0) {
                        const address = (responses[0].formatted_address + '').replace('، الأردن', '');
                        const response = responses[0];

                        cb(address, response, responses);
                    } else {

                        cb(null, null, null);
                    }

                });
            });
        });

    }

    getMapLatLng(address: any, cb: any) {


        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }

        this.zone.run(() => {
            this.geocoder.geocode({
                address
            }, (responses: any) => {
                this.zone.run(() => {

                    if (responses && responses.length > 0) {
                        const response = responses[0];
                        cb({ lat: response.geometry.location.lat, lng: response.geometry.location.lng }, response, responses);
                    } else {

                        cb(null, null, null);
                    }

                });
            });
        });

    }

    setTitle(name: any, ckarz = false) {
        if (name) {
            document.title = this.translate(name) + (ckarz ? ' - cKarz' : '');
        }
    }

    sendNotification(text: string, params: any = null, cssClass: any = 'success', duration: any = null) {
        console.log(text);
        $.notify(this.translate(text, params), {
            className: cssClass,
            autoHideDelay: duration ? duration : 3000,
            style: 'bootstrap',
            // position: "top center",
        });

    }


    goBack() {
        // this.navCtr.back();
        this.location.back();
    }


    securityUrl(url: any, type = 'url'): any {

        if (type == 'url') {
            return this.santitzer.bypassSecurityTrustUrl(url);
        }

        if (type == 'style') {
            return this.santitzer.bypassSecurityTrustStyle(url);
        }

        if (type == 'resource') {
            return this.santitzer.bypassSecurityTrustResourceUrl(url);
        }
    }

    clone(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    isEqual(obj1: any, obj2: any) {
        obj1 = JSON.stringify(obj1);
        obj2 = JSON.stringify(obj2);

        if (obj1 != obj2) {
            return false;
        }


        return true;

    }

    copyText(text: any) {
        var copyText = document.getElementById("copyTextInput") as HTMLInputElement;
        copyText.value = text;
        copyText.select();
        copyText.setSelectionRange(0, 9999999)
        document.execCommand("copy");
        this.sendNotification('SUCCESS_COPY');
    }

    convertNumbers(text: any) {

        text = text.replace(/١/g, '1');
        text = text.replace(/٢/g, '2');
        text = text.replace(/٣/g, '3');
        text = text.replace(/٤/g, '4');
        text = text.replace(/٥/g, '5');
        text = text.replace(/٦/g, '6');
        text = text.replace(/٧/g, '7');
        text = text.replace(/٨/g, '8');
        text = text.replace(/٩/g, '9');
        text = text.replace(/٠/g, '0');
        text = text.replace(/[^\d.-^\+]/g, '');

        return text;
    }

    getFile(opt: any = { types: ['png', 'jpg', 'jpeg'], size: 4, accept: null, multiple: false }): Promise<any> {

        if (!opt) {
            opt = { types: ['png', 'jpg', 'jpeg'], size: 4 };
        }
        if (!opt.size) {
            opt.size = 4;
        }
        if (!opt.types) {
            opt.types = ['png', 'jpg', 'jpeg'];
        }

        const self = this;
        return new Promise((resolve, error) => {
            this.zone.run(() => {
                let fileElement: any = document.createElement('input');
                fileElement.setAttribute('type', 'file');
                fileElement.setAttribute('hidden', 'true');

                if (opt.accept) {
                    fileElement.setAttribute('accept', opt.accept);
                }

                if (opt.multiple) {
                    fileElement.setAttribute('multiple', 'true');
                }

                fileElement.style.display = 'none';
                fileElement.id = 'fileUploadUtilites';
                $(document.body).append(fileElement);

                $(fileElement).on('cancel', (event: any) => {
                    fileElement = null;
                    $(fileElement).remove();
                    // error({ error: 4, type: 'error_no_file', event });
                });

                fileElement.onchange = (event: any) => {
                    self.zone.run(() => {
                        fileElement = null;
                        let files = [];

                        if (event.target) {
                            files = event.target.files;
                        } else if (event.path) {
                            files = event.path;
                        }


                        const validFiles: any = [];

                        const onFinish = () => {
                            if (validFiles.length == files.length) {
                                resolve(opt.multiple ? validFiles : validFiles[0]);
                            }
                        };

                        for (let file of files) {

                            if (file != null) {
                                // check size
                                const size = file.size / 1024.0000 / 1024.0000;
                                if (size > opt.size) {
                                    self.sendNotification('ERROR_FILE_SIZE', { size: opt.size }, 'danger', 4000);
                                    error({ error: 1, type: 'error_size', event });
                                }

                                let sameType = false;

                                opt.types.forEach((type: any) => {
                                    if (file.type.indexOf(type) >= 0) {
                                        sameType = true;
                                    }
                                });

                                if (!sameType) {
                                    const name = (file.name + '').split('.');
                                    const ext = name[name.length - 1].toLowerCase();
                                    opt.types.forEach((type: any) => {
                                        if (ext == type) {
                                            sameType = true;
                                        }
                                    });

                                    if (!sameType) {
                                        self.sendNotification('ERROR_FILE_TYPE', { types: opt.types.join(', ') }, 'danger', 4000);
                                        error({ error: 2, type: 'error_type', event });
                                    }

                                }

                                const fileE = document.getElementById('fileUploadUtilites');
                                if (fileE) {
                                    fileE.remove();
                                }

                                if ((file.type + '').indexOf('image') >= 0) {
                                    const reader = new FileReader();
                                    reader.onload = (readerEvent: any) => {
                                        let img = new Image();
                                        img.onload = (imageEvent: any) => {

                                            // Resize the image
                                            let canvas: any = document.createElement('canvas');
                                            let maxSize = 1024; let // TODO : pull max size from a site config
                                                width = img.width;
                                            let height = img.height;

                                            if (width > height) {
                                                if (width > maxSize) {
                                                    height *= maxSize / width;
                                                    width = maxSize;
                                                }
                                            } else {
                                                if (height > maxSize) {
                                                    width *= maxSize / height;
                                                    height = maxSize;
                                                }
                                            }

                                            canvas.width = width;
                                            canvas.height = height;

                                            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                                            const dataUrl = canvas.toDataURL(file.type);
                                            const resizedImage = self.dataURLToBlob(dataUrl, file.name);
                                            console.log('resizedImage', resizedImage);
                                            validFiles.push({ file: resizedImage, path: (window.URL || (window as any).webkitURL).createObjectURL(resizedImage) });

                                            onFinish();
                                        };
                                        img.src = readerEvent.target.result;
                                    };


                                    reader.readAsDataURL(file);

                                } else {
                                    // resolve({ file: file, path: (window.URL || (window as any).webkitURL).createObjectURL(file) });
                                    validFiles.push({ file, path: (window.URL || (window as any).webkitURL).createObjectURL(file) });
                                    onFinish();
                                }
                                // resolve({ file: file, path: (window.URL || (window as any).webkitURL).createObjectURL(file) });
                            } else {
                                const fileE = document.getElementById('fileUploadUtilites');
                                if (fileE) {
                                    fileE.remove();
                                }
                                error({ error: 3, type: 'error_not_support', event });
                            }

                        }

                        if (opt.multiple) {
                            onFinish();
                        } else {
                            if (validFiles.length > 0) {
                                onFinish();
                            }
                        }
                    });

                };

                fileElement.click();
            });


        });

    }

    dataURLToBlob(dataURL: any, name: any) {
        const BASE64_MARKER = ';base64,';
        let parts;
        let contentType;
        let raw;

        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            parts = dataURL.split(',');
            contentType = parts[0].split(':')[1];
            raw = parts[1];

            return new Blob([raw], { type: contentType });
        }

        parts = dataURL.split(BASE64_MARKER);
        contentType = parts[0].split(':')[1];
        raw = window.atob(parts[1]);
        const rawLength = raw.length;

        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        const file: any = new Blob([uInt8Array], { type: contentType });
        file.name = name;
        return file;
    }

    scrollTop(animation = true) {
        if (animation) {
            $('html, body').animate({ scrollTop: 0 }, 'slow');

        } else {
            window.scroll({
                top: 0,
                left: 0,
            });
        }


    }


    animateScrollTo(target: any) {
        const self = this;
        // self.scrollAnimateAvailable = true;
        // let maxScroll = document.body.offsetHeight - window.innerHeight;
        // let timer = TimerObservable
        //     .create(0, 20).pipe(
        //         takeWhile(() => self.scrollAnimateAvailable)).subscribe((e) => {
        //             if (e == 0) {
        //                 e++;
        //             }
        //             if (window.pageYOffset >= target.offsetTop) {
        //                 window.scrollTo(0, window.pageYOffset - e);

        //             } else if (window.pageYOffset <= target.offsetTop) {
        //                 window.scrollTo(0, window.pageYOffset + e);


        //             }


        //             if ((window.pageYOffset + 20 > target.offsetTop && window.pageYOffset - 20 < target.offsetTop) || window.pageYOffset == maxScroll) {
        //                 setTimeout(() => {
        //                     window.scroll({
        //                         top: target.offsetTop,
        //                         left: 0,
        //                         behavior: 'smooth'
        //                     });
        //                 }, 500);


        //                 self.scrollAnimateAvailable = false;
        //                 timer.unsubscribe();
        //             }

        //         });


    }

    scrollTo(el: HTMLElement, animation = true) {


        const top = el.getBoundingClientRect().top;

        if (animation) {
            $('html, body').animate({ scrollTop: top }, 'slow');

        } else {
            window.scroll({
                top,
                left: 0
            });
        }

        // this.animateScrollTo(el);


    }

    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(resp => {

                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
            },
                err => {
                    reject(err);
                });
        });

    }

    deleteNull(array: Array<any>) {

        const index = array.findIndex((value, i, obj) => value.id == null);

        if (index >= 0) {
            array.splice(index, 1);
        }

    }

    async createModal(page: any, data: any = null, callback: any = null, full = false, cssClass = '') {

        // const modal = await this.modalCtr.create({
        //     component: page,
        //     componentProps: data,
        //     cssClass: full ? cssClass : cssClass + ' auto-size'
        // });

        // if (callback) {
        //     modal.onDidDismiss().then(response => {
        //         callback(response);
        //     });
        // }

        // return await modal.present();
    }


    trans(key: any, args :any = null) {
        return this.translate(key, args);
    }


    inArray(item: any, array: any, isNumber = true) {
        let index = array.indexOf(item);
        if (index >= 0) {
            return true;
        }

        for (let i of array) {
            if (isNumber) {
                i = parseInt(i);
            }
            if (i == item) {
                return true;
            }
        }

        return false;
    }


    itemsInArray(items: any, array: any, isNumber = true) {
        let inArray = true;

        for (let a of items) {
            if (isNumber) {
                a = parseInt(a);
            }
            if (!this.inArray(a, array)) {
                inArray = false;
            }
        }

        return inArray;
    }



    playSound(file = 'click') {
        if (this.audios[file]) {
            try {
                this.audios[file].pause();
            } catch (e) {

            }
        }
        this.audios[file].play();
    }

}
