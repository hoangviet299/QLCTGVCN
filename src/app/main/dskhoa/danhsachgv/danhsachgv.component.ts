import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-danhsachgv',
  templateUrl: './danhsachgv.component.html',
  styleUrls: ['./danhsachgv.component.css']
})
  export class DanhsachgvComponent extends BaseComponent implements OnInit {
  public gvcns: any;
  public gvcn: any;
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
        'tengv': [''],     
      });
     
     this.search();
    }
  
    loadPage(page) { 
      this._api.post('/api/gvcn/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
        this.gvcns = res.data;
        this.totalRecords =  res.totalItems;
        this.pageSize = res.pageSize;
        });
    } 
  
    search() { 
      this.page = 1;
      this.pageSize = 5;
      this._api.post('/api/gvcn/search',{page: this.page, pageSize: this.pageSize, tengv: this.formsearch.get('tengv').value}).takeUntil(this.unsubscribe).subscribe(res => {
        this.gvcns = res.data;
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
