## getsubmissionbyid

  - get a submission by id of submission
  - accept id of submission
  - method: GET
  - return a of submission

### syntax : 

```sh
getsubmissionbyid/:id
```
### example

####  in browser
```sh
http://servername:port/getsubmissionbyid/1
```
will return a row (if exists) with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissionbyid/1')
obj.subscribe(
data=>{},
err=>{}
)
```

## getsubmissionpage

  - get all submissions
  - accept status of submission (0:canceled,1:active/pending,2:active realization)
  - method: GET
  - return a list of getsubmissionpages

### syntax : 

```sh
getsubmissionpage/:status/:pageIndex/:pageSize
```
### example

####  in browser
```sh
http://servername:port/getsubmissionpage/1/0/10
```
will return ten rows (if exists) of active submissions start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissionpage/1/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```


## getsubmissioncount

  - get amount of submissions
  - accept status 
  - method: GET
  - return the amount of submissions of given status

### syntax : 

```sh
getsubmissioncount/:status
```
### example

####  in browser
```sh
http://servername:port/getsubmissioncount/1
```
will return amount of active submissions 

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getsubmissioncount/1')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchsubmission

  - get certain submission by given searchData
  - accept searchData of the submission, and status of the submission
  - method: GET
  - return a list of submissions

### syntax : 

```sh
http://servername:port/searchsubmission/:status/:searchData/:pageIndex/:pageSize
```
### example

####  in browser
```sh
http://servername:port/searchsubmission/:1/abc/0/10
```
will return ten rows (if exists) start from index 0, with submission_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchsubmission/1/abc/0/10')
obj.subscribe(
data=>{},
err=>{}
)
```




## searchsubmissioncount

  - get amount of submission  detail by submission's id
  - accept status of the submission and searchData
  - method: GET
  - return the amount of submissions with given status and searchData

### syntax : 

```sh
http://servername:port/searchsubmissioncount/:status/:searchData
```
### example

####  in browser
```sh
http://servername:port/searchsubmissioncount/1/abc
```
will return amount of submission with given status and searchData

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/searchsubmissioncount/1/abc')
obj.subscribe(
data=>{},
err=>{}
)
```





## updatesubmission

  - update submission by submission's id
  - accept subject,budgeting_number,submission_date, staff_name, implementation_target, purchase_target, id of the submission
  - method: POST
  - return the update status

### syntax : 

```sh
http://servername:port/updatesubmission
```
### example

####  in curl
```sh
curl -d 'subject=Pembelian ATK Marketing Agustus 2018&budgeting_number=201807/BUD/1&submission_date=2018-8-1&staff_name=test&implementation_target=2018-8-30&purchase_target=2018-8-15&id=1' -X POST http://localhost:2018/updatesubmission
```
will update submission with given params

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
submission = {
  subject:'Pembelian ATK Marketing Agustus 2018',
  budgeting_number:'201807/BUD/1',
  submission_date:'2018-8-1',
  staff_name:'test',
  implementation_target:'2018-8-30',
  purchase_target:'2018-8-15',
  id:1
}
obj = http.post<any>('http://servername:port/updatesubmission',submission)
obj.subscribe(
data=>{},
err=>{}
)
```









## setsubmissionstatus

  - set the status of a submission
  - accept status of the submission and id of the submission
  - method: GET
  - return the transaction status

### syntax : 

```sh
http://servername:port/setsubmissionstatus/:id/:status
```
### example

####  in browser
```sh
http://servername:port/setsubmissionstatus/1/1
```
will set the status of submission with id 1 to '1' 

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/setsubmissionstatus/1/1')
obj.subscribe(
data=>{},
err=>{}
)
```

#### trigger
var cnt = select count(id) cnt from submissions;

select concat(date_format(curdate(),'%Y'),date_format(curdate(),'%m'),'/BUD/');


DELIMITER $$
DROP TRIGGER IF EXISTS `new_submission_number`$$
CREATE TRIGGER `new_submission_number` BEFORE INSERT ON `submissions` 
FOR EACH ROW BEGIN
    set @budgeting_number = (Select count(*) from submissions where date_format(curdate(),'%Y%m')=date_format(new.createdate,'%Y%m'));
    SET NEW.budgeting_number = concat(date_format(curdate(),'%Y'),date_format(curdate(),'%m'),'/BUD/',lpad(@budgeting_number+1,5,0));
END$$
DELIMITER ;




