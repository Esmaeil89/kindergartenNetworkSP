using DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAL.News
{
    public class Attachment
    {
        #region Attachment
        public static ModelResult<List<DTO.News.Attachment>> AttachmentGet(DTO.News.Attachment oAttachment,int langId)
        {
            var oResult = new ModelResult<List<DTO.News.Attachment>>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        #region SQLCOMMAND Builder
                        var command = @"SELECT TBL1.*,
                                        TBL2.Name UserName,
                                        TBL3.Name,
                                        TBL3.Icon ,
                                        TBL4.Name CategoryType
                                        FROM Attachment TBL1
                                    Left JOIN UserAccounts TBL2 ON TBL1.InsertedBy = TBL2.Id
                                    Left JOIN Constant TBL3 ON TBL3.Id = TBL1.FileType
                                    Left JOIN Constant TBL4 ON TBL4.Id = TBL1.CategoryTypeId
                                     WHERE TBL1.IsDeleted = 0 ";
                        if (langId > 0)
                        {
                            command += " AND TBL1.langId = @langId";
                            cmd.Parameters.AddWithValue("@langId", langId);
                        }
                        if (oAttachment.Id > 0)
                        {
                            command += " AND TBL1.Id = @Id";
                            cmd.Parameters.AddWithValue("@Id", oAttachment.Id);
                        }
                        if (oAttachment.FileType > 0)
                        {
                            command += " AND TBL1.FileType = @FileType";
                            cmd.Parameters.AddWithValue("@FileType", oAttachment.FileType);
                        }
                        if (oAttachment.CategoryTypeId > 0)
                        {
                            command += " AND TBL1.CategoryTypeId = @CategoryTypeId";
                            cmd.Parameters.AddWithValue("@CategoryTypeId", oAttachment.CategoryTypeId);
                        }
                        if (!string.IsNullOrEmpty(oAttachment.FileName))
                        {
                            command += " AND TBL1.FileName Like @FileName";
                            cmd.Parameters.AddWithValue("@FileName", "%" +  oAttachment.FileName + "%");
                        }
                        if (!string.IsNullOrEmpty(oAttachment.FileDescription))
                        {
                            command += " And TBL1.FileDescription LIKE @FileDescription";
                            cmd.Parameters.AddWithValue("@FileDescription", "%" + oAttachment.FileDescription + "%");
                        }
                        if (!oAttachment.IsList)
                        {
                            command += " order by @SortCol @SortType OFFSET(@Page - 1) * @RowsPerPage ROWS FETCH NEXT @RowsPerPage ROWS ONLY";
                            command = command.Replace("@SortCol", oAttachment.SortCol);
                            command = command.Replace("@SortType", oAttachment.SortType);
                            command = command.Replace("@Page", oAttachment.Page.ToString());
                            command = command.Replace("@RowsPerPage", oAttachment.RowPerPage.ToString());
                        }
                        #endregion
                        if (conn.State != ConnectionState.Open)
                            conn.Open();

                        cmd.CommandText = command;
                        SqlDataReader reader = cmd.ExecuteReader();
                        var lstAttachment = new List<DTO.News.Attachment>();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                var obAttachment = new DTO.News.Attachment();
                                obAttachment.Id = Convert.ToInt32(reader["Id"]);
                                obAttachment.FileName = Convert.ToString(reader["FileName"]);
                                obAttachment.InsertedBy = Convert.ToInt32(reader["InsertedBy"]);
                                obAttachment.InsertedDate = Convert.ToDateTime(reader["InsertedDate"]);
                                obAttachment.FileType = Convert.ToInt32(reader["FileType"]);
                                if (reader["CategoryTypeId"] != DBNull.Value)
                                    obAttachment.CategoryTypeId = Convert.ToInt32(reader["CategoryTypeId"]);
                                obAttachment.LangId = Convert.ToInt32(reader["LangId"]);
                                if(reader["FileDescription"] != DBNull.Value)
                                    obAttachment.FileDescription = Convert.ToString(reader["FileDescription"]);

                                var obUserAccount = new DTO.Account.UserAccounts();
                                obUserAccount.Name = Convert.ToString(reader["UserName"]);
                                obAttachment.oUserAccount = obUserAccount;

                                if (reader["Name"] != DBNull.Value)
                                    obAttachment.OFileType.Name = Convert.ToString(reader["Name"]);
                                if (reader["Icon"] != DBNull.Value)
                                    obAttachment.OFileType.Icon = Convert.ToString(reader["Icon"]);
                                if (reader["CategoryType"] != DBNull.Value)
                                    obAttachment.OCategoryType.Name = Convert.ToString(reader["CategoryType"]);
                                lstAttachment.Add(obAttachment);
                            }
                        }
                        int count = 0;
                        if (!oAttachment.IsList)
                        {
                            using (SqlConnection connCount = new SqlConnection(DbConnection.ConnectionString))
                            {
                                using (var cmdCount = new SqlCommand())
                                {
                                    cmdCount.Connection = connCount;
                                    command = @"SELECT COUNT(1) FROM Attachment WHERE 1=1 AND IsDeleted = 0";
                                    if (oAttachment.Id > 0)
                                    {
                                        command += " AND Id = @Id";
                                        cmdCount.Parameters.AddWithValue("@Id", oAttachment.Id);
                                    }
                                    if (oAttachment.FileType > 0)
                                    {
                                        command += " AND FileType = @FileType";
                                        cmdCount.Parameters.AddWithValue("@FileType", oAttachment.FileType);
                                    }
                                    if (oAttachment.CategoryTypeId > 0)
                                    {
                                        command += " AND CategoryTypeId = @CategoryTypeId";
                                        cmdCount.Parameters.AddWithValue("@CategoryTypeId", oAttachment.CategoryTypeId);
                                    }
                                    if (!string.IsNullOrEmpty(oAttachment.FileName))
                                    {
                                        command += " AND TBL1.FileName Like @FileName";
                                        cmdCount.Parameters.AddWithValue("@FileName", "%" + oAttachment.FileName + "%");
                                    }
                                    cmdCount.CommandText = command;
                                    if (connCount.State != ConnectionState.Open)
                                        connCount.Open();
                                    count = Convert.ToInt32(cmdCount.ExecuteScalar());
                                    connCount.Close();
                                }
                            }
                        }
                        if (lstAttachment.Count > 0)
                        {
                            oResult.HasResult = true;
                            oResult.Results = lstAttachment;
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
        public static ModelResult<DTO.News.Attachment> AttachmentSave(DTO.News.Attachment oAttachment)
        {
            var oResult = new ModelResult<DTO.News.Attachment>();
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
                        cmd.CommandText = "SP_AttachmentSave";
                        if (oAttachment.Id >= 0)
                        {
                            cmd.Parameters.AddWithValue("@Id", oAttachment.Id);
                        }
                        cmd.Parameters.AddWithValue("@FileName", oAttachment.FileName);
                        cmd.Parameters.AddWithValue("@LangId", oAttachment.LangId);
                        if (!string.IsNullOrEmpty(oAttachment.FileDescription))
                        {
                            cmd.Parameters.AddWithValue("@FileDescription", oAttachment.FileDescription);
                        }
                        cmd.Parameters.AddWithValue("@InsertedBy", oAttachment.InsertedBy);
                        cmd.Parameters.AddWithValue("@FileType", oAttachment.FileType);
                        cmd.Parameters.AddWithValue("@CategoryTypeId", oAttachment.CategoryTypeId);

                        conn.Open();
                        oAttachment.Id = Convert.ToInt32(cmd.ExecuteScalar());
                        oResult.HasResult = true;
                        oResult.Results = oAttachment;
                    }
                }
            }
            finally
            {
                conn.Close();
            }
            return oResult;
        }
        public static ModelResult<int> AttachmentDelete(int id)
        {
            int x;
            var oResult = new ModelResult<int>();
            using (var conn = new SqlConnection(DbConnection.ConnectionString))
            {

                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "SP_AttachmentDelete";
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
