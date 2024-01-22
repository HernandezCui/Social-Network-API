const { Schema, model } = require('mongoose');
const reactionShema = require('./reaction');
const dateFormat = require('../utils/date_format');

const thoughtSchema = new Schema(
    {
        text: {
          type: String,
          required: 'You need to leave a thought!',
          minlength: 1,
          maxlength: 280
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        },
        author: {
          type: String,
          required: true
        },
        reactions: [reactionShema],
      },
      {
        toJSON: {
          getters: true
        },
        id: false
      }
    );
    
    thoughtSchema.virtual('reactionCount').get(function() {
      return this.reactions.length;
    });
    
    const Thought = model('Thought', thoughtSchema);
    
module.exports = Thought;