#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class LoginUser
{
    // No other fields!
    [Required]    
    public string LogEmail { get; set; }    
    [Required]    
    public string LogPassword { get; set; } 
}