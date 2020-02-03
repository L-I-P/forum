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
    public class CommentsController : ControllerBase
    {
        public ICommentService _commentService;

        public CommentsController(
            ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(Comment comment)
        {
            try
            {
                await _commentService.Create(comment);
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
            var comments = await _commentService.GetAll();
            return Ok(comments);
        }

        [AllowAnonymous]
        [HttpGet("{questionId}")]
        public async Task<IActionResult> GetById(int questionId)
        {
            var comments = await _commentService.GetById(questionId);
            return Ok(comments);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Comment comment)
        {
            try
            {
                await _commentService.Update(comment);
                return Ok();
            }
            catch(AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete (int id)
        {
            await _commentService.Delete(id);
            return Ok();
        }
    }
}