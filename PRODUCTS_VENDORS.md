## associate_product_vendor

  - associate product and vendor
  - accept an object of product_id, vendor_id, and createuser
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
associate_product_vendor
```
  ### example
  ####  in curl
```sh
curl -d "product_id=1&vendor_id=1&createuser=anonymous" -X POST http://servername:port/associate_product_vendor
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
product = {
  product_id:1,
  vendor_id:1,
  createuser:anonymous
}
obj = http.post<any>('http://servername:port/associate_product_vendor',product)
obj.subscribe(
data=>{},
err=>{}
)
```


## disassociate_product_vendor

  - associate product and vendor
  - accept an object of product_id and vendor_id
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
disassociate_product_vendor
```
  ### example
  ####  in curl
```sh
curl -d "product_id=1&vendor_id=1" -X POST http://servername:port/disassociate_product_vendor
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
product = {
  product_id:1,
  vendor_id:1,
}
obj = http.post<any>('http://servername:port/disassociate_product_vendor',product)
obj.subscribe(
data=>{},
err=>{}
)
```

## removeallassociatedvendors

 - remove all vendors associated with certain product
 - accept id of a product

### syntax

```sh
removeallassociatedvendors/:product_id
```

### example

#### browser
```sh
http://servername:port/removeallassociatedvendors/1
```
will remove all vendors, which have product_id=1

#### angular

```sh
obj : Observable<any[]>
http : HttpClient
obj = http.get<any[]>('http://servername:port/removeallassociatedvendors/1')
obj.subscribe(
data=>{},
err=>{}
)
```


## removeallassociatedproducts
 - remove all products associated with certain vendor
 - accept id of a vendor

### syntax

```sh
removeallassociatedproducts/:vendor_id
```

### example

#### browser
```sh
http://servername:port/removeallassociatedproducts/1
```
will remove all products, which have vendor_id=1

#### angular

```sh
obj : Observable<any[]>
http : HttpClient
obj = http.get<any[]>('http://servername:port/removeallassociatedproducts/1')
obj.subscribe(
data=>{},
err=>{}
)
```



## getproductbyvendor

  - get products based on vendor_id
  - accept an object of product_id
  - method: POST
  - return list of products based on vendor_id 

  ### syntax : 

```sh
getproductbyvendor
```
  ### example
  ####  in curl
```sh
curl -d "vendor_id=1" -X POST http://servername:port/getproductbyvendor
```

  #### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
vendor = {
  vendor_id:1,
}
obj = http.post<any[]>('http://servername:port/getproductbyvendor',vendor)
obj.subscribe(
data=>{},
err=>{}
)
```





## getvendorbyproduct

  - get vendors based on product_id
  - accept an object of product_id
  - method: POST
  - return list of vendors based on product_id 

  ### syntax : 

```sh
getvendorbyproduct
```
  ### example
  ####  in curl
```sh
curl -d "product_id=1" -X POST http://servername:port/getvendorbyproduct
```

  #### angular Observable
```sh
obj : Observable<any[]>
http : HttpClient
product = {
  product_id:1,
}
obj = http.post<any[]>('http://servername:port/getvendorbyproduct',product)
obj.subscribe(
data=>{},
err=>{}
)
```


