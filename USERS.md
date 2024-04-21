curl http://localhost:2018/getdivisionsbyuserid/1


curl http://localhost:2018/getusersbydivisionid/1




## getdivisionsbyuserid

  - get all divisions by id of user
  - accept id of id of user
  - method: GET
  - return a list of divisions (certain user may have more than 1 division)

### syntax : 

```sh
getdivisionsbyuserid/:user_id
```
### example

####  in browser
```sh
http://servername:port/getdivisionsbyuserid/1
```
will return a list of divisions  (if exists) with user_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getdivisionsbyuserid/1')
obj.subscribe(
data=>{},
err=>{}
)
```





## getusersbydivisionid

  - get all users by id of division
  - accept id of id of division
  - method: GET
  - return a list of users 

### syntax : 

```sh
getusersbydivisionid/:division_id
```
### example

####  in browser
```sh
http://servername:port/getusersbydivisionid/1
```
will return a list of users  (if exists) with division_id = 1

#### angular Observable

```sh
obj : Observable<any>
http : HttpClient
obj = http.get<any>('http://servername:port/getusersbydivisionid/1')
obj.subscribe(
data=>{},
err=>{}
)
```

|  8 | sisca    | Ev6Cxw9HXK7VSkzrrtnpgvydArFsdsBn |  Ev6Cxw9HXK7VSkzrrtnpgvydArFsdsBn7f71f7e682a437c998d7bfd6bcae7e179aefd529 |
|  3 | puji     | pAffWt8BQF4ZZAKDFdRwyNEUmLjnqf43 | pAffWt8BQF4ZZAKDFdRwyNEUmLjnqf43e6234977c41e5fd3da23720487e65b719a674826 |
