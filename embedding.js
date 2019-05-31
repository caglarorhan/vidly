const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

//embedding is to call a schema (like populating). But this time we directly call by Schema variable
// it occurs in database as subdocument (document in document)
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}
//
// async function updateAuthor(courseId){
//     const course = await Course.findById(courseId);
//     course.author.name = 'Caglar Orhan';
//     course.save()
// }

// Use $set operator to update a subdocument
async function updateAuthor(courseId){
    const course = await Course.findByIdAndUpdate({_id:courseId},{
        $set: {
            'author.name' : 'John Doe'
        }
    });
    course.author.name = 'Caglar Orhan';
    course.save()
}

// Use $unset operator to delete a subdocument, attention that save method not required and subdocument valu e change not required
// nested property set to empty string!
async function deleteAuthor(courseId){
    const course = await Course.findByIdAndUpdate({_id:courseId},{
        $unset: {
            'author' : ''
            /*OR just for a property 'author.name' : ''  */
        }
    });
}


//updateAuthor('5cf083fb99567e9ff0278d58').then(()=>console.log('Guncellendi!')).catch(err=>console.log(`Hata olustu: ${err}`));
createCourse('Node Course',[
    new Author({ name: 'Mosh' }),
    new Author({ name: 'Caglar' }),
    new Author({ name: 'Ali' })
]);
//deleteAuthor('5cf083fb99567e9ff0278d58').then(()=>console.log('Guncellendi (Silindi)!')).catch(err=>console.log(`Hata olustu: ${err}`));
