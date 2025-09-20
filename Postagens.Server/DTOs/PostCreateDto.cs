using System.ComponentModel.DataAnnotations;

namespace Postagens.Dtos
{
    public class PostCreateDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(100, ErrorMessage = "Title can't exceed 100 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }
    }
}
