create database OnlineGroceryStore

use OnlineGroceryStore

create table Categories
(
    Id int primary key identity(101,1),
    CategoryName varchar(100) not null
)

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
    ModifiedDate datetime
)

--drop table Users

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
    (ProductName, ProductDescription, UnitPrice, UnitsInStock, Discontinued, CategoryId)
VALUES
    ('Carrots', 'Fresh carrots.', 599.99, 50, 0, 101),
    ('Onions', 'Fresh onions.', 1299.99, 30, 0, 101),
    ('Salmon', 'Decent salmon.', 299.99, 20, 0, 104),
    ('Apples', 'Fresh apples.', 299.99, 20, 0, 103),
    ('Oranges', 'Fresh oranges.', 299.99, 20, 0, 103),
    ('Red Bull', 'Red Bull.', 199.99, 20, 0, 106),
    ('Chicken', 'Good chicken.', 799.99, 15, 0, 105);


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
