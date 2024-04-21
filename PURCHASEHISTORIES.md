## savepurchasehistory

  - save purchase history 
  - accept an object of submission_detail_id,product_name,vendor_name,submission_date,implementation_target,createuser
  - method: POST
  - return the transaction status

  ### syntax : 

```sh
savepurchasehistory
```
  ### example
  ####  in curl
```sh
curl -d "submission_detail_id=1&product_name=AC&vendor_name=ABC&submission_date=2018-8-17&implementation_target=2018-8-17&createuser=anonymous" -X POST http://servername:port/savepurchasehistory
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
hist = {
  submission_detail_id:1,
  product_name:"AC",
  vendor_name:"ABC",
  submission_date:"2018-8-17",
  implementation_target:"2018-8-17",
  createuser:"anonymous"
}
obj = http.post<any>('http://servername:port/savepurchasehistory',hists)
obj.subscribe(
data=>{},
err=>{}
)
```



## getpurchasehistory

  - get purchase history by submission_detail_id
  - accept an object of submission_detail_id
  - method: POST
  - return a list of purchasehistories 

  ### syntax : 

```sh
getpurchasehistory
```
  ### example
  ####  in curl
```sh
curl -d "submission_detail_id=1" -X POST http://servername:port/getpurchasehistory
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
hist = {
  submission_detail_id:1
}
obj = http.post<any>('http://servername:port/getpurchasehistory',hists)
obj.subscribe(
data=>{},
err=>{}
)
```


## getpurchasehistorybysubmission

  - get purchase history by submission_id
  - accept an object of submission_id
  - method: POST
  - return a list of purchasehistories 

  ### syntax : 

```sh
getpurchasehistory
```
  ### example
  ####  in curl
```sh
curl -d "submission_id=1" -X POST http://servername:port/getpurchasehistorybysubmission
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
hist = {
  submission_detail_id:1
}
obj = http.post<any>('http://servername:port/getpurchasehistorybysubmission',hists)
obj.subscribe(
data=>{},
err=>{}
)
```


## updatepurchasehistory

  - update purchase history by submission_detail_id
  - parameters : submission_detail_id,product_name,vendor_name,submission_date,implementation_target,createuser
  - method: POST
  - return a transaction status 

  ### syntax : 

```sh
getpurchasehistory
```
  ### example
  ####  in curl
```sh
curl -d "submission_detail_id=1&product_name=xyz&vendor_name=abc&submission_date=2018-8-17&implementation_target=2018-8-17&createuser=anon" -X POST http://servername:port/updatepurchasehistory
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
hist = {
  submission_detail_id:1,
  product_name:"xyz",
  vendor_name:"abc",
  submission_date:"2018-8-17",
  implementation_target:"2018-8-17",
  createuser:"anon"
}
obj = http.post<any>('http://servername:port/updatepurchasehistory',hists)
obj.subscribe(
data=>{},
err=>{}
)
```