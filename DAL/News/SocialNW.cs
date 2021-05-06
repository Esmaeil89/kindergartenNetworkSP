using DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAL.News
{
    public class SocialNW
    {

        public static ModelResult<int> UpdateSocialNW(DTO.News.SocialNW oSocialNW)
        {
            var oResult = new ModelResult<int>();
            using (var conn = new SqlConnection(DbConnection.ConnectionString))
            {
                try
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandText = "SP_UpdateSocialNW";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", oSocialNW.Id);
                        cmd.Parameters.AddWithValue("@Link", oSocialNW.Link);
                        conn.Open();
                        oResult.Results = Convert.ToInt32(cmd.ExecuteScalar());
                        oResult.HasResult = true;
                    }
                }
                catch
                {
                    conn.Close();
                    throw;
                }
                return oResult;
            }
        }

        public static ModelResult<List<DTO.News.SocialNW>> GetSocialNW(DTO.News.SocialNW oSocialNW)
        {
            var oResult = new ModelResult<List<DTO.News.SocialNW>>();
            var conn = new SqlConnection(DbConnection.ConnectionString);
            try
            {
                using (conn)
                {
                    using (var cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandText = @"select * from SocialNW where IsActive=1 ";
                        if (oSocialNW.Id > 0)
                        {
                            cmd.CommandText += "and Id=@d ";
                            cmd.Parameters.AddWithValue("@Id", oSocialNW.Id);
                        }
                        if (!String.IsNullOrEmpty(oSocialNW.Name))
                        {
                            cmd.CommandText += "and Name=@Name ";
                            cmd.Parameters.AddWithValue("@Name", oSocialNW.Name);
                        }
                        cmd.CommandText += " order by Id asc ";
                        cmd.CommandType = CommandType.Text;
                        conn.Open();

                        SqlDataReader reader = cmd.ExecuteReader();
                        var lstResult = new List<DTO.News.SocialNW>();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                var objSocialNW = new DTO.News.SocialNW();
                                objSocialNW.Id = Convert.ToInt32(reader["Id"]);
                                objSocialNW.Name = reader["Name"].ToString();
                                objSocialNW.Link = reader["Link"].ToString();
                                objSocialNW.Icon = reader["Icon"].ToString();
                                lstResult.Add(objSocialNW);
                            }
                        }
                        if (lstResult.Count > 0)
                        {
                            oResult.HasResult = true;
                            oResult.Results = lstResult;
                            oResult.RowCount = lstResult.Count;
                        }
                    }
                }
            }
            finally
            {
                conn.Close();
            }
            return oResult;
        }
    }
}
