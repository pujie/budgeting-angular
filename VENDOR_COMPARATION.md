## getsubmissiondetailvendor

### method

GET

### syntax


```sh
http://servername:port/getsubmissiondetailvendor/:submission_detail_id
```

### example curl

curl  http://servername:port/getsubmissiondetailvendor/1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/getsubmissiondetailvendor/1')
obj.subscribe(
data=>{},
err=>{}
)
```

will retrieve all vendors  with submission_detail_id=1


## savesubmissiondetailvendor

### syntax


```sh
http://servername:port/savesubmissiondetailvendor
```

### example curl

curl -d 'submission_detail_id=1&vendor_id=1&price=1000000&ppn=100000&ongkir=50000&createuser=yenni' -X POST http://servername:port/savesubmissiondetailvendor


#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
myobject = {
  submission_detail_id:1,
  vendor_id:1,
  price:1000000,
  ppn:100000,
  ongkir:50000,
  createuser:'yenni'
}
obj = http.post<any>('http://servername:port/savesubmissiondetailvendor',myobject)
obj.subscribe(
data=>{},
err=>{}
)
```


## removesubmissiondetailvendor

### syntax


```sh
http://servername:port/removesubmissiondetailvendor
```

### example curl

curl -d 'submission_detail_id=1&vendor_id=1' -X POST http://servername:port/removesubmissiondetailvendor

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
myobject = {
  submission_detail_id:1,
  vendor_id:1
}
obj = http.post<any>('http://servername:port/removesubmissiondetailvendor',myobject)
obj.subscribe(
data=>{},
err=>{}
)
```
