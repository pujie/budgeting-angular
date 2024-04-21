
## getvendorpics

  - get all vendor's pic with certain vendor_id 
  - accept params: vendor_id
  - method: GET
  - return list of vendor_pics with given vendor_id

### syntax : 

```sh
http://servername:port/getvendorpics/:vendor_id
```
### example

####  in browser
```sh
http://servername:port/getvendorpics/1

```
will return rows (if exists) of vendor_pics having vendor_id=1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getvendorpics/1')
obj.subscribe(
data=>{},
err=>{}
)
```



### syntax : 

```sh
http://servername:port/savevendorpic
```
### example

####  curl
```sh
curl -d 'vendor_id=1,name=Agus,phone=0888112233,email=agus@gmail.com,role=Accounting Manager' -X POST http://servername:port/savevendorpic

```
will save a vendor_pic and returns transaction status

#### angular Observable

```sh
pic = {
    vendor_id:1,name:'Agus',phone:'0888112233',email:'agus@gmail.com',role:'Accounting Manager'
}
obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/savevendorpic',pic)
obj.subscribe(
data=>{},
err=>{}
)
```


## updatevendorpic

  - update a vendor's pic with certain id 
  - accept params: id,name,phone,email,role
  - method: POST
  - return transaction status

### syntax : 

```sh
http://servername:port/updatevendorpic
```
### example

####  curl
```sh
curl -d 'id=1,name=Agus,phone=0888112233,email=agus@gmail.com,role=Accounting Manager' -X POST http://servername:port/updatevendorpic

```
will returns transaction status

#### angular Observable

```sh
pic = {
    id:1,name:'Agus',phone:'0888112233',email:'agus@gmail.com',role:'Accounting Manager'
}
obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/updatevendorpic',pic)
obj.subscribe(
data=>{},
err=>{}
)
```



deleteVendorPic
parameter : id
method : get


## deletevendorpic

  - delete a vendor's pic with certain id 
  - accept params: id
  - method: GET
  - return transaction status

### syntax : 

```sh
http://servername:port/deletevendorpic
```
### example

####  browser
```sh
curl http://servername:port/deletevendorpic/1

```
will delete a vendor_pic with certain id and returns transaction status

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/deletevendorpic/1')
obj.subscribe(
data=>{},
err=>{}
)
```

