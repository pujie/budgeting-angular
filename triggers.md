drop trigger updateplafon;

delimiter ||
CREATE TRIGGER updateplafon
AFTER INSERT
ON payments FOR EACH ROW
BEGIN
DECLARE division_id_ INT;
DECLARE placement_location_ varchar(20);
DECLARE quarter_ int;
DECLARE year_ int ;
select  division_id,placement_location,date_format(now(),'%Y'),
case when date_format(now(),'%m')>0 and date_format(now(),'%m')<4 then 1 
when date_format(now(),'%m')>3 and date_format(now(),'%m')<7 then 2 
when date_format(now(),'%m')>6 and date_format(now(),'%m')<10 then 3 
when date_format(now(),'%m')>9 and date_format(now(),'%m')<=12 then 4 end
into division_id_,placement_location_,year_,quarter_
 from submission_details a left outer join submissions b on b.id=a.submission_id where b.id=new.submission_detail_id;

update plafons 
   set budgetused=budgetused+new.amount 
   where quarter = quarter_ 
   and division = division_id_ 
   and city = placement_location_ 
   and year = year_;
END ||
delimiter ;

