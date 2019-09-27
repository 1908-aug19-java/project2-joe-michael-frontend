import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchesFilter'
})
export class MatchesFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
