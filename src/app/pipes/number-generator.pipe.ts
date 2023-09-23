import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberGenerator'
})
export class NumberGeneratorPipe implements PipeTransform {

  transform(value: number): number[] {
    const pagesArray:number[] = [];
    for(let i = 1; i <= value+1; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

}
