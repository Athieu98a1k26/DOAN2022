using Microsoft.Extensions.Configuration;

namespace Rws
{
    public static class ConfigurationExtensions
    {
        public static string GetUploadFolder(this IConfiguration configuration, string name = "DefaultFolder")
        {
            return configuration.GetValue<string>("UploadFolders:" + (name ?? "DefaultFolder"));
        }

        public static string GetLicenseKey(this IConfiguration configuration, string name = "DefaultLicense")
        {
            return configuration.GetValue<string>("LicenseKeys:" + (name ?? "DefaultLicense"));
        }

        public static string GetExternalServiceUrl(this IConfiguration configuration, string name)
        {
            return configuration.GetValue<string>("ExternalServiceUrls:" + name);
        }
    }
}