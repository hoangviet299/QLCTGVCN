import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-lophoc',
  templateUrl: './lophoc.component.html',
  styleUrls: ['./lophoc.component.css']
})
export class LophocComponent extends BaseComponent implements OnInit {
  public lophocs: any;
  public lophoc: any;
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
      'tenlop': [''],     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/LopHoc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/LopHoc/search',{page: this.page, pageSize: this.pageSize, tenlop: this.formsearch.get('tenlop').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }


  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) { 
        let tmp = {
           malop:value.malop,
           tenlop:value.tenlop,
           makhoa:value.makhoa,
           diachi:value.diachi          
          };
        this._api.post('/api/LopHoc/create-lophoc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
      });
    } else { 
        let tmp = {
           tenlop:value.tenlop,
           makhoa:value.makhoa,
           diachi:value.diachi,
           malop:this.lophoc.malop,          
          };
        this._api.post('/api/LopHoc/update-lophoc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/LopHoc/delete-lophoc',{malop:row.malop}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.lophoc = null;
    this.formdata = this.fb.group({
      'malop': ['', Validators.required],
      'tenlop': ['', Validators.required],
      'makhoa': ['', Validators.required],
      'diachi': ['', Validators.required],
    }, {
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.lophoc = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'malop': ['', Validators.required],
        'tenlop': ['', Validators.required],
        'makhoa': ['', Validators.required],
        'diachi': ['', Validators.required],
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
      this._api.get('/api/LopHoc/get-by-id/'+ row.malop).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.lophoc = res; 
          this.formdata = this.fb.group({
            'malop': [this.lophoc.malop, Validators.required],
            'tenlop': [this.lophoc.tenlop, Validators.required],
            'makhoa': [this.lophoc.makhoa, Validators.required],
            'diachi': [this.lophoc.diachi, Validators.required],
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

