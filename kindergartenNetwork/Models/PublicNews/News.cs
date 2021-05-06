using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kindergartenNetwork.Models.PublicNews
{
    public class News
    {
        public News()
        {
            LstNews = new List<DTO.News.News>();
            count = 1;
        }
        public List<DTO.News.News> LstNews { get; set; }
        public int count { get; set; }

    }
    public class SingelNews
    {
        public SingelNews()
        {
            ONews = new DTO.News.News();
        }
        public DTO.News.News ONews { get; set; }

    }
    public class StaticPage
    {
        public DTO.News.StaticPages OStaticPages { get; set; }
    }
    public class MainPage
    {
        public MainPage()
        {
            LstMedia = new List<DTO.News.Media>();
            LstNews = new List<DTO.News.News>();
        }
        public List<DTO.News.Media> LstMedia { get; set; }
        public List<DTO.News.News> LstNews { get; set; }
    }
    public class Albums
    {
        public Albums()
        {
            LstAlbums = new List<DTO.News.MediaAlbums>();
            count = 1;
        }
        public List<DTO.News.MediaAlbums> LstAlbums { get; set; }
        public int count { get; set; }
    }
    public class Media
    {
        public Media()
        {
            LstMedia = new List<DTO.News.Media>();

        }
        public List<DTO.News.Media> LstMedia { get; set; }
    }
    public class Document
    {
        public Document()
        {
            LstDocument = new List<DTO.News.Attachment>();
        }
        public List<DTO.News.Attachment> LstDocument { get; set; }
    }
    public class ContactUs
    {
        public DTO.News.StaticPages OContactUs { get; set; }
    }
    
}