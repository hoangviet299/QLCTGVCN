import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-khoa',
  templateUrl: './khoa.component.html',
  styleUrls: ['./khoa.component.css']
})
export class KhoaComponent extends BaseComponent implements OnInit {
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

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
           makhoa:value.makhoa,
           tenkhoa:value.tenkhoa ,
           diachi : value.diachi,
           ngaythanhlap: value.ngaythanhlap,        
          };
        this._api.post('/api/khoa/create-khoa',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
           tenkhoa:value.tenkhoa,
           makhoa:this.khoa.makhoa,     
           diachi : value.diachi,
           ngaythanhlap: value.ngaythanhlap,     
          };
        this._api.post('/api/khoa/update-khoa',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/khoa/delete-khoa',{makhoa:row.makhoa}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.khoa = null;
    this.formdata = this.fb.group({
      'makhoa': ['', Validators.required],
      'tenkhoa': ['', Validators.required],
      'diachi': ['', Validators.required],
      'ngaythanhlap': ['', Validators.required],
    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.khoa = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'makhoa': ['', Validators.required],
        'tenkhoa': ['', Validators.required],
        'diachi': ['', Validators.required],
        'ngaythanhlap': ['', Validators.required],
      }, {
      });
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/khoa/get-by-id/'+ row.makhoa).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.khoa = res; 
          this.formdata = this.fb.group({
            'makhoa': [this.khoa.makhoa, Validators.required],
            'tenkhoa': [this.khoa.tenkhoa, Validators.required],
            'diachi': [this.khoa.diachi, Validators.required],
            'ngaythanhlap': [this.khoa.ngaythanhlap, Validators.required],
          }, {
          }); 
          this.doneSetupForm = true;
        }); 
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}


