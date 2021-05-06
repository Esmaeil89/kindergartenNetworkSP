using DTO.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.News
{
    public class Media : DbProcess
    {
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("Id")]
        public int Id { get; set; }

        [MaxLength(255)]
        [StringLength(255)]

        [DisplayName("الملف")]
        public string FilePath { get; set; }

        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("نوع الوسائط")]
        public int MediaType { get; set; }

        [MaxLength(255)]
        [StringLength(255)]
        [DisplayName("الوصف")]
        public string Caption { get; set; }
        [MaxLength(255)]
        [StringLength(255)]
        [DisplayName("الوصف")]
        public string CaptionEn { get; set; }
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("الألبوم")]
        public int MediaAlbumId { get; set; }

        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("بالرئيسية")]
        public bool IsInMainPage { get; set; }
        public MediaAlbums MediaAlbum { get; set; }
        [DisplayName("الرابط")]
        public string ExternalLink { get; set; }
        public MediaExternalLink MediaExternalLink { get; set; }

        public Account.Constant OMediaType { get; set; }
    }
    public class MediaExternalLink
    {
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("Media Id")]
        public int MediaId { get; set; }

        [MaxLength(300)]
        [StringLength(300)]
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("الرابط")]
        public string Link { get; set; }

        public Media oMedia { get; set; }
    }

    public class MediaAlbums : DbProcess
    {
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("Id")]
        public int Id { get; set; }

        [MaxLength(50)]
        [StringLength(50)]
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("الاسم")]
        public string Name { get; set; }

        [MaxLength(50)]
        [StringLength(50)]
        [DisplayName("الاسم انجليزي")]
        public string NameEn { get; set; }

        [DisplayName("صورة مصغرة")]
        public string Thumbinal { get; set; }

        [MaxLength(1000)]
        [StringLength(1000)]
        [DisplayName("الوصف")]
        public string Description { get; set; }

        public int ItemsCount { get; set; }
        public List<Media> Media { get; set; }

    }

}
