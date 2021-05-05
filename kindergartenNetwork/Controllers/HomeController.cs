using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DTO.News;
using kindergartenNetwork.Helper;
using kindergartenNetwork.Models;
using kindergartenNetwork.Models.NewsModels;

namespace kindergartenNetwork.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages{Id = 1}).Results.FirstOrDefault();
            return View(oModel);
        }

        public ActionResult About()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages { Id = 2 }).Results.FirstOrDefault();
            return View(oModel);
        }

        public ActionResult Contact()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages { Id = 3 }).Results.FirstOrDefault();
            return View(oModel);
        }
        [ValidateOnlyIncomingValues]
        public JsonResult SaveContactUs([Bind(Exclude = "Reply")] DTO.News.ContactUs oContactUs)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var result = DAL.News.ContactUs.ContactUsSave(oContactUs);
                if (result.HasResult)
                {
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.SuccessMsg;
                    return Json(new { cStatus = cStatus, cMsg = cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
    }
}