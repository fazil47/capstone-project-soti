using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Backend.Controllers {
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase {
        private readonly OnlineGroceryStoreContext _context;

        public ProductsController(OnlineGroceryStoreContext context) {
            _context = context;
        }

        // GET: api/Products
        [HttpGet, Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts() {
            try {
                if (_context.Products == null) {
                    return NotFound();
                }
                return await _context.Products.Include(p => p.Category).ToListAsync();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }

        }

        // GET: api/Products/5
        [HttpGet("{id}"), Authorize(Roles = "User")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            try {
                if (_context.Products == null) {
                    return NotFound();
                }
                var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(pr => pr.Id == id);

                if (product == null) {
                    return NotFound();
                }

                return product;
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }

        }

        [HttpGet("name/{productName}"), Authorize(Roles = "User")]
        public async Task<ActionResult<Product>> SearchProduct(string productName, [BindRequired] decimal price) {
            try {
                if (_context.Products == null) {
                    return NotFound();
                }

                var products = await _context.Products.Include(p => p.Category).
                                    Where(p => p.ProductName.Contains(productName) && p.UnitPrice <= price).ToListAsync();

                if (!products.Any()) {
                    return NotFound();
                }

                return Ok(products);
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }

        }


        [HttpGet("cat/{catid}"), Authorize(Roles = "User")]
        public async Task<ActionResult<Product>> SearchProduct(int catId) {
            try {
                if (_context.Products == null) {
                    return NotFound();
                }

                var products = await _context.Products.Include(p => p.Category).
                                    Where(p => p.CategoryId == catId).ToListAsync();

                if (!products.Any()) return NotFound();

                return Ok(products);
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }
        }

        // PUT: api/Products/edit/5

        [HttpPut("edit/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditProduct(int id, Product product) {
            if (id != product.Id) {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!ProductExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products/edit

        [HttpPost("edit"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> AddProduct(Product product) {
            try {
                if (_context.Products == null) {
                    return Problem("Entity set 'OnlineGroceryStoreContext.Products'  is null.");
                }
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            } catch (DbUpdateException) {
                return BadRequest();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }

        }

        // DELETE: api/Products/edit/5
        [HttpDelete("edit/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id) {
            try {
                if (_context.Products == null) {
                    return NotFound();
                }
                var product = await _context.Products.FindAsync(id);
                if (product == null) {
                    return NotFound();
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return NoContent();
            } catch (DbUpdateException) {
                return BadRequest();
            } catch (Exception ex) {
                return StatusCode(500, $"Internal Server Error : {ex.Message}");
            }

        }

        private bool ProductExists(int id) {
            try {
                return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
            } catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
