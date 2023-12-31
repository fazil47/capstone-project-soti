﻿using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers {
    [Route("api/user")]
    [ApiController]
    public class LoginController : ControllerBase {
        private readonly OnlineGroceryStoreContext _context;
        public LoginController(OnlineGroceryStoreContext context) {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] Login user) {
            try {
                if (user is null) {
                    return BadRequest("Invalid client request");
                }
                var dbUser = _context.Users.SingleOrDefault(u => u.EmailId == user.EmailId && u.Password == user.Password);
                if (dbUser != null) {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim> {
                        new Claim(ClaimTypes.Email, user.EmailId),
                        new Claim(ClaimTypes.Role, "User")
                    };

                    if (user.EmailId == "admin@123" && user.Password == "admin123") {
                        claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                    }

                    var tokeOptions = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        audience: "https://localhost:4200",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(60 * 24),
                        signingCredentials: signinCredentials
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                    return Ok(new AuthenticatedResponse { Token = tokenString, Name = dbUser.FirstName + " " + dbUser.LastName });
                }

                return Unauthorized();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");

            }
        }

    }
}
