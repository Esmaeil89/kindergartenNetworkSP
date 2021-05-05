using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO.Account;
using DTO.News;

namespace kindergartenNetwork.Models.NewsModels
{
    public class MediaAlbumsModel
    {
        public MediaAlbums OMediaAlbum { get; set; }
    }
    public class MediaModel
    {
        public MediaModel()
        {
            LstMediaAlbums = new List<MediaAlbums>();
            ListMediaType = new List<Constant>();
        }
        public Media OMedia { get; set; }
        public List<MediaAlbums> LstMediaAlbums { get; set; }

        public List<Constant> ListMediaType { get; set; }
    }
}