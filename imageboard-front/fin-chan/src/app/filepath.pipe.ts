import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filepath'
})
export class FilepathPipe implements PipeTransform {

  transform(value: any): any {

    const splitUrl = value.split('/public');

    return (splitUrl[0] + splitUrl[1]);
  }

}
