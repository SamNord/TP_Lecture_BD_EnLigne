﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Back
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromDays(7);
                options.Cookie.IsEssential = true;
            });
            services.AddCors(options =>
            {
                //Definition d'une stratégie pour le cross origin 
                options.AddPolicy("allowsAll", builder =>
                {
                    //autoriser les cross origin
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseCors();
            app.UseSession();
            app.UseMvc();
        }
    }
}
