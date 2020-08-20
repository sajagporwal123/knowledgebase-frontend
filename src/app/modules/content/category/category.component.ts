// Defaults Modules
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Generated Services
import { ContentService } from '../../../../_services/content.service';

// Custome Validator0
import { ValidateString } from '../../../../_helpers/validator';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})

export class CategoryComponent implements OnInit {
  @ViewChild('mymodal') model: ElementRef;

  public categoryList = [];
  public categoryForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.resetCategoryForm();
  }

  /**
   * Category Form Intilization
   */
  resetCategoryForm(): any {
    this.categoryForm = this.fb.group({
      name: [, [ValidateString]],
    });
  }

  get categoryFormControls(): any {
    return this.categoryForm.controls;
  }
  /**
   * @description Get Category List
   */
  async getCategoryList(): Promise<any> {
    try {
      const categoryListResponse = await this.contentService.getCategortList();
      this.categoryList = categoryListResponse.list;
    } catch (error) {
      console.log('error', error);
    }
  }

  /**
   * @description Open Modal
   * @param content 
   */
  open(content): any {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => { },
        (reason) => { }
      );
  }
  /**
   * @description Add New Category 
   * @param value 
   */
  async submitCategoryForm(value): Promise<any> {
    try {
      this.isSubmitted = true;
      if (this.categoryForm.invalid) {
        return;
      }
      await this.contentService.addCategory(value);
      this.modalService.dismissAll();
      this.getCategoryList();
    } catch (error) {
      console.log(error);
    }
  }
}
