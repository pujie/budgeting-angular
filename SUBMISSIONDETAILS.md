## getallsubmissiondetailpage

  - get all submission  details with status="2" 
  - accept params: status,pageIndex and pageSize
  - method: GET
  - return list of submissiondetails with given status

### syntax : 

```sh
http://servername:port/getallsubmissiondetailpage
```
### example

####  in browser
```sh
http://servername:port/getallsubmissiondetailpage/1/0/10

```
will return 10 rows (if exists) of submissiondetail from index 0 with status '1' (active)

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getallsubmissiondetailpage/1/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```




## getallsubmissiondetailcount

  - get all submission  details
  - accept params: status
  - method: GET
  - return amount of submissiondetails

### status
0: removed

1: proposed

2: accepted

3: rejected

4: realization


### syntax : 

```sh
http://servername:port/getallsubmissiondetailcount/:status
```
### example

####  in browser
```sh
http://servername:port/getallsubmissiondetailcount/1

```
will return the amount of all submissiondetail with given status

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getallsubmissiondetailcount/1')
obj.subscribe(
data=>{},
err=>{}
)
```











## getallsubmissiondetails

  - get all submission  details
  - accept params: none
  - method: GET
  - return a list of all submissiondetails

### syntax : 

```sh
http://servername:port/getallsubmissiondetails
```
### example

####  in browser
```sh
http://servername:port/getallsubmissiondetails

```
will return a list of all submissiondetails

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getallsubmissiondetails')
obj.subscribe(
data=>{},
err=>{}
)
```






## updatesubmissiondetail

  - update submission by submission's id
  - accept itemname,brand,partnumber,description,proposed_vendor,amount,proposed_price,proposed_totalprice,vendor,price,totalprice,ppn,ongkir,information,purchase_reason,placement_location,vendor_comparation,id of the submission_details
  - method: POST
  - return the update status

### syntax : 

```sh
http://servername:port/updatesubmissiondetail
```
### example

####  in curl
```sh
curl -d 'itemname=test&brand=National&partnumber=123344&description=test&proposed_vendor=Lintas ARta&amount=200&proposed_price=4500000&proposed_totalprice=90000000&vendor=LinsatAr ta&price=70000000&totalprice=70000000&ppn=7000000&ongkir=50000&information=test&purchase_reason=for client&placement_location=client&vendor_comparation=test&id=1' -X POST http://localhost:2018/updatesubmissiondetail
```
will update submission_details with given params

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
submissiondetail = {
  itemname:'test',
  brand:'National',
  partnumber:'123344',
  description:'test',
  proposed_vendor:'Lintas ARta',
  amount:200,
  proposed_price:4500000,
  proposed_totalprice:90000000,
  vendor:'LinsatAr ta',
  price:70000000,
  totalprice:70000000,
  ppn:7000000,
  ongkir:50000,
  information:'test',
  purchase_reason:'for client',
  placement_location:'client',
  vendor_comparation:'test',
  id:1
}
obj = http.post<any>('http://servername:port/updatesubmissiondetail',submissiondetail)
obj.subscribe(
data=>{},
err=>{}
)
```


## setsubmissiondetailstatus

  - set the status of a submission detail
  - accept status of the submission detail and id of the submission detail
  - method: GET
  - return the transaction status

### syntax : 

```sh
http://servername:port/setsubmissiondetailstatus/:id/:status
```
### example

####  in browser
```sh
http://servername:port/setsubmissiondetailstatus/1/1
```
will set the status of submission detail with id 1 to '1' 

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/setsubmissiondetailstatus/1/1')
obj.subscribe(
data=>{},
err=>{}
)
```



## getsubmissiondetails

  - get all submission details by id of submission
  - accept id of submission
  - method: GET
  - return a list of submission details

### syntax : 

```sh
getsubmissiondetails/:submission_id
```
### example

####  in browser
```sh
http://servername:port/getsubmissiondetails/1
```
will return a list of submission details  (if exists) with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissiondetails/1')
obj.subscribe(
data=>{},
err=>{}
)
```


## getsubmissiondetail

  - get submission details by id of submission_detail
  - accept id of submission_detail
  - method: GET
  - return a submission detail

### syntax : 

```sh
getsubmissiondetails/:submission_detail_id
```
### example

####  in browser
```sh
http://servername:port/getsubmissiondetail/1
```
will return a submission detail  (if exists) with submission_detail_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissiondetail/1')
obj.subscribe(
data=>{},
err=>{}
)
```

## updaterejectreason

  - update column reject_reason in table submission_details by id of submission_detail
  - accept id of submission_detail
  - method: POST
  - return transaction status

### syntax : 

```sh
updaterejectreason
```
### example

####  in browser
```sh
curl -d {id=1&reject_reason=something bad} -X POST http://servername:port/updaterejectreason
```
will update column reject_reason in table submission_details  with id = 1  

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
myobj = {id:1,reject_reason:'something bad'}
obj = http.post<any>('http://servername:port/updaterejectreason',myobj)
obj.subscribe(
data=>{},
err=>{}
)
```



## getsubmissiondetailpage

  - get detail of submission by submission's id
  - accept id of the submission
  - method: GET
  - return an object of submission_details

### syntax : 

```sh
getsubmissiondetailpage/:submission_id/:pageIndex/:pageSize
```
### example

####  in browser
```sh
http://servername:port/getsubmissiondetailpage/1/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissiondetailpage/1/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```


## getsubmissiondetailcount

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
getsubmissiondetailcount/:submission_id
```
### example

####  in browser
```sh
http://servername:port/getsubmissiondetailcount/1
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissiondetailcount/1')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchsubmissiondetail

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
http://servername:port/searchsubmissiondetail/:searchData/:subimssion_id/pageIndex/pageDetail
```
### example

####  in browser
```sh
http://servername:port/searchsubmissiondetail/abc/1/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchsubmissiondetail/abc/1/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchSubmissiondetailcount

  - get amount of submission  detail by submission's id
  - accept id of the submission
  - method: GET
  - return the amount of submission_details

### syntax : 

```sh
http://servername:port/searchSubmissiondetailcount/:searchData/:subimssion_id
```
### example

####  in browser
```sh
http://servername:port/searchSubmissiondetailcount/abc/1
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchSubmissiondetailcount/abc/1')
obj.subscribe(
data=>{},
err=>{}
)
```





## savesubmissiondetail

  - save a submission  detail
  - accept params
  - method: POST
  - return status of the transaction

### syntax : 

```sh
http://servername:port/savesubmissiondetail
```
### example

####  in curl
```sh
curl -d "submission_id=1&product_id=1&vendor_id=1&itemname=item 1&brand=loggo&partnumber=1122&description=sepatu boot&proposed_vendor=vlogo&amount=10&proposed_price=120000&proposed_totalprice=1000000&information=test&purchase_reason=Boot for TS team&placement_location=field team&vendor_comparation=abc&createuser=puji" -X POST http://servername:port/savesubmissiondetail

```


#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
subm_detail = {
  submission_id:1,
  product_id:1,
  vendor_id:1,
  itemname:item 1,
  brand:loggo,
  partnumber:1122,
  description:sepatu boot,
  proposed_vendor:vlogo,
  amount:10,
  proposed_price:120000,
  proposed_totalprice:1000000,
  information:test,
  purchase_reason:Boot for TS team,
  placement_location:field team,
  vendor_comparation:abc,
  createuser:puji
}
obj = http.post<any>('http://servername:port/savesubmissiondetail',subm_detail)
obj.subscribe(
data=>{},
err=>{}
)
```


