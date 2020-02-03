﻿using backend.Entities;
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
        Task<IEnumerable<Question>> GetAll();
        Task<IEnumerable<Question>> GetByTopic(string topic);
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

        public async Task<IEnumerable<Question>> GetAll()
        {
            return await _context.Questions.ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetByTopic(string topic)
        {
            return await _context.Questions.Where(x => x.Topic == topic).ToListAsync();
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
            question.Date = date.ToLongDateString();

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
