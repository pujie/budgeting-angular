## getplafons

  - get all plafons
  - accept no parameters
  - method: GET
  - return all plafons

### syntax : 

```sh
getplafons
```
### example

####  in browser
```sh
http://servername:port/getplafons
```
will return all plafons

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getplafons')
obj.subscribe(
data=>{},
err=>{}
)
```
## getplafon

  - get a plafon by id
  - accept id of plafon
  - method: GET
  - return a plafons

### syntax : 

```sh
getplafon/:id
```
### example

####  in browser
```sh
http://servername:port/getplafon/plafon_id
```
will get a plafon

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getplafon/plafon_id')
obj.subscribe(
data=>{},
err=>{}
)
```
## saveplafon

  - save a plafon 
  - accept division,city,quarter,year, current_budget, and budget_limit of plafon
  - method: POST
  - return transaction status

### syntax : 

```sh
saveplafon
```
### example

####  in curl
```sh
curl -d 'division=1&city=Surbaya&quarter=1&year=2018&budget_limit=5000000&current_budget=5000000' -X POST http://servername:port/saveplafon
```
will save a plafon

#### angular Observable

```sh
plafon = {
    division:1,city:'Surabaya',year:'2018',quarter:1,budget_limit=5000000,current_budget:5000000
}

obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/saveplafon',plafon)
obj.subscribe(
data=>{},
err=>{}
)
```
## updateplafon

  - update a plafon 
  - accept division,city,quarter,year, budget_limit,current_budget, and id of plafon
  - method: POST
  - return transaction status

### syntax : 

```sh
updateplafon
```
### example

####  in curl
```sh
curl -d 'id=1&division=1&city=Surbaya&year=2018&quarter=1&budget_limit=5000000&current_budget=5000000' -X POST http://servername:port/updateplafon
```
will update a plafon with certain id

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
plafon = {
    division:1,city:'Surabaya',year:'2018',quarter:1,budget_limit=5000000,current_budget:5000000,id=1
}
obj = http.post<any>('http://servername:port/updateplafon',plafon)
obj.subscribe(
data=>{},
err=>{}
)
```
## removeplafon

  - remove a plafon 
  - accept id of plafon
  - method: POST
  - return transaction status

### syntax : 

```sh
removeplafon
```
### example

####  in curl
```sh
curl -d 'id=1' -X POST http://servername:port/removeplafon
```
will remove a plafon with certain id

#### angular Observable

```sh
plafon = {
    id:1
}

obj : Observable<any>
http : HttpClient
obj = http.post<any>('http://servername:port/removeplafon',plafon)
obj.subscribe(
data=>{},
err=>{}
)
```