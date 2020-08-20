// Default Modules
import { Injectable } from '@angular/core';

// Generated Services
import { HttpService } from './http.service';
@Injectable({ providedIn: 'root' })
export class ContentService {

  constructor(
    private httpService: HttpService,
  ) { }

  /**
   * @description Get Catelogory List
   */
  getCategortList(): Promise<any> {
    return this.httpService.get('category/list');
  }

  /**
   * @description Add New Category
   * @param data 
   */
  addCategory(data): Promise<any> {
    return this.httpService.post('category/add', data);
  }

  /**
   * @description Get Content List
   * @param queryParams
   */
  getContentList(queryParams): Promise<any> {
    return this.httpService.get('content/list', queryParams);
  }

  /**
 * @description Get New Content
 * @param data
 */
  addContent(data): Promise<any> {
    return this.httpService.postWithFormData('content/add', data);
  }
}
