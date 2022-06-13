using System;
using System.Net.Http;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;

namespace Rws.Services
{
    public abstract class ApiService
    {
        protected abstract IFlurlRequest GetApiRequest();

        private async Task<ApiResultWrap<TResult>> ReadingResponse<TResult>(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsJsonAsync<TResult>();
                return new ApiResultWrap<TResult>
                {
                    Success = true,
                    Result = result
                };
            }
            else
            {
                ApiExceptionResponse exceptionResponse = await response.Content.ReadAsJsonAsync<ApiExceptionResponse>();
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = exceptionResponse.ExceptionMessage ?? exceptionResponse.Message
                };
            }
        }

        public async Task<ApiResultWrap<TResult>> GetAsync<TResult>(string path, object param = null)
        {
            var request = GetApiRequest().AppendPathSegment(path);

            if (param != null)
            {
                request = request.SetQueryParams(param);
            }

            try
            {
                return await ReadingResponse<TResult>(await request.GetAsync());
            }
            catch (Exception ex)
            {
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = ex.ToString()
                };
            }
        }

        public async Task<ApiResultWrap<TResult>> DeleteAsync<TResult>(string path, int id)
        {
            var request = GetApiRequest().AppendPathSegment(path).AppendPathSegment(id);

            try
            {
                return await ReadingResponse<TResult>(await request.DeleteAsync());
            }
            catch (Exception ex)
            {
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = ex.ToString()
                };
            }
        }

        public async Task<ApiResultWrap<TResult>> DeleteAsync<TResult>(string path, Guid id)
        {
            var request = GetApiRequest().AppendPathSegment(path).AppendPathSegment(id.ToString());

            try
            {
                return await ReadingResponse<TResult>(await request.DeleteAsync());
            }
            catch (Exception ex)
            {
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = ex.ToString()
                };
            }
        }

        public async Task<ApiResultWrap<TResult>> DeleteAsync<TResult>(string path, object param)
        {
            var request = GetApiRequest().AppendPathSegment(path);

            if (param != null)
            {
                request = request.SetQueryParams(param);
            }

            try
            {
                return await ReadingResponse<TResult>(await request.DeleteAsync());
            }
            catch (Exception ex)
            {
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = ex.ToString()
                };
            }
        }

        public async Task<ApiResultWrap<TResult>> PostAsync<TResult>(string path, object json)
        {
            var request = GetApiRequest().AppendPathSegment(path);

            try
            {
                return await ReadingResponse<TResult>(await request.PostJsonAsync(json));
            }
            catch (Exception ex)
            {
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = ex.ToString()
                };
            }
        }
        public async Task<ApiResultWrap<TResult>> PutAsync<TResult>(string path, object json)
        {
            var request = GetApiRequest().AppendPathSegment(path);

            try
            {
                return await ReadingResponse<TResult>(await request.PutJsonAsync(json));
            }
            catch (Exception ex)
            {
                return new ApiResultWrap<TResult>
                {
                    Success = false,
                    Error = ex.ToString()
                };
            }
        }
    }

    public class ApiResultWrap<TResult>
    {
        public bool Success { get; set; }

        public string Error { get; set; }

        public TResult Result { get; set; }
    }

    public class ApiExceptionResponse
    {
        public string Message { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionType { get; set; }
        public string StackTrace { get; set; }
        public ApiExceptionResponse InnerException { get; set; }
    }
}