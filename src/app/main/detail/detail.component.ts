
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;


import 'rxjs/add/operator/takeUntil';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/lib/api.service';
import { takeUntil } from 'rxjs/operators';
declare var $: any;


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})


export class DetailComponent extends BaseComponent implements OnInit {
public congviec:any;
public macv:any;
public ProductDetail:any;
@ViewChild(FileUpload, { static: false }) file_image: FileUpload;
constructor(private fb: FormBuilder,
  private route:ActivatedRoute,  injector: Injector, private service:ApiService) {
  super(injector);
}





ngOnInit(): void {
  // this.refserProlichct();
  // this.macv= this.route.snapshot.params['macv'];
  this.refserProList();
}

// loadPage(page) { 
//   this._api.post('/api/congviec/get-all',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
//     this.lichcts = res;
//     this.totalRecords =  res.totalItems;
//     this.pageSize = res.pageSize;
//     });
// // } 
// refserProlichct(){
//     this._api.get('/api/congviec/get-all').takeUntil(this.unsubscribe).subscribe(res => {
//       this.congviec = res;
//   })
// }
// getid(row){
//   this._api.get('/api/congviec/get-by-id/'+ row.macv).takeUntil(this.unsubscribe).subscribe((res:any) => {
//     this.congviec = res; 
//     console.log(this.congviec);
//   })
// //   }
//   getbyid(){
//     this.getid(this.congviec);
//   }
// }
refserProList()
  {
    this.ProductDetail={};
    this._route.params.subscribe(params => {
      let id = params['macv'];
      this._api.get('/api/congviec/get-by-id/'+id).pipe(takeUntil(this.unsubscribe)).subscribe((data: any) => {
        this.ProductDetail = data;
      });
    });
  }
}