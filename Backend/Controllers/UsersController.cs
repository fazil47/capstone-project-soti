using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace Backend.Controllers {
    [Route("api/user")]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly OnlineGroceryStoreContext _context;

        public UsersController(OnlineGroceryStoreContext context) {
            _context = context;
        }

        // GET: api/User
        [HttpGet, Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() {
            try {
                if (_context.Users == null) {
                    return NotFound();
                }
                return await _context.Users.ToListAsync();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");

            }
        }

        // GET: api/User/5
        [HttpGet("{id}"), Authorize(Roles = "User")]
        public async Task<ActionResult<User>> GetUser(int id) {
            try {
                if (_context.Users == null) {
                    return NotFound();
                }
                var user = await _context.Users.FindAsync(id);

                if (user == null) {
                    return NotFound();
                }

                return user;
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "User")]
        public async Task<IActionResult> PutUser(int id, User user) {
            try {
                if (id != user.Id) {
                    return BadRequest();
                }

                _context.Entry(user).State = EntityState.Modified;

                try {
                    await _context.SaveChangesAsync();
                } catch (DbUpdateConcurrencyException) {
                    if (!UserExists(id)) {
                        return NotFound();
                    } else {
                        throw;
                    }
                }

                return NoContent();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(User user) {
            try {
                if (_context.Users == null) {
                    return Problem("Entity set 'OnlineGroceryStoreContext.Users' is null.");
                }
                if (user is null) {
                    return BadRequest("Invalid client request");
                }
                var dbUser = _context.Users.SingleOrDefault(u => u.EmailId == user.EmailId);
                if (dbUser == null) {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim> {
                        new Claim(ClaimTypes.Email, user.EmailId),
                        new Claim(ClaimTypes.Role, "User")
                    };

                    var tokeOptions = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        audience: "https://localhost:4200",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: signinCredentials
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    return Ok(new AuthenticatedResponse { Token = tokenString, Name = user.FirstName + " " + user.LastName });
                }

                return StatusCode(409, $"User with email '{user.EmailId}' already exists.");
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}"), Authorize(Roles = "User")]
        public async Task<IActionResult> DeleteUser(int id) {
            try {
                if (_context.Users == null) {
                    return NotFound();
                }
                var user = await _context.Users.FindAsync(id);
                if (user == null) {
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }
        }

        private bool UserExists(int id) {
            try {
                return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
            } catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
