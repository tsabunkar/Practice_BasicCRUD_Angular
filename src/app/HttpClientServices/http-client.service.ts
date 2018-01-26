import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CProduct} from "../dto/CProduct";
import {IProduct} from "../IProduct/IProduct";

@Injectable()
export class HttpClientService {

  //for HttpClient we must import HttpClientModule in app.module.ts file
  constructor(private  _http : Http,private _httpClient : HttpClient) { }

  getAllMyData_Service(): Observable<IProduct[]>{

    return    this._http.get("http://localhost:8081/OnlineShoppingRestApi/webapi/productslist")
                      .map((resp : Response) => resp.json())
                      .do(args => console.log('getAllData is : '+ JSON.stringify(args)))
                       .catch(this.handleMyErrorFun)
  }



  _productUrl ="  http://localhost:8081/OnlineShoppingRestApi/webapi/productslist";

  getParticularProducts_Service_FromBackend(prodId : number) : Observable<IProduct> {

    return this._httpClient
      .get<IProduct>(this._productUrl +"/"+ prodId)
      .do(args => console.log("My data recieved from backend is :"+ JSON.stringify(args)))
      .catch(this.handleMyErrorFun);
  }



  postMyData_Service(prod : CProduct) : Observable<IProduct>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let myOptions = new RequestOptions({ headers: headers });

    //or

    /*    let headers = new Headers();
     headers.append( 'Content-Type', 'application/json' );
     let myOptions = new RequestOptions({ headers: headers });*/

    return this._http
      .post("http://localhost:8081/OnlineShoppingRestApi/webapi/productslist"
        ,prod,myOptions)
      .map( (resp : Response) => resp.json())
      .do(args => console.log('Post data recieved  is : '+ JSON.stringify(args)))
      .catch(this.handleMyErrorFun)

    //Since I am not return anything from backend soo dont' use map() fucn
  }




  deleteMyData_Service(idToDelete : number) : Observable<string>  {

    return this._http.delete("http://localhost:8081/OnlineShoppingRestApi/webapi/productslist"+ "/" + idToDelete)
      .map((resp: Response) => resp.text())
  }




  putMyData_Service(idToPut: number, jsonDataToPut: any) : Observable<string> {

    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    let myOptions = new RequestOptions({ headers: headers });

    return this._http.put("http://localhost:8081/OnlineShoppingRestApi/webapi/productslist" + "/"+ idToPut,
      jsonDataToPut,myOptions)
      .map((resp: Response) => resp.text())
  }



  handleMyErrorFun(httpErrorResponseObj : HttpErrorResponse) {
    console.log("Error has occured in service class");
    console.log(httpErrorResponseObj.message);
    return Observable.throw(httpErrorResponseObj.message);

  }


  /* private extractData(response : Response) {
     let body = response.json();
     return body.data || {};
   }
 */



}

