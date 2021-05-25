using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DTO.Account;
using DTO.News;
using kindergartenNetwork.Helper;
using kindergartenNetwork.Models;
using kindergartenNetwork.Models.NewsModels;
using Newtonsoft.Json;

namespace kindergartenNetwork.Controllers
{
    public class HomeController : PublicBaseController
    {
        public ActionResult Index()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages{Id = 1}).Results.FirstOrDefault();
            var getNews = DAL.News.News.NewsGet(new News { CategoryId = Convert.ToInt32(1), Page = Convert.ToInt32(1), RowPerPage = 4, SortCol = "PublishDate" }, 0);
            if (getNews.HasResult)
            {
                oModel.LstNews = getNews.Results;
            }
            var getSocials = DAL.News.SocialNW.GetSocialNW(new SocialNW { IsList = true});
            if (getSocials.HasResult)
            {
                oModel.LstSocials = getSocials.Results;
            }
            var getStatics = DAL.News.StaticData.GetStaticData(new StaticData { Type = 1});
            if (getStatics.HasResult)
            {
                oModel.LstOurGoals = getStatics.Results;
            }
            getStatics = DAL.News.StaticData.GetStaticData(new StaticData { Type = 2});
            if (getStatics.HasResult)
            {
                oModel.LstStatistics = getStatics.Results.Where(x=>x.Status == true).ToList();
            }
            return View(oModel);
        }

        public ActionResult About()
        {
            var oModel = new StaticPageModel();
            oModel.OStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages { Id = 2 }).Results.FirstOrDefault();

            var getMembers = DAL.News.TeamMembers.TeamMembersGet(new TeamMembers { Page = Convert.ToInt32(1), RowPerPage = 4, SortCol = "Id", IsWithUs = true});
            if (getMembers.HasResult)
            {
                oModel.LstTeamMembers = getMembers.Results;
            }
            var getStatics = DAL.News.StaticData.GetStaticData(new StaticData { Type = 1 });
            if (getStatics.HasResult)
            {
                oModel.LstOurGoals = getStatics.Results;
            }
            getStatics = DAL.News.StaticData.GetStaticData(new StaticData { Type = 3 });
            if (getStatics.HasResult)
            {
                oModel.OurMethodology = getStatics.Results;
            }
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
        public ActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;
            return View();
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Home", Request.Url);
        }
        public JsonResult LoginFn(LoginModel oVisitor)
        {
            var cStatus = "error";
            var cMsg = "User Name or Password invalid";

            if (string.IsNullOrEmpty(oVisitor.Email) || string.IsNullOrEmpty(oVisitor.Password))
            {
                return Json(new { cStatus = "error", cMsg = "You cant Enter empty username or password !!" });
            }

            var getVisitorResult = new Visitors();
            var getVisitor = DAL.News.Visitors.VisitorLogin(oVisitor);
            if (getVisitor.HasResult)
            {
                // ReSharper disable once AssignNullToNotNullAttribute
                getVisitorResult = getVisitor.Results.FirstOrDefault();
                cStatus = "success";
                cMsg = "انتهت العملية بنجاح";
                if (getVisitorResult.IsApproved.Value)
                {
                    CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                    serializeModel.Id = getVisitorResult.Id;
                    serializeModel.Name = getVisitorResult.Name;
                    serializeModel.Password = getVisitorResult.Pass;
                    serializeModel.Email = getVisitorResult.Email;
                    serializeModel.Avatar = getVisitorResult.Avatar;


                    string userData = JsonConvert.SerializeObject(serializeModel);
                    HttpCookie cookie = FormsAuthentication.GetAuthCookie(serializeModel.Name, false);
                    var ticket = FormsAuthentication.Decrypt(cookie.Value);
                    if (ticket != null)
                    {
                        var newticket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate,
                            ticket.Expiration, true, userData, ticket.CookiePath);
                        cookie.Value = FormsAuthentication.Encrypt(newticket);
                        if (oVisitor.Remember == 1)
                        {
                            cookie.Expires = newticket.Expiration.AddDays(7);
                        }
                    }

                    HttpContext.Response.Cookies.Set(cookie);
                    string url = Url.Action("Index", "Home");

                    return Json(
                        new
                        {
                            cStatus, isRedirect = true,
                            redirectUrl = (string.IsNullOrEmpty(oVisitor.ReturnUrl) ? url : oVisitor.ReturnUrl)
                        }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    cStatus = "error";
                    cMsg = "The account is deactivated, please contact Admin";
                }
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Registration()
        {
            return View();
        }

        public JsonResult RegistrationFn(Visitors oVisitor)
        {
            var cStatus = "error";
            var cMsg = "User Name or Password invalid";

            if (string.IsNullOrEmpty(oVisitor.Email) || string.IsNullOrEmpty(oVisitor.Pass))
            {
                return Json(new { cStatus = "error", cMsg = "You cant Enter empty username or password !!" });
            }

            oVisitor.IsApproved = true;
            var getVisitor = DAL.News.Visitors.AddEditVisitor(oVisitor);
            if (getVisitor.HasResult)
            {
                cStatus = "success";
                cMsg = "انتهت العملية بنجاح";
                   
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RecoverPassword()
        {
            return View();
        }
    }
}