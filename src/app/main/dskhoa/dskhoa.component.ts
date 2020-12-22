
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;


import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-dskhoa',
  templateUrl: './dskhoa.component.html',
  styleUrls: ['./dskhoa.component.css']
})
export class DskhoaComponent extends BaseComponent implements OnInit {
  public khoas: any;
  public khoa: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'tenkhoa': [''],     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/khoa/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.khoas = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/khoa/search',{page: this.page, pageSize: this.pageSize, tenkhoa: this.formsearch.get('tenkhoa').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.khoas = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  pwdCheckValidator(control){
    var filteredStrings = {search:control.value, select:'@#!$%&*'}
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if(control.value.length < 6 || !result){
        return {matkhau: true};
    }
  }

  get f() { return this.formdata.controls; }

 
}
