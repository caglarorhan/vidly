const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

//in this document author is a reference for another document
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

//populate method calls the referenced document inside the caller collection
// ,populate('targetCollection', 'wantedProperty -unwantedProperty')
// if only some data wanted  .populate('author', 'name') // _id property automatically added
// of you want to exclude some properties from called document .populate('author', 'name -_id')
// you can add multiple .populate() methods for each document you want
async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name author');
    console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

 //createCourse('Node Course', '5cf06b44798ce0477cd491ea')

 listCourses();
