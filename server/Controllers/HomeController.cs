
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using server.Models;
using Microsoft.AspNetCore.Identity;
namespace server.Controllers;
using System.Text.Json;
using System.Text.Json.Serialization;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private MyContext _context;

    public HomeController(ILogger<HomeController> logger, MyContext context)
    {
        _logger = logger;
        _context = context;
    }

    
  [HttpGet("api/loggedInUser/{userId}")]
    public JsonResult GetUser(int userId)
    {
        //options to make json data prettier/more readable
        var opt = new JsonSerializerOptions(){WriteIndented=true};
    
        //One item from db
        User? loggedInUser = _context.Users.FirstOrDefault(c => c.UserId == userId);
        string strLoggedInUser = JsonSerializer.Serialize<User>(loggedInUser, opt);
        //return a Json object
        return Json(loggedInUser);
    }





  [HttpGet("api/getallPalettes")]
    public JsonResult GetAll()
    {
        //options to make json data prettier/more readable
        var opt = new JsonSerializerOptions(){WriteIndented=true, ReferenceHandler = ReferenceHandler.Preserve};
        //list of data from db
        List<Palette> allPalettes = _context.Palettes.Include(p => p.PaletteUsers).ToList();
        // Console.WriteLine(allPalettes);
        string strAllPalettes = JsonSerializer.Serialize(allPalettes, opt);      
        Console.WriteLine(strAllPalettes);
        //return a Json object
        return Json(strAllPalettes);
    }

    [HttpGet("api/palettes/user/{userId}")]
    public JsonResult GetUserPalettes(int userId)
    {
        //options to make json data prettier/more readable
        var opt = new JsonSerializerOptions(){WriteIndented=true,  ReferenceHandler = ReferenceHandler.Preserve};

        //list of data from db
        User? user = _context.Users.Include(u => u.SavedPalettes).ThenInclude(p => p.Palette).FirstOrDefault(u => u.UserId == userId);
        List<Association> UserPalettes = user.SavedPalettes.ToList();

        string strUserPalettes = JsonSerializer.Serialize(UserPalettes, opt);

        //return a Json object
        // return Json(strUserPalettes);
        return Json(strUserPalettes);
    }

    [HttpPost("/api/user/create")]
    //take in form data using [FromBody]
    //.Net Core 6 can natively convert json data to a class object,
    //  no need for imports to deal with the conversion
    public IActionResult PostForm([FromBody] User newUser)
    {


        if (ModelState.IsValid)
        {
            PasswordHasher<User> Hasher = new PasswordHasher<User>();
            // Updating our newUser's password to a hashed version         
            newUser.Password = Hasher.HashPassword(newUser, newUser.Password);
            _context.Users.Add(newUser);
            _context.SaveChanges();
            HttpContext.Session.SetInt32("UserId", newUser.UserId);
            return Json(newUser);
        }
        else
        {
            //if model state isn't valid, return a 400 error with error messages
            //gets caught in the .catch() in api call and can be mapped to display errors
            return BadRequest(ModelState);
        }
    }

     [HttpPost("/api/palette/create")]
    //take in form data using [FromBody]
    //.Net Core 6 can natively convert json data to a class object,
    //  no need for imports to deal with the conversion
    public IActionResult PostForm([FromBody] Palette newPalette)
    {


        if (ModelState.IsValid)
        {
             _context.Palettes.Add(newPalette);
            _context.SaveChanges();
            Association newAssocation = new Association();
            newAssocation.PaletteId = newPalette.PaletteId;
            newAssocation.UserId = newPalette.CreatorId;
             _context.Associations.Add(newAssocation);
             _context.SaveChanges();
            return Json(newPalette);
        }
        else
        {
            //if model state isn't valid, return a 400 error with error messages
            //gets caught in the .catch() in api call and can be mapped to display errors
            return BadRequest(ModelState);
        }
    }

     [HttpPost("api/association/{AssociationId}/delete")]
    //take in form data using [FromBody]
    //.Net Core 6 can natively convert json data to a class object,
    //  no need for imports to deal with the conversion
    public IActionResult DeleteAssociation(int AssociationId)
    {

        Association? AssociationToDelete = _context.Associations.FirstOrDefault(a => a.AssociationId == AssociationId);
        _context.Associations.Remove(AssociationToDelete);

        _context.SaveChanges();


        return Json(AssociationId);
       
    }
    [HttpPost("api/association/create")]
    //take in form data using [FromBody]
    //.Net Core 6 can natively convert json data to a class object,
    //  no need for imports to deal with the conversion
    public IActionResult PostForm([FromBody] Association newAssociation)
    {

        if (ModelState.IsValid)
        {

             _context.Associations.Add(newAssociation);
             _context.SaveChanges();
            return Json(newAssociation);
        }
        else
        {
            //if model state isn't valid, return a 400 error with error messages
            //gets caught in the .catch() in api call and can be mapped to display errors
            return BadRequest(ModelState);
        }
       
    }

    

    [HttpPost("login")]
    public IActionResult  PostForm([FromBody] LoginUser userSubmission)
    {
        if (ModelState.IsValid)
        {
            // If initial ModelState is valid, query for a user with the provided email        
            User? userInDb = _context.Users.FirstOrDefault(u => u.Email == userSubmission.LogEmail);
            // If no user exists with the provided email        
            if (userInDb == null)
            {
                // Add an error to ModelState and return to View!            
                ModelState.AddModelError("LogEmail", "Invalid Email/Password");
                return BadRequest(ModelState);
            }
            // Otherwise, we have a user, now we need to check their password                 
            // Initialize hasher object        
            PasswordHasher<LoginUser> hasher = new PasswordHasher<LoginUser>();
            // Verify provided password against hash stored in db        
            var result = hasher.VerifyHashedPassword(userSubmission, userInDb.Password, userSubmission.LogPassword);                                    // Result can be compared to 0 for failure        
            if (result == 0)
            {
                ModelState.AddModelError("LogPassword", "Invalid Email/Password");
                return BadRequest(ModelState);// Handle failure (this should be similar to how "existing email" is handled)        
            }

        var opt = new JsonSerializerOptions(){WriteIndented=true};

        string strLoggedInUser = JsonSerializer.Serialize<User>(userInDb, opt);
            // Surrounding registration code
           
            return Json(userInDb);
 
        }
        else
        {
            // Handle else
           return BadRequest(ModelState);
        }
    }



    [HttpPost("logout")]
    public IActionResult Logout()
    {

        // Handle else
        HttpContext.Session.Clear();
        return View("LoginRegister");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}


public class SessionCheckAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        // Find the session, but remember it may be null so we need int?
        int? userId = context.HttpContext.Session.GetInt32("UserId");
        // Check to see if we got back null
        if (userId == null)
        {
            // Redirect to the Index page if there was nothing in session
            // "Home" here is referring to "HomeController", you can use any controller that is appropriate here
            context.Result = new RedirectToActionResult("LoginRegister", "Home", null);
        }
    }
}