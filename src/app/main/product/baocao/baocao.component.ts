import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-baocao',
  templateUrl: './baocao.component.html',
  styleUrls: ['./baocao.component.css']
})

export class BaocaoComponent extends BaseComponent implements OnInit {
  public baocaos: any;
  public baocao: any;
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
      'tenbc': [''],     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/baocao/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.baocaos = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/baocao/search',{page: this.page, pageSize: this.pageSize, tenbc: this.formsearch.get('tenbc').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.baocaos = res.data;
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
           mabc:value.mabc,
           tenbc:value.tenbc,
           noidung:value.noidung,
           ngaytao:value.ngaytao,
           ngaykt:value.ngaykt         
          };
        this._api.post('/api/baocao/create-baocao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          tenbc:value.tenbc,
          noidung:value.noidung,
          ngaytao:value.ngaytao,
          ngaykt:value.ngaykt ,  
           mabc:this.baocao.mabc,          
          };
        this._api.post('/api/baocao/update-baocao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/baocao/delete-baocao',{mabc:row.mabc}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.baocao = null;
    this.formdata = this.fb.group({
      'mabc': ['', Validators.required],
      'tenbc': ['', Validators.required],
      'noidung': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'ngaykt': ['', Validators.required],
    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.baocao = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
      'mabc': ['', Validators.required],
      'tenbc': ['', Validators.required],
      'noidung': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'ngaykt': ['', Validators.required],
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
      this._api.get('/api/baocao/get-by-id/'+ row.mabc).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.baocao = res; 
          this.formdata = this.fb.group({
            'mabc': [this.baocao.mabc, Validators.required],
            'tenbc': [this.baocao.tenbc, Validators.required],
            'noidung': [this.baocao.noidung, Validators.required],
            'ngaytao': [this.baocao.ngaytao, Validators.required],
            'ngaykt': [this.baocao.ngaykt, Validators.required],
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



