using DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.News
{
    public class SocialNW : DbProcess
    {

        public int Id { get; set; }
        public String Name { get; set; }
        public String Link { get; set; }
        public String Icon { get; set; }
    }
}
