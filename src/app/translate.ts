import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from './services/utilities.service';


@Pipe({
    name: 'trans',
    pure: false
})
export class TranslatePipe implements PipeTransform {

    // public storageUrl = environment.StorageUrl;

    constructor(private utilities: UtilitiesService) {
    }

    transform(key: string, args: any = {}): any {
        return this.utilities.translate(key, args);
    }

}
