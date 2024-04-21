## getproduct

  - get a product by product's id
  - accept id of the product
  - method: GET
  - return an object of product
  ### syntax : 

```sh
getproduct/:product_id
```
  ### example
  ####  in browser
```sh
http://servername:port/getproduct/1
```
  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getproduct/1')
obj.subscribe(
data=>{},
err=>{}
)
```


## getproducts

  - get a list of all active products
  - no parameters accepted
  - method: GET
  - return a list of product object

  ### syntax : 

```sh
getproducts
```
  ### example
  ####  in browser
```sh
http://servername:port/getproducts
```
  #### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
obj = http.get<any[]>('http://servername:port/getproducts')
obj.subscribe(
data=>{},
err=>{}
)
```


## getproductpage

  - get a list of product with limit
  - accept index of the product list and product amount  
  - method: GET
  - return an array of product object

  ### syntax : 

```sh
getproductpage/:product_index/:product_amount
```
  ### example
  ####  in browser
```sh
http://servername:port/getproductpage/0/10
```
will return a list of product from index 0 to index 9 (if exists)

  #### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
obj = http.get<any[]>('http://servername:port/getproductpage/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```


## setproductactive

  - set a product status to active ('0') or non active ('0') 
  - accept id of the product and status value ('1', or '0')  
  - method: GET
  - return transaction information 

  ### syntax : 

```sh
setproductactive/:product_index/:product_status
```
  ### example
  ####  in browser
```sh
http://servername:port/setproductactive/1/1
```
will set product with id 1 to active (status='1')

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/setproductactive/1/1')
obj.subscribe(
data=>{},
err=>{}
)
```



## saveproduct

  - insert a product into database
  - accept an object of product, which consist of (category_id,name,partnumber,unit,createuser)
  - the default value of status is '1' (active)
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
saveproduct
```
  ### example
  ####  in curl
```sh
curl -d "category_id=1&name=laptop&partnumber=1122 3344 5566&unit=buah&createuser=anonymous" -X POST http://servername:port/saveproduct
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
product = {
  category_id:1,
  name:laptop,
  partnumber:1122 3344 5566,
  unit:buah,
  createuser:anonymous
}
obj = http.post<any>('http://servername:port/saveproduct',product)
obj.subscribe(
data=>{},
err=>{}
)
```


## updateproduct

  - update a product
  - accept an object of product, which consist of (product_id,category_id,name,partnumber,unit,createuser)
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
updateproduct
```
  ### example
  ####  in curl
```sh
curl -d "id=1&category_id=1&name=laptop&partnumber=1122 3344 5566&unit=buah&createuser=anonymous" -X POST http://servername:port/updateproduct
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
product = {
  id:1,
  category_id:1,
  name:laptop,
  partnumber:1122 3344 5566,
  unit:buah,
  createuser:anonymous
}
obj = http.post<any>('http://servername:port/updateproduct',product)
obj.subscribe(
data=>{},
err=>{}
)
```









## getproductcount

  - get amount of products
  - method: GET
  - return amount of product 

  ### syntax : 

```sh
getproductcount
```
  ### example
  ####  in browser
```sh
http://servername:port/getproductcount
```


  #### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getproductcount')
obj.subscribe(
data=>{},
err=>{}
)
```

## searchproduct

    - search products with parameters : searchData,pageIndex,and pageSize
    - method : POST
    - return :list of products
    
### syntax :

```sh
searchproduct
```

### example :

#### curl :

```sh
curl -d "searchData=&pageSize=10&pageIndex=0"  -X POST http://servername:port/searchproduct
```

#### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
product = {
  searchData:'',
  pageIndex:1,
  pageSize:10
}
obj = http.post<any[]>('http://servername:port/searchproduct',product)
obj.subscribe(
data=>{},
err=>{}
)
```


## searchproductcount

    - search products with parameters : searchData
    - method : POST
    - return :list of products
    
### syntax :

```sh
searchproductcount
```

### example :

#### curl :

```sh
curl -d "searchData=&pageIndex=&pageSize=="  -X POST http://servername:port/searchproductcount
```

#### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
product = {
  searchData:'',
  pageIndex:0,
  pageSize:10
}
obj = http.post<any[]>('http://servername:port/searchproductcount',product)
obj.subscribe(
data=>{},
err=>{}
)
```

## getproductbycategory

    - search products with parameters : category_id
    - method : POST
    - return :list of products with matched category_id
    
### syntax :

```sh
getproductbycategory
```

### example :

#### curl :

```sh
curl -d "category_id=1"  -X POST http://servername:port/getproductbycategory
```

#### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
product = {
  category_id:''
}
obj = http.post<any[]>('http://servername:port/getproductbycategory',product)
obj.subscribe(
data=>{},
err=>{}
)
```
