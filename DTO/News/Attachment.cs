using DTO.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.Account;

namespace DTO.News
{
    public class Attachment : DbProcess
    {
        public Attachment()
        {
            OCategoryType = new Constant();
            OFileType = new Constant();
            oUserAccount = new UserAccounts();
        }
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("Id")]
        public int Id { get; set; }

        [MaxLength(50)]
        [StringLength(50)]
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("الملف")]
        public string FileName { get; set; }

        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("Inserted By")]
        public int InsertedBy { get; set; }

        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("Inserted Date")]
        public DateTime InsertedDate { get; set; }

        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("نوع الملف")]
        public int FileType { get; set; }

        [MaxLength(250)]
        [StringLength(250)]
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("وصف الملف")]
        public string FileDescription { get; set; }
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("اللغة")]
        public int LangId { get; set; }
        [Required(ErrorMessage = "<u><b>{0}</b></u>: هذا الحقل إلزامي")]
        [DisplayName("تصنيف الملف")]
        public int CategoryTypeId { get; set; }
        public Account.UserAccounts oUserAccount { get; set; }
        public Account.Constant OFileType { get; set; }
        public Account.Constant OCategoryType { get; set; }
    }


}
