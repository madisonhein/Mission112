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
    public IActionResult GetBooks(int pageHowMany = 5,  int pageNum = 1)
    {
        var something = _bookContext.Books
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();
        
        var totalNumBooks = _bookContext.Books.Count();
        var someObject = new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        };
        return Ok(someObject);
    }

    [HttpGet("FunctionalBooks")]
    public IEnumerable<Project> GetFunctionProjects()
    {
        var something = _bookContext.Books.Where(p => p.Title == "Function Project").ToList();
        return something;
    }
    
}