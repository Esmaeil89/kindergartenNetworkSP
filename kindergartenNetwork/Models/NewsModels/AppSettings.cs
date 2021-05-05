using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO.Account;

namespace kindergartenNetwork.Models.NewsModels
{
    public class AppSettings
    {
        public AppSettings()
        {
            LstValues = new List<Constant>();
        }
        public AppSettings OAppSetting { get; set; }
        public List<Constant> LstValues { get; set; }
    }
}