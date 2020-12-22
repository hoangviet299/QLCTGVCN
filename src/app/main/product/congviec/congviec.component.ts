import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-congviec',
  templateUrl: './congviec.component.html',
  styleUrls: ['./congviec.component.css']
})
export class CongviecComponent extends BaseComponent implements OnInit {
  public congviecs: any;
  public congviec: any;
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
      'tencv': [''],     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/congviec/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.congviecs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/congviec/search',{page: this.page, pageSize: this.pageSize, tencv: this.formsearch.get('tencv').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.congviecs = res.data;
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
           macv:value.macv,
           tencv:value.tencv,
           mota:value.mota,
           chitiet:value.chitiet,
           ngaybd:value.ngaybd,
           ngaykt:value.ngaykt,
           ghichu:value.ghichu,
          
           ngaytao:value.ngaytao,
           ngaysua:value.ngaysua  ,
           trangthai:value.trangthai      
          };
        this._api.post('/api/congviec/create-congviec',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          tencv:value.tencv,
          mota:value.mota,
          chitiet:value.chitiet,
          ngaybd:value.ngaybd,
          ngaykt:value.ngaykt,
          ghichu:value.ghichu,
         
          ngaytao:value.ngaytao,
          ngaysua:value.ngaysua  ,
          trangthai:value.trangthai    ,
           macv:this.congviec.macv,          
          };
        this._api.post('/api/congviec/update-congviec',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/congviec/delete-congviec',{macv:row.macv}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.congviec = null;
    this.formdata = this.fb.group({
      'macv': ['', Validators.required],
      'tencv': ['', Validators.required],
      'mota': ['', Validators.required],
      'chitiet': ['', Validators.required],
      'ngaybd': ['', Validators.required],
      'ngaykt': ['', Validators.required],
      'ghichu': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'ngaysua': ['', Validators.required],
      'trangthai': ['', Validators.required],

    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.congviec = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
      'macv': ['', Validators.required],
      'tencv': ['', Validators.required],
      'mota': ['', Validators.required],
      'chitiet': ['', Validators.required],
      'ngaybd': ['', Validators.required],
      'ngaykt': ['', Validators.required],
      'ghichu': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'ngaysua': ['', Validators.required],
      'trangthai': ['', Validators.required],

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
      this._api.get('/api/congviec/get-by-id/'+ row.macv).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.congviec = res; 
          this.formdata = this.fb.group({
            'macv': [this.congviec.macv, Validators.required],
            'tencv': [this.congviec.tencv, Validators.required],
            'mota': [this.congviec.mota, Validators.required],
            'chitiet': [this.congviec.chitiet, Validators.required],
            'ngaybd': [this.congviec.ngaybd, Validators.required],
            'ngaykt': [this.congviec.ngaykt, Validators.required],
            'ghichu': [this.congviec.ghichu, Validators.required],
            'ngaytao': [this.congviec.ngaytao, Validators.required],
            'ngaysua': [this.congviec.ngaysua, Validators.required],
            'trangthai': [this.congviec.trangthai, Validators.required],

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



