## savepayment

  - save a payment
  - accept an object of payment, which consist of (id_submission_detail,payment_type,amount,payment_date,createuser)
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
savepayment
```
  ### example
  ####  in curl
```sh
curl -d 'id_submission_detail=1&payment_type=cash&amount=1&payment_date=2018-8-17&createuser=puji' -X POST http://delima.padinet.com:2018/savepayment
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
payment = {
    id_submission_detail:1,
    payment_type:'cash',
    amount:1,
    payment_date:'2018-8-17',
    createuser:'puji'
}
obj = http.post<any>('http://servername:port/savepayment',payment)
obj.subscribe(
data=>{},
err=>{}
)
```








## updatepayment

  - update a payment
  - accept an object of payment, which consist of (id,id_submission_detail,payment_type,amount,payment_date,createuser)
  - method: POST
  - return transaction information 

  ### syntax : 

```sh
updatepayment
```
  ### example
  ####  in curl
```sh
curl -d 'id=1&id_submission_detail=1&payment_type=cash&amount=1&payment_date=2018-8-17&createuser=puji' -X POST http://delima.padinet.com:2018/updatepayment
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
payment = {
    id:1,
    id_submission_detail:1,
    payment_type:'cash',
    amount:1,
    payment_date:'2018-8-17',
    createuser:'puji'
}
obj = http.post<any>('http://servername:port/updatepayment',payment)
obj.subscribe(
data=>{},
err=>{}
)
```















## getpayment

  - get a payment
  - accept an object of payment, which consist of (id)
  - method: POST
  - return a row of payment (if exists) 

  ### syntax : 

```sh
getpayment
```
  ### example
  ####  in curl
```sh
curl -d 'id=1' -X POST http://delima.padinet.com:2018/getpayment
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
payment = {
    id:1
    }
obj = http.post<any>('http://servername:port/getpayment',payment)
obj.subscribe(
data=>{},
err=>{}
)
```











## getpayments

  - get all payments
  - accept none
  - method: GET
  - return a list of payments (if exists) 

  ### syntax : 

```sh
getpayments
```
  ### example
  ####  in browser
```sh
http://delima.padinet.com:2018/getpayments
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getpayments')
obj.subscribe(
data=>{},
err=>{}
)
```







## getpaymentsbysubmissionid

  - get all payments with given submission_id
  - accept id of submission
  - method: POST
  - return a list of payments with given submission_id (if exists) 

  ### syntax : 

```sh
getpaymentsbysubmissionid
```
  ### example
  ####  in curl
```sh
curl -d 'id=1' -X POST http://localhost:2018/getpaymentsbysubmissionid
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
submission = {
  id:1
}
obj = http.post<any>('http://servername:port/getpaymentsbysubmissionid',submission)
obj.subscribe(
data=>{},
err=>{}
)
```






## getPaymentsBySubmissionDetailId

  - get all payments with given submission_detail_id
  - accept id of submission
  - method: POST
  - return a list of payments with given submission_detail_id (if exists) 

  ### syntax : 

```sh
getPaymentsBySubmissionDetailId
```
  ### example
  ####  in curl
```sh
curl -d 'id=1' -X POST http://localhost:2018/getPaymentsBySubmissionDetailId
```

  #### angular Observable
```sh
obj : Observable<any>
http : HttpClient
submission_detail = {
  id:1
}
obj = http.post<any>('http://servername:port/getPaymentsBySubmissionDetailId',submission_detail)
obj.subscribe(
data=>{},
err=>{}
)
```





