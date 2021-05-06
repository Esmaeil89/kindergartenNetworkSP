using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DTO.Common;

namespace DAL.News
{
    public class Media
    {
        #region Media
        public static ModelResult<List<DTO.News.Media>> MediaGet(DTO.News.Media oMedia)
        {
            var oResult = new ModelResult<List<DTO.News.Media>>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        #region SQLCOMMAND Builder
                        var command = @"SELECT TBL1.*  , TBL2.Name ,TBL2.NameEn ,TBL3.NameEn TypeNameEn, TBL3.Name TypeName  FROM Media TBL1 
                                    JOIN MediaAlbums TBL2 ON TBL1.MediaAlbumId = TBL2.Id
                                    JOIN Constant TBL3 ON TBL3.Id = TBL1.MediaType
                                    WHERE TBL1.IsDeleted = 0 ";

                        if (oMedia.Id > 0)
                        {
                            command += " AND TBL1.Id = @Id";
                            cmd.Parameters.AddWithValue("@Id", oMedia.Id);
                        }
                        if (oMedia.MediaAlbumId > 0)
                        {
                            command += " AND TBL1.MediaAlbumId = @MediaAlbumId";
                            cmd.Parameters.AddWithValue("@MediaAlbumId", oMedia.MediaAlbumId);
                        }
                        if (oMedia.MediaType > 0)
                        {
                            command += " AND TBL1.MediaType = @MediaType";
                            cmd.Parameters.AddWithValue("@MediaType", oMedia.MediaType);
                        }

                        if (!oMedia.IsList)
                        {
                            command += " order by @SortCol @SortType OFFSET(@Page - 1) * @RowsPerPage ROWS FETCH NEXT @RowsPerPage ROWS ONLY";
                            command = command.Replace("@SortCol", oMedia.SortCol);
                            command = command.Replace("@SortType", oMedia.SortType);
                            command = command.Replace("@Page", oMedia.Page.ToString());
                            command = command.Replace("@RowsPerPage", oMedia.RowPerPage.ToString());
                        }
                        #endregion
                        if (conn.State != ConnectionState.Open)
                            conn.Open();

                        cmd.CommandText = command;
                        SqlDataReader reader = cmd.ExecuteReader();
                        var lstMedia = new List<DTO.News.Media>();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                var obMedia = new DTO.News.Media();
                                var obMediaAlbum = new DTO.News.MediaAlbums();
                                obMediaAlbum.Name = Convert.ToString(reader["Name"]);
                                if(reader["NameEn"] != DBNull.Value)
                                    obMediaAlbum.NameEn = Convert.ToString(reader["NameEn"]);
                                obMedia.MediaAlbum = obMediaAlbum;

                                var oConMediaType = new DTO.Account.Constant();
                                if (reader["Name"] != DBNull.Value)
                                oConMediaType.Name = Convert.ToString(reader["Name"]);
                                obMedia.OMediaType = oConMediaType;

                                obMedia.ExternalLink = Convert.ToString(reader["ExternalLink"]);

                                obMedia.Id = Convert.ToInt32(reader["Id"]);
                                obMedia.MediaAlbumId = Convert.ToInt32(reader["MediaAlbumId"]);
                                obMedia.MediaType = Convert.ToInt32(reader["MediaType"]);
                                if(reader["Caption"] != DBNull.Value)
                                    obMedia.Caption = Convert.ToString(reader["Caption"]);
                                if (reader["CaptionEn"] != DBNull.Value)
                                    obMedia.CaptionEn = Convert.ToString(reader["CaptionEn"]);
                                obMedia.FilePath = Convert.ToString(reader["FilePath"]);
                                obMedia.IsInMainPage = Convert.ToBoolean(reader["IsInMainPage"]);

                                lstMedia.Add(obMedia);
                            }
                        }
                        int count = 0;
                        if (!oMedia.IsList)
                        {
                            using (SqlConnection connCount = new SqlConnection(DbConnection.ConnectionString))
                            {
                                using (var cmdCount = new SqlCommand())
                                {
                                    cmdCount.Connection = connCount;
                                    command = @"SELECT COUNT(1) FROM Media WHERE 1=1 AND IsDeleted = 0";
                                    if (oMedia.Id > 0)
                                    {
                                        command += " AND Id = @Id";
                                        cmdCount.Parameters.AddWithValue("@Id", oMedia.Id);
                                    }
                                    if (oMedia.MediaType > 0)
                                    {
                                        command += " AND MediaType = @MediaType";
                                        cmdCount.Parameters.AddWithValue("@MediaType", oMedia.MediaType);
                                    }
                                    if (oMedia.MediaAlbumId > 0)
                                    {
                                        command += " AND MediaAlbumId = @MediaAlbumId";
                                        cmdCount.Parameters.AddWithValue("@MediaAlbumId", oMedia.MediaAlbumId);
                                    }
                                    cmdCount.CommandText = command;
                                    if (connCount.State != ConnectionState.Open)
                                        connCount.Open();
                                    count = Convert.ToInt32(cmdCount.ExecuteScalar());
                                    connCount.Close();
                                }
                            }
                        }
                        if (lstMedia.Count > 0)
                        {
                            oResult.HasResult = true;
                            oResult.Results = lstMedia;
                            oResult.RowCount = count;
                        }
                    }
                }
            }
            //catch (Exception ex)
            //{
            //    oResult.Message = ex.Message;
            //    oResult.HasResult = false;
            //}
            finally
            {
                conn.Close();
            }
            return oResult;
        }
        public static ModelResult<DTO.News.Media> MediaSave(DTO.News.Media oMedia)
        {
            var oResult = new ModelResult<DTO.News.Media>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Clear();
                        cmd.CommandText = "SP_MediaSave";
                        if (oMedia.Id >= 0)
                        {
                            cmd.Parameters.AddWithValue("@Id", oMedia.Id);
                        }
                        if (!string.IsNullOrEmpty(oMedia.Caption))
                        {
                            cmd.Parameters.AddWithValue("@Caption", oMedia.Caption);
                        }
                        if (!string.IsNullOrEmpty(oMedia.CaptionEn))
                        {
                            cmd.Parameters.AddWithValue("@CaptionEn", oMedia.CaptionEn);
                        }
                        cmd.Parameters.AddWithValue("@MediaAlbumId", oMedia.MediaAlbumId);
                        cmd.Parameters.AddWithValue("@MediaType", oMedia.MediaType);
                        if (!string.IsNullOrEmpty(oMedia.FilePath))
                            cmd.Parameters.AddWithValue("@FilePath", oMedia.FilePath);
                        cmd.Parameters.AddWithValue("@IsInMainPage", oMedia.IsInMainPage);
                        if(!string.IsNullOrEmpty(oMedia.ExternalLink))
                            cmd.Parameters.AddWithValue("@ExternalLink", oMedia.ExternalLink);

                        conn.Open();
                        oMedia.Id = Convert.ToInt32(cmd.ExecuteScalar());
                        oResult.HasResult = true;
                        oResult.Results = oMedia;
                    }
                }
            }
            finally
            {
                conn.Close();
            }
            return oResult;
        }
        public static ModelResult<int> MediaDelete(int id)
        {
            int x;
            var oResult = new ModelResult<int>();
            using (var conn = new SqlConnection(DbConnection.ConnectionString))
            {

                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "SP_MediaDelete";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", id);
                    conn.Open();

                    x = Convert.ToInt32(cmd.ExecuteNonQuery());
                    if (x > 0)
                        oResult.HasResult = true;
                    oResult.Results = x;

                }
                return oResult;
            }
        }
        public static ModelResult<List<DTO.News.Media>> MediaInMainPageGet(DTO.News.Media oMedia)
        {
            var oResult = new ModelResult<List<DTO.News.Media>>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        #region SQLCOMMAND Builder
                        var command = @"SELECT TBL1.*  , TBL2.NameAr ,TBL2.NameEn,TBL3.NameEn TypeNameEn,TBL3.NameAr TypeNameAr 
                                    FROM Media TBL1 
                                    JOIN MediaAlbums TBL2 ON TBL1.MediaAlbumId = TBL2.Id
                                    JOIN Constant TBL3 ON TBL3.Id = TBL1.MediaType
                                    WHERE TBL1.IsDeleted = 0 AND TBL1.IsInMainPage = 1";
                        if(oMedia.MediaType > 0)
                        {
                            command += " AND TBL1.MediaType = @MediaType";
                            cmd.Parameters.AddWithValue("@MediaType", oMedia.MediaType);
                        }
                        if (!oMedia.IsList)
                        {
                            command += " order by @SortCol @SortType OFFSET(@Page - 1) * @RowsPerPage ROWS FETCH NEXT @RowsPerPage ROWS ONLY";
                            command = command.Replace("@SortCol", oMedia.SortCol);
                            command = command.Replace("@SortType", oMedia.SortType);
                            command = command.Replace("@Page", oMedia.Page.ToString());
                            command = command.Replace("@RowsPerPage", oMedia.RowPerPage.ToString());
                        }
                        #endregion
                        if (conn.State != ConnectionState.Open)
                            conn.Open();

                        cmd.CommandText = command;
                        SqlDataReader reader = cmd.ExecuteReader();
                        var lstMedia = new List<DTO.News.Media>();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                var obMedia = new DTO.News.Media();
                                var obMediaAlbum = new DTO.News.MediaAlbums();
                                obMediaAlbum.Name = Convert.ToString(reader["Name"]);
                                if (reader["NameEn"] != DBNull.Value)
                                    obMediaAlbum.NameEn = Convert.ToString(reader["NameEn"]);
                                obMedia.MediaAlbum = obMediaAlbum;

                                var oConMediaType = new DTO.Account.Constant();
                                if (reader["Name"] != DBNull.Value)
                                oConMediaType.Name = Convert.ToString(reader["Name"]);
                                obMedia.OMediaType = oConMediaType;

                                obMedia.ExternalLink = Convert.ToString(reader["ExternalLink"]);

                                obMedia.Id = Convert.ToInt32(reader["Id"]);
                                obMedia.MediaAlbumId = Convert.ToInt32(reader["MediaAlbumId"]);
                                obMedia.MediaType = Convert.ToInt32(reader["MediaType"]);
                                if (reader["Caption"] != DBNull.Value)
                                    obMedia.Caption = Convert.ToString(reader["Caption"]);
                                if (reader["CaptionEn"] != DBNull.Value)
                                    obMedia.CaptionEn = Convert.ToString(reader["CaptionEn"]);
                                obMedia.FilePath = Convert.ToString(reader["FilePath"]);

                                lstMedia.Add(obMedia);
                            }
                        }
                        int count = 0;
                        if (!oMedia.IsList)
                        {
                            using (SqlConnection connCount = new SqlConnection(DbConnection.ConnectionString))
                            {
                                using (var cmdCount = new SqlCommand())
                                {
                                    cmdCount.Connection = connCount;
                                    command = @"SELECT COUNT(1) FROM Media WHERE 1=1 AND IsDeleted = 0";
                                    if (oMedia.Id > 0)
                                    {
                                        command += " AND Id = @Id";
                                        cmdCount.Parameters.AddWithValue("@Id", oMedia.Id);
                                    }
                                    if (oMedia.MediaType > 0)
                                    {
                                        command += " AND MediaType = @MediaType";
                                        cmdCount.Parameters.AddWithValue("@MediaType", oMedia.MediaType);
                                    }
                                    if (oMedia.MediaAlbumId > 0)
                                    {
                                        command += " AND MediaAlbumId = @MediaAlbumId";
                                        cmdCount.Parameters.AddWithValue("@MediaAlbumId", oMedia.MediaAlbumId);
                                    }
                                    cmdCount.CommandText = command;
                                    if (connCount.State != ConnectionState.Open)
                                        connCount.Open();
                                    count = Convert.ToInt32(cmdCount.ExecuteScalar());
                                    connCount.Close();
                                }
                            }
                        }
                        if (lstMedia.Count > 0)
                        {
                            oResult.HasResult = true;
                            oResult.Results = lstMedia;
                            oResult.RowCount = count;
                        }
                    }
                }
            }
            //catch (Exception ex)
            //{
            //    oResult.Message = ex.Message;
            //    oResult.HasResult = false;
            //}
            finally
            {
                conn.Close();
            }
            return oResult;
        }
        #endregion
        #region Media Albuns
        public static ModelResult<List<DTO.News.MediaAlbums>> AlbumGet(DTO.News.MediaAlbums oMediaAlbum)
        {
            var oResult = new ModelResult<List<DTO.News.MediaAlbums>>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        #region SQLCOMMAND Builder
                        var command = @"SELECT *,
                                (SELECT COUNT(1) FROM Media WHERE MediaAlbumId = MediaAlbums.Id AND Media.IsDeleted = 0  ) ItemsCount
                                 FROM MediaAlbums WHERE IsDeleted = 0 ";

                        if (oMediaAlbum.Id > 0)
                        {
                            command += " AND Id = @Id";
                            cmd.Parameters.AddWithValue("@Id", oMediaAlbum.Id);
                        }
                        if (!string.IsNullOrEmpty(oMediaAlbum.Name))
                        {
                            command += " AND (Name Like @Name OR NameEn like @Name)";
                            cmd.Parameters.AddWithValue("@Name","%" + oMediaAlbum.Name + "%");
                        }
                        if (!oMediaAlbum.IsList)
                        {
                            command += " order by @SortCol @SortType OFFSET(@Page - 1) * @RowsPerPage ROWS FETCH NEXT @RowsPerPage ROWS ONLY";
                            command = command.Replace("@SortCol", oMediaAlbum.SortCol);
                            command = command.Replace("@SortType", oMediaAlbum.SortType);
                            command = command.Replace("@Page", oMediaAlbum.Page.ToString());
                            command = command.Replace("@RowsPerPage", oMediaAlbum.RowPerPage.ToString());
                        }
                        #endregion
                        if (conn.State != ConnectionState.Open)
                            conn.Open();

                        cmd.CommandText = command;
                        SqlDataReader reader = cmd.ExecuteReader();
                        var lstCategory = new List<DTO.News.MediaAlbums>();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                #region Category Params
                                var obMediaAlbum = new DTO.News.MediaAlbums();
                                obMediaAlbum.Id = Convert.ToInt32(reader["Id"]);
                                obMediaAlbum.Name = Convert.ToString(reader["Name"]);
                                if(reader["NameEn"] != DBNull.Value)
                                    obMediaAlbum.NameEn = Convert.ToString(reader["NameEn"]);
                                if (reader["Description"] != DBNull.Value)
                                    obMediaAlbum.Description = Convert.ToString(reader["Description"]);
                                obMediaAlbum.Thumbinal = Convert.ToString(reader["Thumbinal"]);
                                obMediaAlbum.ItemsCount = Convert.ToInt32(reader["ItemsCount"]);
                                #endregion
                                lstCategory.Add(obMediaAlbum);
                            }
                        }
                        int count = 0;
                        if (!oMediaAlbum.IsList)
                        {
                            using (SqlConnection connCount = new SqlConnection(DbConnection.ConnectionString))
                            {
                                using (var cmdCount = new SqlCommand())
                                {
                                    cmdCount.Connection = connCount;
                                    command = @"SELECT COUNT(1) FROM MediaAlbums WHERE 1=1 ";
                                    if (oMediaAlbum.Id > 0)
                                    {
                                        command += " AND Id = @Id";
                                        cmdCount.Parameters.AddWithValue("@Id", oMediaAlbum.Id);
                                    }
                                    if (!string.IsNullOrEmpty(oMediaAlbum.Name))
                                    {
                                        command += " AND (Name Like @Name OR NameEn like @Name)";
                                        cmdCount.Parameters.AddWithValue("@Name", "%" + oMediaAlbum.Name + "%");
                                    }

                                    cmdCount.CommandText = command;
                                    if (connCount.State != ConnectionState.Open)
                                        connCount.Open();
                                    count = Convert.ToInt32(cmdCount.ExecuteScalar());
                                    connCount.Close();
                                }
                            }
                        }
                        if (lstCategory.Count > 0)
                        {
                            oResult.HasResult = true;
                            oResult.Results = lstCategory;
                            oResult.RowCount = count;
                        }
                    }
                }
            }
            //catch (Exception ex)
            //{
            //    oResult.Message = ex.Message;
            //    oResult.HasResult = false;
            //}
            finally
            {
                conn.Close();
            }
            return oResult;
        }
        public static ModelResult<DTO.News.MediaAlbums> AlbumSave(DTO.News.MediaAlbums oMediaAlbum)
        {
            var oResult = new ModelResult<DTO.News.MediaAlbums>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Clear();
                        cmd.CommandText = "SP_AlbumSave";
                        if (oMediaAlbum.Id >= 0)
                        {
                            cmd.Parameters.AddWithValue("@Id", oMediaAlbum.Id);
                        }
                        cmd.Parameters.AddWithValue("@Name", oMediaAlbum.Name);
                        if (!string.IsNullOrEmpty(oMediaAlbum.NameEn))
                        {
                            cmd.Parameters.AddWithValue("@NameEn", oMediaAlbum.NameEn);
                        }
                        if (!string.IsNullOrEmpty(oMediaAlbum.Description))
                        {
                            cmd.Parameters.AddWithValue("@Description", oMediaAlbum.Description);
                        }
                        if (!string.IsNullOrEmpty(oMediaAlbum.Thumbinal))
                        {
                            cmd.Parameters.AddWithValue("@Thumbinal", oMediaAlbum.Thumbinal);
                        }

                        conn.Open();
                        oMediaAlbum.Id = Convert.ToInt32(cmd.ExecuteScalar());
                        oResult.HasResult = true;
                        oResult.Results = oMediaAlbum;
                    }
                }
            }
            finally
            {
                conn.Close();
            }
            return oResult;
        }
        public static ModelResult<int> AlbumDelete(int id)
        {
            int x;
            var oResult = new ModelResult<int>();
            using (var conn = new SqlConnection(DbConnection.ConnectionString))
            {
                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "SP_AlbumDelete";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", id);
                    conn.Open();

                    x = Convert.ToInt32(cmd.ExecuteNonQuery());
                    if (x > 0)
                        oResult.HasResult = true;
                    oResult.Results = x;

                }
                return oResult;
            }
        }
        #endregion
    }

}
