// using Microsoft.AspNetCore.Http;
// using Microsoft.EntityFrameworkCore.Internal;
// using Microsoft.EntityFrameworkCore.Query;
// using Microsoft.EntityFrameworkCore.Query.Internal;
// using Microsoft.EntityFrameworkCore.Storage;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Reflection;
// using System.Threading.Tasks;
// using Microsoft.EntityFrameworkCore.Query.SqlExpressions;


// namespace Rws
// {
//     public static class IQueryableExtensions
//     {
//         private static readonly TypeInfo QueryCompilerTypeInfo = typeof(QueryCompiler).GetTypeInfo();

//         private static readonly FieldInfo QueryCompilerField = typeof(EntityQueryProvider).GetTypeInfo().DeclaredFields.First(x => x.Name == "_queryCompiler");

//         private static readonly PropertyInfo NodeTypeProviderField = QueryCompilerTypeInfo.DeclaredProperties.Single(x => x.Name == "NodeTypeProvider");

//         private static readonly MethodInfo CreateQueryParserMethod = QueryCompilerTypeInfo.DeclaredMethods.First(x => x.Name == "CreateQueryParser");

//         private static readonly FieldInfo DataBaseField = QueryCompilerTypeInfo.DeclaredFields.Single(x => x.Name == "_database");

//         private static readonly PropertyInfo DatabaseDependenciesField
//             = typeof(Database).GetTypeInfo().DeclaredProperties.Single(x => x.Name == "Dependencies");


//         public static string ToSql<TEntity>(this IQueryable<TEntity> query) where TEntity : class
//         {
//             using var enumerator = query.Provider.Execute<IEnumerable<TEntity>>(query.Expression).GetEnumerator();
//             var relationalCommandCache = enumerator.Private("_relationalCommandCache");
//             var selectExpression = relationalCommandCache.Private<SelectExpression>("_selectExpression");
//             var factory = relationalCommandCache.Private<IQuerySqlGeneratorFactory>("_querySqlGeneratorFactory");

//             var sqlGenerator = factory.Create();
//             var command = sqlGenerator.GetCommand(selectExpression);

//             string sql = command.CommandText;
//             return sql;
//         }

//         private static object Private(this object obj, string privateField) => obj?.GetType().GetField(privateField, BindingFlags.Instance | BindingFlags.NonPublic)?.GetValue(obj);
//         private static T Private<T>(this object obj, string privateField) => (T)obj?.GetType().GetField(privateField, BindingFlags.Instance | BindingFlags.NonPublic)?.GetValue(obj);
//     }
// }
