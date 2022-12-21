#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Association
{    
    [Key]    
    public int AssociationId { get; set; }
    
   public int UserId { get; set; }
   public int PaletteId { get; set; }

   public User? User { get; set; }

   public Palette? Palette { get; set; }
}
