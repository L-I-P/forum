using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Helpers;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : ControllerBase
    {
        private IQuestionService _questionService;

        public QuestionsController(
            IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Question question)
        {
            try
            {
                await _questionService.Create(question);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await _questionService.GetAll();
            return Ok(questions);
        }

        [AllowAnonymous]
        [HttpGet("Topic/{topic}")]
        public async Task<IActionResult> GetByTopic(string topic)
        {
            var questions = await _questionService.GetByTopic(topic);
            return Ok(questions);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var question = await _questionService.GetById(id);
            return Ok(question);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Question question)
        {
            try
            {
                await _questionService.Update(question);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _questionService.Delete(id);
            return Ok();
        }

    }
}