using System.ComponentModel.DataAnnotations;

namespace GIFterWeb.Models
{
    public class Gif
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Image { get; set; }
        [Required]
        public string[] Tags { get; set; }
        public Gif()
        {
            
        }
    }
}
