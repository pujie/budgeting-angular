## getvendor

  - get a vendor by vendor's id
  - accept id of the vendor
  - method: GET
  - return an object of vendor
  ### syntax : 

```sh
getvendor/:vendor_id
```
  ### example
  ####  in browser
```sh
http://servername:port/getvendor/1
```
  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getvendor/1')
obj.subscribe(
data=>{},
err=>{}
)
```


## getvendors

  - get a list of all active vendors
  - no parameters accepted
  - method: GET
  - return a list of vendor object

  ### syntax : 

```sh
getvendors
```
  ### example
  ####  in browser
```sh
http://servername:port/getvendors
```
  #### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
obj = http.get<any[]>('http://servername:port/getvendors')
obj.subscribe(
data=>{},
err=>{}
)
```


## getvendorpage

  - get a list of vendor with limit
  - accept index of the vendor list and vendor amount  
  - method: GET
  - return an array of vendor object

  ### syntax : 

```sh
getvendorpage/:vendor_index/:vendor_amount
```
  ### example
  ####  in browser
```sh
http://servername:port/getvendorpage/0/10
```
will return a list of vendor from index 0 to index 9 (if exists)

  #### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
obj = http.get<any[]>('http://servername:port/getvendorpage/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```


## setvendoractive

  - set a vendor status to active ('0') or non active ('0') 
  - accept id of the vendor and status value ('1', or '0')  
  - method: GET
  - return transaction information 

  ### syntax : 

```sh
setvendoractive/:vendor_index/:vendor_status
```
  ### example

  ####  in browser

```sh
http://servername:port/setvendoractive/1/1
```

will set vendor with id 1 to active (status='1')

  #### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/setvendoractive/1/1')
obj.subscribe(
data=>{},
err=>{}
)
```



## savevendor

  - insert a vendor into database
  - accept an object of vendor, which consist of (name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample,createuser)
  - the default value of status is '1' (active)
  - method: POST
  - return transaction information 

### syntax : 

```sh
savevendor
```
### example
####  in curl
```sh
curl -d "name=padinet&address=mayjen sungkono 83&phone=031-123456&bankaccount=9988776655&namecard=&offeringsample=&invoicesample=&receiptsample=&createuser=anonymous" -X POST http://servername:port/savevendor
```
will set vendor with id 1 to active (status='1')

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
vendor = {
  name:'padinet',
  address:'mayjen sungkono 83',
  phone:'031-123456',
  bankaccount:'9988776655',
  namecard:'',
  offeringsample:'',
  invoicesample:'',
  receiptsample:'',
  createuser:'anonymous'
}
obj = http.post<any>('http://servername:port/savevendor',vendor)
obj.subscribe(
data=>{},
err=>{}
)
```


## updatevendor

  - update a vendor
  - accept an object of vendor, which consist of (id,name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample,createuser)
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
updatevendor
```
  ### example
  ####  in curl
```sh
curl -d "id=1&name=padinet&address=mayjen sungkono 83&phone=031-123456&bankaccount=9988776655&namecard=&offeringsample=&invoicesample=&receiptsample=&createuser=anonymous" -X POST http://servername:port/updatevendor
```
will set update the vendor with id 1

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
vendor = {
  id:1,
  name:'padinet',
  address:'mayjen sungkono 83',
  phone:'031-123456',
  bankaccount:'9988776655',
  namecard:'',
  offeringsample:'',
  invoicesample:'',
  receiptsample:'',
  createuser:'anonymous'
}
obj = http.post<any>('http://servername:port/updatevendor',vendor)
obj.subscribe(
data=>{},
err=>{}
)
```









## getvendorcount

  - get amount of vendors
  - method: GET
  - return amount of vendor 

  ### syntax : 

```sh
getvendorcount
```
  ### example
  ####  in browser
```sh
http://servername:port/getvendorcount
```


  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getvendorcount')
obj.subscribe(
data=>{},
err=>{}
)
```

## searchvendor

    - search vendors with parameter : searchData,pageIndex,and pageSize
    - method : POST
    - return :list of vendors

### syntax :

```sh
searchvendor
```

### example :

#### curl :

```sh
curl -d "searchData=&pageIndex=0&pageSize=10"  -X POST http://servername:port/searchvendor
```

#### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
vendor = {
    searchData:'lintas buwana',
    pageIndex:1,
    pageSize:10
}
obj = http.post<any[]>('http://servername:port/searchvendor',vendor)
obj.subscribe(
data=>{},
err=>{}
)
```


## searchvendorcount

    - search vendors with parameters : searchData
    - method : POST
    - return :list of vendors
    
### syntax :

```sh
searchvendor
```

### example :

#### curl :

```sh
curl -d "searchData="  -X POST http://servername:port/searchvendorcount
```

#### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
vendor = {
    searchData:'lintas buwana'
}
obj = http.post<any[]>('http://servername:port/searchvendorcount',vendor)
obj.subscribe(
data=>{},
err=>{}
)
```

