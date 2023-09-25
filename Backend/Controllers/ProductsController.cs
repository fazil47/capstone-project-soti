﻿using System;
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
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts() {
            if (_context.Products == null) {
                return NotFound();
            }
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}"), Authorize(Roles = "User")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            if (_context.Products == null) {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null) {
                return NotFound();
            }

            return product;
        }
        [HttpGet("cat/{catid}"), Authorize(Roles = "User")]
        public async Task<ActionResult<Product>> GetProductByCatId(int catId) {
            if (_context.Products == null) {
                return NotFound();
            }

            var products = await _context.Products.Include(p => p.Category).
                                Where(p => p.CategoryId == catId).ToListAsync();


            if (!products.Any())
                return NotFound();

            return Ok(products);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutProduct(int id, Product product) {
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> AddProduct(Product product) {
            if (_context.Products == null) {
                return Problem("Entity set 'OnlineGroceryStoreContext.Products'  is null.");
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id) {
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
        }

        private bool ProductExists(int id) {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
