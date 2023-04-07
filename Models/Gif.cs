using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace GIFterWeb.Models
{
    public class Gif
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Blob Image { get; set; }
        [Required]
        public string[] Tags { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
        public Gif()
        {
            
        }
    }
}
