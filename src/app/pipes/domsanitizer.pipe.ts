import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) { }

  transform(img: string): any {

    //De la recomendacion
    const domImg = `url('${img}')`;
    return this._domSanitizer.bypassSecurityTrustStyle(domImg);


    /*const doImg = `background-image: url('${img}')`;
    let image = this._domSanitizer.bypassSecurityTrustStyle(img);
    return image;*/

    /* del video
    const domImg = `background-image: url('${ img }')`;
    return this._domSanitizer.bypassSecurityTrustStyle( domImg );*/

    


  }

}
