import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { read } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { FormServiceService } from '../Service/form-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})


export class TaskComponent implements OnInit {
  tasklist: any[] = [];
  isEdit: boolean = false;
  id: any;
  urls: string | ArrayBuffer | null | undefined;
  errormsg: string = '';
  photoUpload: any[] = [];
  public formData: FormData = new FormData();
  objId: any;
  ngOnInit(): void {
    this.getCategory();
    this.gettasklist();
    //this.toster.success("Successfully deleted", '')

  }
  showAddForm: boolean = false;
  addButtonEnable: boolean = true
  categoryList: any = {}
  givenTask: any = '';
  description: any = '';
  selectedCategory: any;
  constructor(private formService: FormServiceService, private toster: ToastrService,
    private router: Router) { }

  openDialog() {
    // const dialogRef = this.dialog.open(LoginSignupComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  addTask() {
    this.showAddForm = !this.showAddForm
    this.addButtonEnable = !this.addButtonEnable
  }

  submit() {

    let qry = ''
    if (!this.isEdit)
      qry = `insert into saveTask(task, discription, category, createdby, createddate, doc) values('${this.givenTask}','${this.description}','${this.selectedCategory}', '${localStorage.getItem("email")}', current_timestamp, '${this.urls}' );`
    else
      qry = `update saveTask set(task, category, discription, doc) = ('${this.givenTask}', '${this.selectedCategory}','${this.description}', '${this.urls}') where task_id = ${this.id}; `

    if (this.givenTask == 'null' || this.givenTask == 'undefined' || this.givenTask == '' || this.givenTask == null || this.givenTask == undefined) {
      this.errormsg = 'Enter Task'
      return;
    }
    if (this.selectedCategory == 'null' || this.selectedCategory == 'undefined' || this.selectedCategory == '' || this.selectedCategory == null || this.selectedCategory == undefined) {
      this.errormsg = 'Enter Category'
      return;
    }
    if (this.description == 'null' || this.description == 'undefined' || this.description == '' || this.description == null || this.description == undefined) {
      this.errormsg = 'Enter Discription'
      return;
    }
    if (this.urls == 'null' || this.urls == 'undefined' || this.urls == '' || this.urls == null || this.urls == undefined) {
      this.errormsg = 'Attach pdf/doc file'
      return;
    }
    this.formService.saveTaks(qry).subscribe(res => {
      this.addButtonEnable = true;
      this.showAddForm = false;
      this.gettasklist()
      this.errormsg = ''
    }, err => {
      console.log( err)
    })
  }

  reset() {
    this.selectedCategory = ''
    this.urls = ''
    this.description = ''
    this.givenTask = ''
    this.errormsg = ''
  }

  // onDelete(id:any){
  //   let qry = `delete from saveTask where task_id = ${id}; `
  //   this.formService.deleteTask(qry).subscribe(res =>{
  //     console.log('resssdelete', res)
  //     this.gettasklist()

  //     this.toster.success("Successfully deleted", '', { timeOut: 6000, positionClass: "toast-top-center", disableTimeOut: true, tapToDismiss: true, closeButton: true, extendedTimeOut: 0 })
  //     return false;
  //   }, err =>{
  //     console.log('errrdelete', err)
  //   })

  // }

  onEdit(id: any) {
    this.objId = id._id,
      this.givenTask = id.task;
    this.description = id.discription;
    this.selectedCategory = id.category;
    this.isEdit = true;
    this.id = id.task_id
    // this.urls = id.doc;
    this.showAddForm = true;
    this.addButtonEnable = false;

  }



  // gettasklist(){
  //   let qry = `select * from saveTask where createdby = '${localStorage.getItem('email')}'`
  //   this.formService.getSavedData(qry).subscribe(res =>{
  //     console.log('forcmmm', res);
  //     this.tasklist = res;
  //   }, erro =>{
  //     console.log('erroorss', erro)
  //   })
  // }

  // getCategory(){
  //   let qry= "select * from taskCat"
  //   console.log("getcategoryyyyyyyyyyyyyyy")
  //   this.formService.getCategory(qry).subscribe(res => {
  //     console.log(res.rows,"---------------");
  //     this.categoryList=res.rows


  //   })

  // }





  download(list: any) {
    // window.open(list.doc, '_blank');
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = list.doc
    a.target = "_blank";
    a.download = new Date().getMilliseconds() + 'sample'
    a.click();
    document.body.removeChild(a);
  }




  ///////////////////////////////////////////////////////////////////////////////////////////////

  saveTask() {

    if (this.givenTask == 'null' || this.givenTask == 'undefined' || this.givenTask == '' || this.givenTask == null || this.givenTask == undefined) {
      this.errormsg = 'Enter Task'
      return;
    }
    if (this.selectedCategory == 'null' || this.selectedCategory == 'undefined' || this.selectedCategory == '' || this.selectedCategory == null || this.selectedCategory == undefined) {
      this.errormsg = 'Enter Category'
      return;
    }
    if (this.description == 'null' || this.description == 'undefined' || this.description == '' || this.description == null || this.description == undefined) {
      this.errormsg = 'Enter Discription'
      return;
    }

    if (!this.isEdit) {
      let payload = {
        "task": this.givenTask,
        "discription": this.description,
        "category": this.selectedCategory,
        "createdby": `${localStorage.getItem("email")}`
      }

      this.formService.saveTask(payload).subscribe(res => {
        this.addButtonEnable = true;
        this.showAddForm = false;
        this.gettasklist()
        this.errormsg = ''
        this.reset()
      }, err => {
        console.log( err)
      })


    } else {
      let payload = {
        "_id": this.objId,
        "task": this.givenTask,
        "discription": this.description,
        "category": this.selectedCategory,
        "createdby": `${localStorage.getItem("email")}`
      }
      
      this.formService.updateTask(payload).subscribe(res => {
        this.addButtonEnable = true;
        this.showAddForm = false;
        this.gettasklist()
        this.errormsg = ''
        this.reset()
        this.isEdit = false
      }, err => {
        console.log( err)
      })

    }



    // if (this.urls == 'null' || this.urls == 'undefined' || this.urls == '' || this.urls == null || this.urls == undefined) {
    //   this.errormsg = 'Attach pdf/doc file'
    //   return;
    // }
    // let payload={
    //   "task": this.givenTask,
    //   "discription": this.description,
    //   "category": this.selectedCategory,
    //   "createdby": `${localStorage.getItem("email")}`
    // }
    // this.formService.saveTask(payload).subscribe(res =>{
    //   console.log('saved', res)
    //   this.addButtonEnable = true;
    //   this.showAddForm = false;
    //   //this.gettasklist()
    //   this.errormsg=''
    //   this.reset()
    // }, err=>{
    //   console.log('error', err)
    // })
  }

  getCategory() {

    this.formService.getCategory({}).subscribe(res => {
      this.categoryList = res


    })

  }

  // gettasklist(){
  //   let qry = `select * from saveTask where createdby = '${localStorage.getItem('email')}'`
  //   this.formService.getSavedData(qry).subscribe(res =>{
  //     console.log('forcmmm', res);
  //     this.tasklist = res;
  //   }, erro =>{
  //     console.log('erroorss', erro)
  //   })
  // }

  files: any
  onUploadDocument(event: any) {
    this.photoUpload = [];
    this.files = event.target.files[0];
  }

  addattachment() {
    this.formData = new FormData();
    this.formData.append("task", this.givenTask);
    this.formData.append("category", this.selectedCategory);
    this.formData.append("discription", this.description)
    this.formData.append("path", this.files.name)
    this.formService.savetaskForm(this.formData).subscribe(res => {
    }, erro => {
      console.log( erro)
    })

  }

  gettasklist() {
    let qry = `select * from saveTask where createdby = '${localStorage.getItem('email')}'`
    let payload = {
      "createdby": `${localStorage.getItem('email')}`
    }
    this.formService.getSavedData(payload).subscribe(res => {
      this.tasklist = res.data;
    }, erro => {
      console.log(erro)
    })
  }

  onDelete(id: any) {
    let payload = {
      "_id": id
    }

    this.formService.deleteTask(payload).subscribe(res => {
      this.gettasklist()
      //this.toster.success("Successfully deleted", '', { timeOut: 6000, positionClass: "toast-top-center", disableTimeOut: true, tapToDismiss: true, closeButton: true, extendedTimeOut: 0 })
      return false;
    }, err => {
      console.log( err)
    })

  }
}
