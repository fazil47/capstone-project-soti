# Backend

## Setup

1. Install `Microsoft.EntityFrameworkCore.SqlServer` and `Microsoft.EntityFrameworkCore.Tools` in the project.
2. In terminal, install `dotnet-ef`:
```ps
dotnet tool install --global dotnet-ef
```
3. In terminal, set your connection string:
```ps
#dotnet user-secrets init

dotnet user-secrets set ConnectionStrings:OnlineGroceryStoreStr "server=INL666;database=OnlineGroceryStore;trusted_connection=true;TrustServerCertificate=true;"
```
4. In terminal, scaffold database connection:
```ps  
dotnet ef dbcontext scaffold "Name=ConnectionStrings:OnlineGroceryStoreStr" Microsoft.EntityFrameworkCore.SqlServer -o Models -f
```
5. Run project.

## After pulling

In terminal, scaffold database connection again:
```ps  
dotnet ef dbcontext scaffold "Name=ConnectionStrings:OnlineGroceryStoreStr" Microsoft.EntityFrameworkCore.SqlServer -o Models -f
```

Or you can automate it by making a `post-merge` file in the directory `.git/hooks` with contents:
```
exec dotnet ef dbcontext scaffold "Name=ConnectionStrings:OnlineGroceryStoreStr" Microsoft.EntityFrameworkCore.SqlServer -o Models -f
```