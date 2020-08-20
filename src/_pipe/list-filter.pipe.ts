import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
/**
 * Filter array based on field and searchText
 */
export class ListFilterPipe implements PipeTransform {
  transform(items: any[], field: string, searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      if (it[field].toLowerCase().includes(searchText)) {
        return it;
      }
    });
  }
}
