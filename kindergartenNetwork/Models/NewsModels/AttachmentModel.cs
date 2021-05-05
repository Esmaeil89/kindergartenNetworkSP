using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO.Account;
using DTO.News;
using kindergartenNetwork.Models;

namespace kindergartenNetwork.Models.NewsModels
{
    public class AttachmentModel
    {
        public List<Constant> LstFileTypes { get; set; }
        public Attachment OAttachment { get; set; }
    }
}