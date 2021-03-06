import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-lichct',
  templateUrl: './lichct.component.html',
  styleUrls: ['./lichct.component.css']
})
export class LichctComponent extends BaseComponent implements OnInit {
  public lichcts: any;
  public lichct: any;
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
      'tenlichct': [''],     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/lichct/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.lichcts = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/lichct/search',{page: this.page, pageSize: this.pageSize, tenlichct: this.formsearch.get('tenlichct').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.lichcts = res.data;
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
           malich_ct:value.malich_ct,
           tenlichct:value.tenlichct,
           noidung:value.noidung,
           ngaybd:value.ngaybd,
           ngaykt:value.ngaykt,
           magv:value.magv,
           macv:value.macv,
           trangthai:value.trangthai,
           ngaytao:value.ngaytao,
           ngaysua:value.ngaysua        
          };
        this._api.post('/api/lichct/create-lichct',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          tenlichct:value.tenlichct,
          noidung:value.noidung,
          ngaybd:value.ngaybd,
          ngaykt:value.ngaykt,
          magv:value.magv,
          macv:value.macv,
          trangthai:value.trangthai,
          ngaytao:value.ngaytao,
          ngaysua:value.ngaysua,
           malich_ct:this.lichct.malich_ct,          
          };
        this._api.post('/api/lichct/update-lichct',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/lichct/delete-lichct',{malich_ct:row.malich_ct}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.lichct = null;
    this.formdata = this.fb.group({
      'malich_ct': ['', Validators.required],
      'tenlichct': ['', Validators.required],
      'noidung': ['', Validators.required],
      'ngaybd': ['', Validators.required],
      'ngaykt': ['', Validators.required],
      'magv': ['', Validators.required],
      'macv': ['', Validators.required],
      'trangthai': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'ngaysua': ['', Validators.required],
    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.lichct = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
      'malich_ct': ['', Validators.required],
      'tenlichct': ['', Validators.required],
      'noidung': ['', Validators.required],
      'ngaybd': ['', Validators.required],
      'ngaykt': ['', Validators.required],
      'magv': ['', Validators.required],
      'macv': ['', Validators.required],
      'trangthai': ['', Validators.required],
      'ngaytao': ['', Validators.required],
      'ngaysua': ['', Validators.required],
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
      this._api.get('/api/lichct/get-by-id/'+ row.malich_ct).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.lichct = res; 
          this.formdata = this.fb.group({
            'malich_ct': [this.lichct.malich_ct, Validators.required],
            'tenlichct': [this.lichct.tenlichct, Validators.required],
            'noidung': [this.lichct.noidung, Validators.required],
            'ngaybd': [this.lichct.ngaybd, Validators.required],
            'ngaykt': [this.lichct.ngaykt, Validators.required],
            'magv': [this.lichct.magv, Validators.required],
            'macv': [this.lichct.macv, Validators.required],
            'trangthai': [this.lichct.trangthai, Validators.required],
            'ngaytao': [this.lichct.ngaytao, Validators.required],
            'ngaysua': [this.lichct.ngaysua, Validators.required],
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



