import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../Service/AppSetting'

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
 url : any ='http://192.168.179.1:8080/api/v1'
  constructor(
    private http: HttpClient,
        private router: Router,
  ) { }

  //url=AppSettings.API_ENDPOINT;

  signUpDataSave(sapId : string){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    var sapIdObj={"json":sapId};
    return this.http.post(this.url+"/signUpDataSave",sapId , { headers }).pipe(map(res => {
      console.log("getFormDataWithSession==>",JSON.stringify(res));
      return res as any;
    },(error: any) => {
      return error as any;
    }))
  }

  loginCheck(sapId : string){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    var sapIdObj={"json":sapId};
    return this.http.post(this.url+"/loginCheck",sapId , { headers }).pipe(map(res => {
      console.log("getFormDataWithSession==>",JSON.stringify(res));
      return res as any;
    },(error: any) => {
      return error as any;
    }))
  }

  getCategory(sapId : string){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    let arr =[];
    var sapIdObj={"json":sapId};
    return this.http.post(this.url+"/getCategory",sapId , { headers }).pipe(map(res => {
      console.log("getFormDataWithSession==>",JSON.stringify(res));
      JSON.stringify(res);
      
      
      let resList= JSON.parse(JSON.stringify(res))
      
        for (var i = 0; i < resList.length; i++) {
          for (var key in resList[i]) {
            if (key.toLowerCase() !== key) {
              resList[i][key.toLowerCase()] = resList[i][key];
              delete resList[i][key];
            }
          }
        }
        let json = { "rows": resList };
        console.log(json,"-==========");
        
        return json as any;
    },(error: any) => {
      return error as any;
    }))
  }


  uploadDocument(formData:FormData): Observable<any>{
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    return this.http.post(this.url + '/uploadDocument', formData, { headers }).pipe(map(res => {
      return res as any;
    }, (error : any) => {
      return error as any;
    }))
  }


  loginData(sapId : string){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    let arr =[];
    var sapIdObj={"json":sapId};
    return this.http.post(this.url+"/loginData",sapId , { headers }).pipe(map(res => {
      console.log("getFormDataWithSession==>",JSON.stringify(res));
      JSON.stringify(res);
      
      
      let resList= JSON.parse(JSON.stringify(res))

        let json = { "rows": resList };
        console.log(json,"-==========");
        
        return json as any;
    },(error: any) => {
      return error as any;
    }))
  }
  
  saveTaks(qry:any){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    return this.http.post(this.url + '/savetaskdata', qry, { headers }).pipe(map(res => {
      return res as any;
    }, (error : any) => {
      return error as any;
    }))
  }

  getSavedData(userid:any){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    return this.http.post(this.url + '/getsaveddata', userid,{ headers }).pipe(map(res => {
      return res as any;
    }, (error : any) => {
      return error as any;
    }))
  }

  deleteTask(qry:any){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    return this.http.post(this.url + '/deletelist', qry,{ headers }).pipe(map(res => {
      return res as any;
    }, (error : any) => {
      return error as any;
    }))
  }

  updateList(qry:any){
    const headers = new HttpHeaders()
    headers.append('application/json', 'Content-Type')
    return this.http.post(this.url + '/updatelist', qry,{ headers }).pipe(map(res => {
      return res as any;
    }, (error : any) => {
      return error as any;
    }))
  }

  

}
