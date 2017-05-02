using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Baseline;
using Baseline.Dates;
using Marten;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using StructureMap;
using StructureMap.Graph;
using StructureMap.Pipeline;
using UtopiaTargetFinder.Controllers;

namespace UtopiaTargetFinder
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables(prefix: "ASPNETCORE_");
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            var container = ConfigureContainer(services);
            return container.GetInstance<IServiceProvider>(); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.MapWhen(x => x.Request.Method == "POST", x =>
            {
                x.UseMiddleware<MartenMiddleware>();
                x.UseMvcWithDefaultRoute();
            });

            app.UseMvcWithDefaultRoute();
            app.UseStaticFiles();


            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");
            //});
        }

        private Container ConfigureContainer(IServiceCollection services)
        {
            var container = new Container(x =>
            {
                x.Populate(services);
                x.Policies.OnMissingFamily<SettingsPolicy>();
                x.ForSingletonOf<IConfigurationRoot>().Use(Configuration);
                x.IncludeRegistry<UtopiaTargetFinderStructureMapRegistry>();
                x.IncludeRegistry<MartenDatabaseRegistry>();
            });

            return container;
        } 
    }

    public class MartenDatabaseRegistry : Registry
    {
        public MartenDatabaseRegistry()
        {
            ForSingletonOf<IDocumentStore>().Use("Marten Data Store", c =>
            {
                var url = Environment.GetEnvironmentVariable("DATABASE_URL");
                var builtUrl = $"Host={url};Database=UtopiaTargetFinder;Integrated Security=True;";
                Console.WriteLine($"********** {builtUrl}");
                return DocumentStore.For(_ =>
                {
                    _.Connection(() => !string.IsNullOrEmpty(url) ? builtUrl : c.GetInstance<MartenSettings>().ConnectionString);
                    _.AutoCreateSchemaObjects = AutoCreate.All;
                });
            });

            For<IDocumentSession>()
                .Use(c => c.GetInstance<IDocumentStore>().LightweightSession(IsolationLevel.ReadUncommitted));
        }
    }


    public class UtopiaTargetFinderStructureMapRegistry : Registry
    {
        public UtopiaTargetFinderStructureMapRegistry()
        {
            For<ISystemTime>().Use(SystemTime.Default());
            ForSingletonOf<IHttpContextAccessor>().Use<HttpContextAccessor>();

            Scan(x =>
            {
                x.WithDefaultConventions();
                x.AssemblyContainingType<HomeController>();
                x.AssemblyContainingType<MartenSettings>();
            });
        }
    }

    public class MartenSettings
    {
        public string ConnectionString { get; set; }
    }


    public class MartenMiddleware
    {
        private readonly RequestDelegate _next;

        public MartenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IDocumentSession session)
        {
            await _next.Invoke(context);
            session.SaveChanges();
        }
    }

    public class SettingsPolicy : IFamilyPolicy
    {
        public bool AppliesToHasFamilyChecks => true;

        public PluginFamily Build(Type type)
        {
            if (type.Name.EndsWith("Settings") && type.IsConcreteWithDefaultCtor())
            {
                var family = new PluginFamily(type);
                var instance = BuildInstanceForType(type);
                family.SetDefault(instance);

                return family;
            }

            return null;
        }

        private static Instance BuildInstanceForType(Type type)
        {
            var instanceType = typeof(SettingsInstance<>).MakeGenericType(type);
            var instance = Activator.CreateInstance(instanceType).As<Instance>();
            return instance;
        }
    }

    public class SettingsInstance<T> : LambdaInstance<T> where T : class, new()
    {
        public SettingsInstance() : base(
            $"Building {typeof(T).FullName} from application settings",
            c => c.GetInstance<IConfigurationRoot>().Get<T>())
        {
        }
    }

    public static class ConfigurationExtensions
    {
        public static T Get<T>(this IConfigurationRoot root, string sectionName = null)
            where T : class, new()
        {
            var type = typeof(T);
            return Get(root, type, sectionName ?? type.Name) as T;
        }

        public static object Get(this IConfigurationRoot configuration, Type type, string sectionName = null)
        {
            var section = configuration.GetSection(sectionName ?? type.Name);
            var instance = Activator.CreateInstance(type);
            section.Bind(instance);
            return instance;
        }
    }
 }
