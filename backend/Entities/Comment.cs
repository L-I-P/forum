using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Date { get; set; }
        public string User { get; set; }
        public string Description { get; set; }
    }
}
