#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Palette
{    
    [Key]    
    public int PaletteId { get; set; }

    [Required]
    public int CreatorId { get; set; }

    public User? Creator { get; set; }
    
    [Required]
    public string PaletteName { get; set; }
    
    [Required]   
    public string id { get; set; }     
    
    [Required]
    public string emoji { get; set; } 

    [Required]

    public string colors { get; set; } 
    
    public List <Association> PaletteUsers { get; set; }  = new List<Association>();
    public DateTime CreatedAt {get;set;} = DateTime.Now;   
    public DateTime UpdatedAt {get;set;} = DateTime.Now;

    public override string ToString()
    {
        return $"Palette Id:{PaletteId}, CreatorId:{CreatorId}, PaletteName: {PaletteName}";
    }
}

