// Defaults Modules
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Generated Services
import { ContentService } from '../../../../_services/content.service';

// Custome Validator
import { ValidateString } from '../../../../_helpers/validator';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})

export class ContentComponent implements OnInit {
  @ViewChild('mymodal') model: ElementRef;

  public contentList = [];
  public categoryList = [];
  public contentForm: FormGroup;
  public isSubmitted = false;
  public selectedCategoryId: number;
  public searchText = '';

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.resetContentForm();
  }
  /**
   * Content Form Initilization
   */
  resetContentForm(): any {
    this.contentForm = this.fb.group({
      categoryId: [this.selectedCategoryId],
      content: [, [ValidateString]],
      image: [, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get contentFormControls(): any {
    return this.contentForm.controls;
  }
  /**
   * Get Content list based on selected category
   */
  async getContentList(): Promise<any> {
    try {
      const queryParams = {
        categoryId: this.selectedCategoryId,
      };
      const contentListResponse = await this.contentService.getContentList(
        queryParams
      );
      this.contentList = contentListResponse.list;
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
        (reason) => {
          console.log('cancel');
        }
      );
  }

  /**
   * @description Add New Content in selected Category
   * @param value 
   */
  async submitContentForm(value): Promise<any> {
    try {
      this.isSubmitted = true;
      if (this.contentForm.invalid) {
        return;
      }
      value.categoryId = this.selectedCategoryId;
      await this.contentService.addContent(value);
      this.modalService.dismissAll();
      this.getContentList();
    } catch (error) {
      console.log(error);
    }
  }

  onFileChange(event, fieldName): any {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.contentForm.patchValue({
        [fieldName]: file,
      });
    }
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
   * @description Get Content List on Category Change
   * @param event 
   */
  changeCategory(event): any {
    this.getContentList();
  }
}
