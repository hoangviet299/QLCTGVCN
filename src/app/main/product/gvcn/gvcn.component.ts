import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-gvcn',
  templateUrl: './gvcn.component.html',
  styleUrls: ['./gvcn.component.css']
})
export class GvcnComponent extends BaseComponent implements OnInit {
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

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
           magv:value.magv,
           tengv:value.tengv,
           gioitinh:value.gioitinh,
           ngaysinh:value.ngaysinh,
           quequan:value.quequan,
           malop:value.malop,
           namcn:value.namcn,
           sdt:value.sdt,
           avata:value.avata,
           trangthai:value.trangthai,
           ngaysua:value.ngaysua,
           ngaytao:value.ngaytao         
          };
        this._api.post('/api/gvcn/create-gvcn',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          tengv:value.tengv,
          gioitinh:value.gioitinh,
          ngaysinh:value.ngaysinh,
          quequan:value.quequan,
          malop:value.malop,
          namcn:value.namcn,
          sdt:value.sdt,
          avata:value.avata,
          trangthai:value.trangthai,
          ngaysua:value.ngaysua,
          ngaytao:value.ngaytao ,  
           magv:this.gvcn.magv,          
          };
        this._api.post('/api/gvcn/update-gvcn',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/gvcn/delete-gvcn',{magv:row.magv}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.gvcn = null;
    this.formdata = this.fb.group({
      'magv': ['', Validators.required],
      'tengv': ['', Validators.required],
      'gioitinh': ['', Validators.required],
      'ngaysinh': ['', Validators.required],
      'quequan': ['', Validators.required],
      'malop': ['', Validators.required],
      'namcn': ['', Validators.required],
      'sdt': ['', Validators.required],
      'avata': ['', Validators.required],
      'trangthai': ['', Validators.required],
      'ngaysua': ['', Validators.required],
      'ngaytao': ['', Validators.required],
    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.gvcn = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
      'magv': ['', Validators.required],
      'tengv': ['', Validators.required],
      'gioitinh': ['', Validators.required],
      'ngaysinh': ['', Validators.required],
      'quequan': ['', Validators.required],
      'malop': ['', Validators.required],
      'namcn': ['', Validators.required],
      'sdt': ['', Validators.required],
      'avata': ['', Validators.required],
      'trangthai': ['', Validators.required],
      'ngaysua': ['', Validators.required],
      'ngaytao': ['', Validators.required],
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
      this._api.get('/api/gvcn/get-by-id/'+ row.magv).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.gvcn = res; 
          this.formdata = this.fb.group({
            'magv': [this.gvcn.magv, Validators.required],
            'tengv': [this.gvcn.tengv, Validators.required],
            'gioitinh': [this.gvcn.gioitinh, Validators.required],
            'ngaysinh': [this.gvcn.ngaysinh, Validators.required],
            'quequan': [this.gvcn.quequan, Validators.required],
            'malop': [this.gvcn.malop, Validators.required],
            'namcn': [this.gvcn.namcn, Validators.required],
            'sdt': [this.gvcn.sdt, Validators.required],
            'avata': [this.gvcn.avata, Validators.required],
            'trangthai': [this.gvcn.trangthai, Validators.required],
            'ngaysua': [this.gvcn.ngaysua, Validators.required],
            'ngaytao': [this.gvcn.ngaytao, Validators.required],
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


