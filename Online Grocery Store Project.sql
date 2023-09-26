create database OnlineGroceryStore

use OnlineGroceryStore

create table Categories
(
    Id int primary key identity(101,1),
    CategoryName varchar(100) not null
)

drop table Products
create table Products
(
    Id int primary key identity,
    ProductName varchar(100) not null,
    ProductDescription varchar(250),
    UnitPrice money check(UnitPrice>=1) not null,
    UnitsInStock int check(UnitsInStock>=1) not null,
    Discontinued bit not null default 1,
    CategoryId int foreign key references Categories(Id),
    CreatedDate datetime not null default getdate(),
    ModifiedDate datetime,
	ImgUrl nvarchar(1000)
)

drop table Users

create table Users
(
    Id int primary key identity,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Gender char(6) check(Gender in('male','female','other','MALE','FEMALE','OTHER','Male','Female','Other')),
    DateOfBirth datetime check (datediff(year,DateOfBirth, getdate()) > 18),
    MobileNo char(10) unique not null,
    EmailId varchar(150) unique not null,
    Password varchar(150) not null,
    CreatedDate datetime not null default getdate()
)

-- -- Get Password unique contraint name
-- alter table Users drop column Password
-- -- Drop constraint
-- alter table Users drop constraint UQ__Users__87909B1513FEC7AA

SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_NAME='Users';

----------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Categories
    (CategoryName)
VALUES
    ('Vegetables'),
    ('Fruits'),
    ('Snacks'),
    ('Fish'),
    ('Meat'),
    ('Beverages');

	
INSERT INTO Products
    (ProductName, ProductDescription, UnitPrice, UnitsInStock, Discontinued, CategoryId,ImgUrl)
VALUES
    ('Carrots', 'Fresh carrots.', 599.99, 50, 0, 101,'https://www.bigbasket.com/media/uploads/p/m/10000270_14-fresho-carrot-ooty.jpg?tr=w-1920,q=80'),
    ('Onions', 'Fresh onions.', 1299.99, 30, 0, 101,'https://www.bigbasket.com/media/uploads/p/m/40005834_4-fresho-red-onion-skinned-peeled.jpg?tr=w-1920,q=80'),
    ('Salmon', 'Decent salmon.', 299.99, 20, 0, 104,'https://www.bigbasket.com/media/uploads/p/l/40021108_9-big-sams-atlantic-salmon-fillet.jpg?tr=w-640,q=80'),
    ('Apples', 'Fresh apples.', 299.99, 20, 0, 102,'https://www.bigbasket.com/media/uploads/p/m/40201319_1-fresho-rockit-apple.jpg?tr=w-1920,q=80'),
    ('Oranges', 'Fresh oranges.', 299.99, 20, 0, 102,'https://www.bigbasket.com/media/uploads/p/m/20000909_18-fresho-orange-imported.jpg?tr=w-1920,q=80'),
    ('KurKure', 'Eatables Snacks.', 99.99, 20, 0, 103,'https://www.bigbasket.com/media/uploads/p/l/102761_17-kurkure-namkeen-masala-munch.jpg?tr=w-640,q=80'),
    ('Red Bull', 'Red Bull.', 199.99, 20, 0, 106,'https://www.bigbasket.com/media/uploads/p/m/40311389_1-red-bull-sugar-free-energy-drink.jpg?tr=w-1920,q=80'),
    ('Chicken', 'Good chicken.', 799.99, 15, 0, 105,'https://www.bigbasket.com/media/uploads/p/m/10000909_8-fresho-chicken-curry-cut-without-skin-antibiotic-residue-free.jpg?tr=w-1920,q=80');


INSERT INTO Users
    (FirstName, LastName, Gender, DateOfBirth, MobileNo, EmailId, Password)
VALUES
    ('John', 'Doe', 'Male', '1985-05-15', '1234567890', 'johndoe@example.com', 'password1'),
    ('Jane', 'Smith', 'Female', '1990-09-20', '9876543210', 'janesmith@example.com', 'password1'),
    ('Chris', 'Johnson', 'Other', '1998-03-10', '5555555555', 'chris@example.com', 'password3'),
    ('Emily', 'Brown', 'Female', '1980-12-05', '7777777777', 'emily@example.com', 'password4'),
    ('Michael', 'Williams', 'Male', '1995-02-25', '6666666666', 'michael@example.com', 'password5'),
    ('Sophia', 'Davis', 'Female', '2000-08-15', '9999999999', 'sophia@example.com', 'password6'),
    ('App', 'Admin', 'Male', '2001-12-04', '7902390615', 'admin@123', 'admin123');



----------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------


select *
from Categories
select *
from Products
select *
from Users

-- update Products set Discontinued = 0 where Id = 1


----------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------
