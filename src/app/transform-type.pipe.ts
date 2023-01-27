import { Pipe, PipeTransform } from '@angular/core';
import { types } from './types';
@Pipe({
  name: 'transformType',
})
export class TransformTypePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string | void {
    for (let [key, type] of Object.entries(types)) {
      if (type.includes(value)) {
        return key;
      }
    }
  }
}
