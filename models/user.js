const { Schema, model } = require('mongoose');
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Custom pre-delete hook to delete associated thoughts
userSchema.pre('findOneAndDelete', async function () {
    console.log('User pre-delete');
    const user = await this.model.findOne(this.getFilter());
    console.log(`Deleting thoughts of user: ${user.username}`);
    await Thought.deleteMany({ username: user.username });
  });
  
  const User = model('User', userSchema);
  module.exports = User;
