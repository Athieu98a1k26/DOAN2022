using System.ComponentModel.DataAnnotations.Schema;

namespace Rws
{
    public class AppSettings
    {
        public bool Debug { get; set; }

        public UploadImageConfig UploadImageConfig { get; set; }
    }

    public class UploadImageConfig
    {
        public int DefaultImageQuality { get; set; }
        public int MaxImageWidth { get; set; }
        public int MaxImageHeight { get; set; }
        public int DefaultThumbnailQuality { get; set; }
        public int DefaultThumbnailWidth { get; set; }
        public int DefaultThumbnailHeight { get; set; }
    }
}