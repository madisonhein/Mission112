using Microsoft.AspNetCore.Mvc;
using Mission112.API.data;

namespace Mission112.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : Controller
{
    private BookstoreDbContext _bookContext;
    
    public BookController(BookstoreDbContext temp)
    {
        _bookContext = temp;
    }

    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageHowMany = 5,  int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
    {
        var query = _bookContext.Books.AsQueryable();

        if (projectTypes != null && projectTypes.Any())
        {
            query = query.Where(p => projectTypes.Contains(p.Category));
        }
        
        var totalNumBooks = query.Count();
        
        var something = query
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();
        
        var someObject = new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        };
        return Ok(someObject);
    }
    
    [HttpGet("GetCategoryTypes")]
    public IActionResult GetCategoryTypes()
    {
        var categoryTypes = _bookContext.Books
            .Select(p => p.Category)
            .Distinct()
            .ToList();
        
        return Ok(categoryTypes);
    }
}