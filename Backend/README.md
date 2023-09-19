1. Install `Microsoft.EntityFrameworkCore.SqlServer` and `Microsoft.EntityFrameworkCore.Tools`.
2. In package manager console:
```
Scaffold-DbContext "server=[SERVER_NAME];database=OnlineGroceryStore;trusted_connection=true;TrustServerCertificate=true;" Microsoft.EntityFrameworkCore.SqlServer -o Models
```
3. Add to `appsettings.json`:
```  
"ConnectionStrings": { "OnlineGroceryStoreStr": "server=INL666;database=OnlineGroceryStore;trusted_connection=true;TrustServerCertificate=true;" }
```
4. Add to `Program.cs` after creating `builder`:
```
builder.Services.AddDbContext<OnlineGroceryStoreContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("OnlineGroceryStoreStr"))
);
```
5. Run project.