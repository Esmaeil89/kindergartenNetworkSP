using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO.News;

namespace kindergartenNetwork.Models.NewsModels
{
    public class Social
    {
        public Social()
        {
            LstSocial = new List<SocialNW>();
        }
        public List<SocialNW> LstSocial { get; set; }
    }
}