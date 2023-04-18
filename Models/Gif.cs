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
        public string Tags { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public DateTime Created = DateTime.Now;   
        public Gif()
        {
            
        }
    }
}
