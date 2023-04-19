using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GIFterWeb.Models
{
    public class Gif
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Tags { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public DateTime Created { get; set; } = DateTime.Now;   
        public Gif()
        {
            
        }
    }
}
