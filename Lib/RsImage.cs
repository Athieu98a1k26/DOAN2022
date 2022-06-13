using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using System;
using System.IO;

namespace Rws
{
    public class RsImage : IDisposable
    {
        private Image<Rgba32> _image;
        private IImageFormat _imageFormat;

        public RsImage(Image<Rgba32> image)
        {
            _image = image;
            _image.Mutate(x => x.AutoOrient());
            _imageFormat = JpegFormat.Instance;
        }

        public RsImage(Stream imageFileStream)
        {
            _image = Image.Load<Rgba32>(imageFileStream, out _imageFormat);
            _image.Mutate(x => x.AutoOrient());
        }

        public int Width
        {
            get
            {
                return _image.Width;
            }
        }

        public int Height
        {
            get
            {
                return _image.Height;
            }
        }

        public RsImage BackgroundColor(Rgba32 color)
        {
            _image.Mutate(x => x.BackgroundColor(color));

            return this;
        }

        public RsImage Crop(int width, int height, int x = 0, int y = 0)
        {
            if (x < 0 || x > Width) x = 0;
            if (y < 0 || y > Height) y = 0;
            if (width > Width) width = Width;
            if (height > Height) height = Height;


            _image.Mutate(op => op.Crop(new Rectangle(x, y, width, height)));

            return this;
        }

        public RsImage ResizeWidth(int width)
        {
            int height = this.Height * width / this.Width;
            Resize(width, height, RsImageResizeMode.Max);

            return this;
        }

        public RsImage ResizeHeight(int height)
        {
            int width = this.Width * height / this.Height;
            Resize(width, height, RsImageResizeMode.Max);

            return this;
        }

        public RsImage Resize(int width, int height)
        {
            Resize(width, height, RsImageResizeMode.Cover);

            return this;
        }

        public RsImage Resize(int width, int height, RsImageResizeMode mode)
        {
            ResizeMode rmode = ResizeMode.Crop;

            if (mode == RsImageResizeMode.Contain) rmode = ResizeMode.Pad;
            if (mode == RsImageResizeMode.Stretch) rmode = ResizeMode.Stretch;
            if (mode == RsImageResizeMode.Max) rmode = ResizeMode.Max;

            _image.Mutate(op => op.Resize(new ResizeOptions
            {
                Mode = rmode,
                Position = AnchorPositionMode.Center,
                Size = new Size(width, height),
                Compand = false
            }));

            return this;
        }

        public RsImage Optimize(RsImageSize size)
        {
            var width = this.Width;
            switch (size)
            {
                case RsImageSize.SD:
                    if (this.Width > 720)
                    {
                        ResizeWidth(720);
                    }
                    if (this.Height > 480)
                    {
                        ResizeHeight(480);
                    }
                    break;
                case RsImageSize.DH:
                    if (this.Width > 1280)
                    {
                        ResizeWidth(1280);
                    }
                    if (this.Height > 720)
                    {
                        ResizeHeight(720);
                    }
                    break;
                case RsImageSize.FDH:
                    if (this.Width > 1920)
                    {
                        ResizeWidth(1920);
                    }
                    if (this.Height > 1080)
                    {
                        ResizeHeight(1080);
                    }
                    break;
                case RsImageSize.UHD:
                    if (this.Width > 3840)
                    {
                        ResizeWidth(3840);
                    }
                    if (this.Height > 2160)
                    {
                        ResizeHeight(2160);
                    }
                    break;
            }

            return this;
        }

        public RsImage Save(string fullname)
        {
            _image.Save(fullname);

            return this;
        }

        public RsImage Save(string fullname, int? quality)
        {
            if (quality.HasValue && _imageFormat.Name == JpegFormat.Instance.Name)
            {
                JpegEncoder encode = new JpegEncoder
                {
                    Quality = quality.Value
                };
                _image.Save(fullname, encode);
            }

            _image.Save(fullname);

            return this;
        }

        public RsImage Clone()
        {
            return new RsImage(_image.Clone<Rgba32>());
        }

        public void Dispose()
        {
            _image.Dispose();
            _image = null;
        }
    }

    public enum RsImageSize
    {
        SD, //720x480
        DH, //1280x720
        FDH, // 1920x1080
        UHD // 3840x2160
    }

    public enum RsImageResizeMode
    {
        Contain,
        Cover,
        Stretch,
        Max
    }
}
