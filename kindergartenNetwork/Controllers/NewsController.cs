using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DTO.News;

namespace kindergartenNetwork.Controllers
{
    public class NewsController : Controller
    {
        // GET: News
        public ActionResult Index(int? page)
        {
            var oModel = new Models.PublicNews.News();
            if (!page.HasValue)
            {
                page = 1;
            }
            var getNews = DAL.News.News.NewsGet(new News { CategoryId = Convert.ToInt32(1), Page = Convert.ToInt32(page), RowPerPage = 4, SortCol = "PublishDate" }, 0);
            if (getNews.HasResult)
            {
                oModel.LstNews = getNews.Results;
                oModel.count = getNews.RowCount;
            }
            else
                return RedirectToAction("index", "Home");
            return View(oModel);
        }
        public ActionResult Details()
        {
            return View();
        }
    }
}