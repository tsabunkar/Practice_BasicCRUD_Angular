import { Component } from '@angular/core';
import {HttpClientService} from "./HttpClientServices/http-client.service";
import {CProduct} from "./dto/CProduct";
import {IProduct} from "./IProduct/IProduct";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getAllResultData: IProduct[];
  postResultData : IProduct;
  errorMess : string;
  deletedResultData : string;
  putResultData : string;
  getParticularData : IProduct;


  constructor(private _myHttpService : HttpClientService){}

//IProduct Interface is used as data type to be specific instead os using any data type for products
  getAllData() : void{
    this._myHttpService.getAllMyData_Service()
      .subscribe(
        (args : IProduct[]) => {
          console.log("Value of Get request is  : "+args);
          this.getAllResultData = args;
        },
        errorArgs => {
          console.log("Error has occured :")
          console.log(errorArgs)
        }
      )
  }


  getParticularProduct():void{
    let myId  : number =1;
    this._myHttpService.getParticularProducts_Service_FromBackend(myId)
      .subscribe(
        (arg : IProduct) => {
          console.log(arg)
          this.getParticularData = arg
        }
        , err => this.errorMess
      )
  }


  postData() : void {

    let prod    = new CProduct();
    prod.productIdSetter = 9;
    prod.productNameSetter = "dummy1";
    prod.productCodeSetter = "GND-124";
    prod.productAvaliableDateSetter = "March 13, 2018";
    prod.priceSetter = 3500;
    prod.productRatingSetter = 3;
    prod.productImageSetter = "https://i.imgur.com/sJUpSpt.jpg";

    this._myHttpService.postMyData_Service(prod)
      .subscribe( (arg : IProduct) => {
          console.log(arg);
          this.postResultData = arg;
        },
        errorArgs => {
          console.log("Error has occured  :")
          console.log(errorArgs)
          this.errorMess = errorArgs;

        })
  }


  deleteData(): void{
    let idToDelete : number =9;
    this._myHttpService.deleteMyData_Service(idToDelete)
      .subscribe( arg =>{
        this.deletedResultData = arg
        console.log(arg)
      }, err => this.errorMess = err)

  }


  putData(): void{

    let jsonDataToPut : any =  {
     // productId : 1,
      price: 8000,
      productAvaliableDate: "March 12, 2018",
      productCode: "GND-123",
      productImage: "https://i.imgur.com/sJUpSpt.jpg",
      productName: "Hammer1111",
      productRating: 4
    }

    let idToPut : number = 9;
    this._myHttpService.putMyData_Service(idToPut, jsonDataToPut)
      .subscribe( arg => {
          console.log(arg)
          this.putResultData = arg
        }
        , err => this.errorMess
      )
  }





}
