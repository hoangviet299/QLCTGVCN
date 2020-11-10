import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-sinhvien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css']
})
export class SinhvienComponent extends BaseComponent implements OnInit {
  public sinhviens: any;
  public sinhvien: any;
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
      'tensv': [''],     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/sinhvien/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.sinhviens = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/sinhvien/search',{page: this.page, pageSize: this.pageSize, tensv: this.formsearch.get('tensv').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.sinhviens = res.data;
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
           masv:value.masv,
           tensv:value.tensv,
           gioitinh:value.gioitinh,
           ngaysinh:value.ngaysinh,
           quequan:value.quequan,
           malop:value.malop,
           magv:value.magv,
           namhoc:value.namhoc,
           sdt:value.sdt,
           avata:value.avata,
           ngaysua:value.ngaysua,
           ngaytao:value.ngaytao ,
           trangthai:value.trangthai        
          };
        this._api.post('/api/sinhvien/create-sinhvien',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          tensv:value.tensv,
          gioitinh:value.gioitinh,
          ngaysinh:value.ngaysinh,
          quequan:value.quequan,
          malop:value.malop,
          magv:value.magv,
          namhoc:value.namhoc,
          sdt:value.sdt,
          avata:value.avata,
          ngaysua:value.ngaysua,
          ngaytao:value.ngaytao ,
          trangthai:value.trangthai ,  
           masv:this.sinhvien.masv,          
          };
        this._api.post('/api/sinhvien/update-sinhvien',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/sinhvien/delete-sinhvien',{masv:row.masv}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.sinhvien = null;
    this.formdata = this.fb.group({
      'masv': ['', Validators.required],
      'tensv': ['', Validators.required],
      'gioitinh': ['', Validators.required],
      'ngaysinh': ['', Validators.required],
      'quequan': ['', Validators.required],
      'malop': ['', Validators.required],
      'magv': ['', Validators.required],
      'namhoc': ['', Validators.required],
      'sdt': ['', Validators.required],
      'avata': ['', Validators.required],
      'ngaysua': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'trangthai': ['', Validators.required],
    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.sinhvien = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'masv': ['', Validators.required],
        'tensv': ['', Validators.required],
        'gioitinh': ['', Validators.required],
        'ngaysinh': ['', Validators.required],
        'quequan': ['', Validators.required],
        'malop': ['', Validators.required],
        'magv': ['', Validators.required],
        'namhoc': ['', Validators.required],
        'sdt': ['', Validators.required],
        'avata': ['', Validators.required],
        'ngaysua': ['', Validators.required],
        'ngaytao': ['', Validators.required],
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
      this._api.get('/api/sinhvien/get-by-id/'+ row.masv).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.sinhvien = res; 
          this.formdata = this.fb.group({
            'masv': [this.sinhvien.masv, Validators.required],
            'tensv': [this.sinhvien.tensv, Validators.required],
            'gioitinh': [this.sinhvien.gioitinh, Validators.required],
            'ngaysinh': [this.sinhvien.ngaysinh, Validators.required],
            'quequan': [this.sinhvien.quequan, Validators.required],
            'malop': [this.sinhvien.malop, Validators.required],
            'magv': [this.sinhvien.magv, Validators.required],
            'namhoc': [this.sinhvien.namhoc, Validators.required],
            'sdt': [this.sinhvien.sdt, Validators.required],
            'avata': [this.sinhvien.avata, Validators.required],
            'ngaysua': [this.sinhvien.ngaysua, Validators.required],
            'ngaytao': [this.sinhvien.ngaytao, Validators.required],
            'trangthai': [this.sinhvien.trangthai, Validators.required],
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



