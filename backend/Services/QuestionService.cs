using backend.Entities;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetAll(int page);
        Task<IEnumerable<Question>> GetByTopic(string topic, int page);
        Task<Question> GetById(int id);
        Task Create(Question question);
        Task Update(Question question);
        Task Delete(int id);
    }
    public class QuestionService : IQuestionService
    {
        private DataContext _context;

        public QuestionService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Question>> GetAll(int page)
        {
            return await _context.Questions.Skip((page-1) * 10).Take(10).ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetByTopic(string topic, int page)
        {
            return await _context.Questions.Where(x => x.Topic == topic).Skip((page - 1) * 10).Take(10).ToListAsync();
        }

        public async Task<Question> GetById(int id)
        {
            return await _context.Questions.FindAsync(id);
        }

        public async Task Create(Question question)
        {
            if (await _context.Questions.AnyAsync(x => x.Description == question.Description))
                throw new AppException("Such a question already exists");

            DateTime date = DateTime.Today;
            question.Date = date.ToShortDateString();

            await _context.Questions.AddAsync(question);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Question question)
        {

        }

        public async Task Delete(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if(question != null)
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
        }
    }
}
