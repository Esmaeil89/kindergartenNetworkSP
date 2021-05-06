using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO.News;

namespace kindergartenNetwork.Models.NewsModels
{
    public class TeamMembersModel
    {
        public TeamMembersModel()
        {
            OTeamMember = new TeamMembers();
        }
        public TeamMembers OTeamMember { get; set; }
    }
}