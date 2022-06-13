using Microsoft.AspNetCore.StaticFiles;
using System.IO;

namespace Rws
{
    public class RsMedia
    {
        public static string GetFilter(RsMediaType type)
        {
            switch (type)
            {
                case RsMediaType.Code: return ".cs|.cshtml|.php|.js|.jsx|.css|.html|.html|.json|.c|.h|.m|.a|.java";
                case RsMediaType.Image: return ".jpg|.gif|.png|.bmp|.jpeg";
                case RsMediaType.Video: return ".mp4|.avi|.wmv|.flv|.ogg|.mpg|.mpeg";
                case RsMediaType.Audio: return ".mp3|.aac|.ac3|.wma|.wav|.arc|.midi";
                case RsMediaType.Flash: return ".swf";
                case RsMediaType.Text: return ".txt|.rtf";
                case RsMediaType.Document: return ".doc|.docx|.ppt|.pptx|.odd|.odc|.odt|.svg|.sxd|.pdf|.prc|.epub|.txt|.ogg|.rtf";
                case RsMediaType.Presentations: return ".ppt|.pptx|.odp|.sda|.sdd|.sdp|.vor";
                case RsMediaType.Spreadsheet: return ".xls|.xlsx|.ods|.csv|.xlsm|.xlsb";
                case RsMediaType.Compressed: return ".rar|.zip|.cab|.arj|.lzh|.ace|.7zip|.tar|.gzip|.uue|.bz2|.jar|.z";
            }
            return "*";
        }

        public static bool IsType(string filename, RsMediaType type)
        {
            if (string.IsNullOrWhiteSpace(filename)) return false;
            string ext = Path.GetExtension(filename)?.ToLower();
            return string.IsNullOrWhiteSpace(ext) ? false : GetFilter(type).Contains(ext);
        }

        public static string GetMimeType(string filename)
        {
            string contentType;
            new FileExtensionContentTypeProvider().TryGetContentType(filename, out contentType);
            return contentType ?? "application/octet-stream";
        }

        public static string GetExtension(string filename)
        {
            return Path.GetExtension(filename)?.ToLower();
        }
    }

    public enum RsMediaType
    {
        Code,
        Image,
        Video,
        Audio,
        Text,
        Document,
        Spreadsheet,
        Presentations,
        Compressed,
        Flash,
        Other
    }
}