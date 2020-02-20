using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Back.Tools;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [EnableCors("allowsAll")]
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
      
        private DataContext data;
        private ILoginService loginService;

        public AdminController(DataContext _data, ILoginService _loginService)
        {
            data = _data;
            loginService = _loginService;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Admin admin = data.Admin.Find(id);
            if(admin != null)
            {
                return Ok(admin);
            }
            else
            {
                return NotFound();
            }
        }

        [Route("login")]
        [HttpPost]
        public ActionResult Login(Admin admin)
        {
            string token = loginService.LogIn(admin.Identifiant, admin.Password);


            if (token == null)
            {
                return BadRequest();
            }
            else
            {                 
                    return Ok(new { message = token });
            } 
        }

        [HttpDelete("delete/table")]
        public IActionResult DeleteTable()
        {
            if (!Admin.DeleteTable())
                return Ok(new { message = "table réinitialisée" });
            else
                return Ok(new { message = "échec" });

        }
    }
}