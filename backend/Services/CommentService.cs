using backend.Entities;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetAll();
        Task<IEnumerable<Comment>> GetById(int questionId);
        Task Create(Comment comment);
        Task Update(Comment comment);
        Task Delete(int id);
    }
    public class CommentService : ICommentService
    {
        private DataContext _context;

        public CommentService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetById(int questionId)
        {
            return await _context.Comments.Where(x => x.QuestionId == questionId).ToListAsync();
        }

        public async Task Create(Comment comment)
        {
            if (await _context.Comments.AnyAsync(x => x.Description == comment.Description))
                throw new AppException("Such a comment already exists");

            DateTime date = DateTime.Today; 
            comment.Date = date.ToShortDateString();

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Comment comment)
        {

        }

        public async Task Delete(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if(comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }
    }
}
