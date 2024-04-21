

## getproductimages

  - get all product's images with certain product_id 
  - accept params: product_id
  - method: GET
  - return list of product_images with given product_id

### syntax : 

```sh
http://servername:port/getproductimages/:product_id
```
### example

####  in browser
```sh
http://servername:port/getproductimages/1

```
will return rows (if exists) of product_images having product_id=1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getproductimages/1')
obj.subscribe(
data=>{},
err=>{}
)
```



### syntax : 

```sh
http://servername:port/saveproductimage
```
### example

####  curl
```sh
curl -d 'product_id=1,image=blabla,imagetype=gambar tampak depan' -X POST http://servername:port/saveproductimage

```
will save a product_image and returns transaction status

#### angular Observable

```sh
image = {
    product_id:1,image:'blabla',imagetype:'gambar tampak depan'
}
obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/saveproductimage',image)
obj.subscribe(
data=>{},
err=>{}
)
```


## updateproductimage

  - update a product's image with certain id 
  - accept params: id,image
  - method: POST
  - return transaction status

### syntax : 

```sh
http://servername:port/updateproductimage
```
### example

####  curl
```sh
curl -d 'id=1&image=blabla&imagetype=gambar tampak depan' -X POST http://servername:port/updateproductimage

```
will returns transaction status

#### angular Observable

```sh
image = {
    id:1,image:'blabla',imagetype:'gambar tampak depan'
}
obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/updateproductimage',image)
obj.subscribe(
data=>{},
err=>{}
)
```




## deleteproductimage

  - delete a product's image with certain id 
  - accept params: id
  - method: GET
  - return transaction status

### syntax : 

```sh
http://servername:port/deleteproductimage
```
### example

####  browser
```sh
curl http://servername:port/deleteproductimage/1

```
will delete a product_image with certain id and returns transaction status

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/deleteproductimage/1')
obj.subscribe(
data=>{},
err=>{}
)
```

