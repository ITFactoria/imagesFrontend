import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, idUser: string): string {
    
    let retorno = `${URL}/api/post/file/${img}`; 
    return `${URL}/api/post/file/${img}`;
  }

}
