using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web.Mvc;
using DTO.Account;
using DTO.News;
using kindergartenNetwork.Helper;
using kindergartenNetwork.Models.DataTableModels;
using kindergartenNetwork.Models.NewsModels;

namespace kindergartenNetwork.Controllers
{
    public class ControlPanelController : BaseController
    {
        // GET: ControlPanel
        public ActionResult Index()
        {
            return View();
        }


        #region UploadSaveAlbumImg
        public JsonResult UploadSaveAlbumImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            var albumId = Request.Form["albumId"];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }


            DAL.News.Media.MediaSave(new Media { MediaAlbumId = Convert.ToInt32(albumId), FilePath = fileName, MediaType = 11 });
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult UploadNewsImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/News/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/News/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/News/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UploadAlbumImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpLoadFile()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Attachments/"), fileName);
                    file.SaveAs(path);
                }

            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public static string GetMimeTypeByWindowsRegistry(string fileNameOrExtension)
        {
            string mimeType = "application/unknown";
            string ext = fileNameOrExtension.Contains(".") ? Path.GetExtension(fileNameOrExtension).ToLower() : "." + fileNameOrExtension;
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null) mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }
        #endregion

        #region StaticPages
        public ActionResult HomePage()
        {
            var oModel = new StaticPageModel();
            var getStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages{Id = 1});
            if (getStaticPage.HasResult)
                oModel.OStaticPage = getStaticPage.Results.First();
            return View(oModel);
        }
        public ActionResult AboutPage()
        {
            var oModel = new StaticPageModel();
            var getStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages { Id = 2 });
            if (getStaticPage.HasResult)
                oModel.OStaticPage = getStaticPage.Results.First();
            return View(oModel);
        }
        public ActionResult ContactPage()
        {
            var oModel = new StaticPageModel();
            var getStaticPage = DAL.News.StaticPages.StaticPagesGet(new StaticPages { Id = 3 });
            if (getStaticPage.HasResult)
                oModel.OStaticPage = getStaticPage.Results.First();
            return View(oModel);
        }
        public JsonResult GetStaticPagesDataTable(JQueryDataTableParamModel param)
        {
            var oStaticPage = new StaticPages();
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
                oStaticPage.Id = Convert.ToInt32(Request.QueryString["Id"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            oStaticPage.SortCol = dtProcess.SortCol;
            oStaticPage.SortType = dtProcess.SortType;
            oStaticPage.Page = dtProcess.Page;
            oStaticPage.RowPerPage = dtProcess.RowPerPage;

            var getStaticPage = DAL.News.StaticPages.StaticPagesGet(oStaticPage);

            
            if (getStaticPage.HasResult)
            {
                var getStaticPageResult = getStaticPage.Results;

                int rowCount = getStaticPage.RowCount;
                int lnRowCount = rowCount;

                var result = from q in getStaticPageResult
                             select new
                             {
                                 q.Id,
                                 q.Image,
                                 q.PageName
                             };
                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
            else
            {

                int rowCount = getStaticPage.RowCount;
                int lnRowCount = rowCount;

                var result = from q in getStaticPage.Results
                             select new
                             {
                                 q.Id,
                                 q.Image,
                                 q.PageName
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
        }
        //public PartialViewResult SaveStaticPageModal(string id)
        //{
        //    var staticPageId = Convert.ToInt32(id);
        //    var oModel = new Models.News.StaticPageModel();
        //    var getStaticPage = DAL.News.StaticPages.StaticPagesGet(new DTO.News.StaticPages { IsList = true, Id = staticPageId });
        //    if (getStaticPage.HasResult)
        //        oModel.OStaticPages = (getStaticPage.Results as List<DTO.News.StaticPages>).FirstOrDefault();

        //    return PartialView("StaticPageParts/_StaticPageSaveModal", oModel);
        //}
        [ValidateInput(false)]
        public JsonResult SaveStaticPage(StaticPages oStaticPages)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                oStaticPages.UpdatedBy = User.Id;
                var oStaticPagesSave = DAL.News.StaticPages.StaticPageSave(oStaticPages);
                if (oStaticPagesSave.HasResult)
                {
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Categories
        public ActionResult Categories()
        {
            return View();
        }
        public JsonResult GetCategoriesDataTable(JQueryDataTableParamModel param)
        {
            var oCategory = new Categories();
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
                oCategory.Id = Convert.ToInt32(Request.QueryString["Id"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            oCategory.SortCol = dtProcess.SortCol;
            oCategory.SortType = dtProcess.SortType;
            oCategory.Page = dtProcess.Page;
            oCategory.RowPerPage = dtProcess.RowPerPage;
            oCategory.IsList = true;

            var getCategory = DAL.News.News.CategoryGet(oCategory);

           
            if (getCategory.HasResult)
            {
                var getCategoryResult = getCategory.Results;

                int rowCount = getCategory.RowCount;
                int lnRowCount = rowCount;

                var result = from q in getCategoryResult
                             select new
                             {
                                 q.Id,
                                 q.NameAr,
                                 q.NameEn
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
            else
            {

                int rowCount = getCategory.RowCount;
                int lnRowCount = rowCount;

                var result = from q in getCategory.Results
                             select new
                             {
                                 q.Id,
                                 q.NameAr,
                                 q.NameEn
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
        }
        public PartialViewResult SaveCategoryModal(string id)
        {
            var oModel = new CategoryModel();
            var categoryId = Convert.ToInt32(id);
            if (categoryId > 0)
            {
                var getCategory = DAL.News.News.CategoryGet(new Categories { IsList = true, Id = categoryId });
                if (getCategory.HasResult)
                    oModel.OCategory = getCategory.Results.FirstOrDefault();
            }
            else
            {
                oModel.OCategory = new Categories();
            }
            return PartialView("CategoryParts/_CategorySaveModal", oModel);
        }
        public JsonResult SaveCategory(Categories oCategory)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var oCategorySave = DAL.News.News.CategorySave(oCategory);
                if (oCategorySave.HasResult)
                {
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteCategory(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var oResult = DAL.News.News.CategoryDelete(id);
            if (oResult.HasResult)
            {
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region News
        public ActionResult News()
        {
            var oModel = new NewsModel();

            var getUsers = DAL.Account.UserAccounts.UserAccountGet(new UserAccounts { IsList = true });
            if (getUsers.HasResult)
                oModel.LstUsers = getUsers.Results.Where(x => x.Id != 1).ToList();
            var getNewCategory = DAL.News.News.CategoryGet(new Categories { Id = 1, IsList = true });
            if (getNewCategory.HasResult)
                oModel.OCategory = getNewCategory.Results.FirstOrDefault();
            return View(oModel);
        }
        public JsonResult GetNewsDataTable(JQueryDataTableParamModel param)
        {
            var oNews = new News();
            if (!string.IsNullOrEmpty(Request.QueryString["NewsSearch"]))
                oNews.Title = Request.QueryString["NewsSearch"];
            if (!string.IsNullOrEmpty(Request.QueryString["Category"]))
                oNews.CategoryId = Convert.ToInt32(Request.QueryString["Category"]);
            if (!string.IsNullOrEmpty(Request.QueryString["InsertedBy"]))
                oNews.InsertedBy = Convert.ToInt32(Request.QueryString["InsertedBy"]);

            CultureInfo newCulture = (CultureInfo)Thread.CurrentThread.CurrentCulture.Clone();
            newCulture.DateTimeFormat.ShortDatePattern = "dd-MM-yyyy";
            newCulture.DateTimeFormat.DateSeparator = "-";
            Thread.CurrentThread.CurrentCulture = newCulture;
            if (!string.IsNullOrEmpty(Request.QueryString["FromDate"]))
            {
                string date = Request.QueryString["FromDate"];
                oNews.FromDate = CommonHelpExtension.ConvertToUTC(Convert.ToDateTime(date, newCulture));
            }
            if (!string.IsNullOrEmpty(Request.QueryString["ToDate"]))
            {
                string date = Request.QueryString["ToDate"];
                oNews.ToDate = CommonHelpExtension.ConvertToUTC(Convert.ToDateTime(date, newCulture));
            }
            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            oNews.SortCol = dtProcess.SortCol;
            oNews.SortType = dtProcess.SortType;
            oNews.Page = dtProcess.Page;
            oNews.RowPerPage = dtProcess.RowPerPage;

            var getNews = DAL.News.News.NewsGet(oNews, 0);

            

            if (getNews.RowCount > 0)
            {
                var getNewsResult = getNews.Results;

                int rowCount = getNews.RowCount;
                int lnRowCount = rowCount;

                var result = from q in getNewsResult
                             select new
                             {
                                 q.Id,
                                 q.IsActive,
                                 q.CategoryId,
                                 q.Image,
                                 q.Status,
                                 q.Title,
                                 q.ViewsCount,
                                 q.InsertedBy,
                                 PublishDate = q.PublishDate.ToString("yyyy-MM-dd HH:mm:ss"),
                                 InsertedByName = q.OInsertedBy.Name,
                                 q.OCategory.NameAr,
                                 q.OCategory.NameEn,

                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
            else
            {
                var lst = new List<News>();
                int rowCount = getNews.RowCount;
                int lnRowCount = rowCount;

                var result = from q in lst
                             select new
                             {
                                 q.Id,
                                 q.IsActive,
                                 q.CategoryId,
                                 q.Image,
                                 q.Status,
                                 q.Title,
                                 q.ViewsCount,
                                 q.InsertedBy,
                                 PublishDate = q.PublishDate.ToString("yyyy-MM-dd HH:mm:ss"),
                                 q.OInsertedBy.Name,
                                 q.OCategory.NameAr,
                                 q.OCategory.NameEn,
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
        }
        public PartialViewResult SaveNewsModal(string id, string categoryId)
        {
            var newsId = Convert.ToInt32(id);
            ViewBag.CategoryId = Convert.ToInt32(categoryId);
            var oModel = new NewsModel();
            if (newsId > 0)
            {
                var getNews = DAL.News.News.NewsGet(new News { Id = newsId }, 0);
                if (getNews.HasResult)
                    oModel.ONews = getNews.Results.FirstOrDefault();
            }
            else
            {
                oModel.ONews = new News();
            }
            var getNewCategories = DAL.News.News.CategoryGet(new Categories { IsList = true });
            if (getNewCategories.HasResult)
                oModel.LstCategory = getNewCategories.Results;

            return PartialView("NewsParts/_NewsSaveModal", oModel);
        }
        [ValidateInput(false)]
        public JsonResult SaveNews(News oNews)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                oNews.InsertedBy = User.Id;
                var oNewsSave = DAL.News.News.NewsSave(oNews);
                if (oNewsSave.HasResult)
                {
                    var newsId = oNewsSave.Results.Id;
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                    return Json(new { cStatus, cMsg, id = newsId }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteNews(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var oResult = DAL.News.News.NewsDelete(id);
            if (oResult.HasResult)
            {
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SearchAutoCompleteNews(string id, int? categoryId)
        {
            var getNewsResult = new List<News>();
            var oNews = new News();
            oNews.IsList = true;
            oNews.Title = id;
            if (categoryId.HasValue)
                oNews.CategoryId = categoryId.Value;
            var getNews = DAL.News.News.NewsGet(oNews, 0);

            if (getNews.HasResult)
            {
                getNewsResult = getNews.Results;
                var result = from q in getNewsResult
                    select new
                    {
                        Title = q.Title.Substring(0, 30),
                        q.Id
                    };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(getNewsResult, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}