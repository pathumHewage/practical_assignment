using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using EmployeeDetailsWebApp.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;




namespace EmployeeDetailsWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select EmployeeId, EmployeeFirstName, EmployeeLastName,EmailAddress,DateOfBirth,Age,Salary,Department
                            
                            from
                            dbo.Employee
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = @"
                           insert into dbo.Employee
                           (EmployeeFirstName, EmployeeLastName,EmailAddress,DateOfBirth,Age,Salary,Department)
                    values (@EmployeeFirstName,@EmployeeLastName,@EmailAddress,@DateOfBirth,@Age,@Salary,@Department)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    
                    myCommand.Parameters.AddWithValue("@EmployeeFirstName", emp.EmployeeFirstName);
                    myCommand.Parameters.AddWithValue("@EmployeeLastName", emp.EmployeeLastName);
                    myCommand.Parameters.AddWithValue("@EmailAddress", emp.EmailAddress);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", emp.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@Age", emp.Age);
                    myCommand.Parameters.AddWithValue("@Salary", emp.Salary);
                    myCommand.Parameters.AddWithValue("@Department", emp.Department);
                    
                   
                    
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = @"
                           update dbo.Employee
                           set  EmployeeFirstName=@EmployeeFirstName,
                                EmployeeLastName=@EmployeeLastName,
                                EmailAddress=@EmailAddress,
                                DateOfBirth=@DateOfBirth,
                                Age=@Age,
                                Salary=@Salary,
                                Department=@Department
                               


                                where EmployeeId=@EmployeeId
                              ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    
                    myCommand.Parameters.AddWithValue("@EmployeeId", emp.EmployeeId);
                    myCommand.Parameters.AddWithValue("@EmployeeFirstName", emp.EmployeeFirstName);
                    myCommand.Parameters.AddWithValue("@EmployeeLastName", emp.EmployeeLastName);
                    myCommand.Parameters.AddWithValue("@EmailAddress", emp.EmailAddress);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", emp.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@Age", emp.Age);
                    myCommand.Parameters.AddWithValue("@Salary", emp.Salary);
                    myCommand.Parameters.AddWithValue("@Department", emp.Department);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Employee
                            where EmployeeId=@EmployeeId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


       
        

    }
}
