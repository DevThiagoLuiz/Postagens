using System.ComponentModel.DataAnnotations;

public class UpdateProfileDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }
    [Required(ErrorMessage = "Bio is required")]
    public string Bio { get; set; }
}