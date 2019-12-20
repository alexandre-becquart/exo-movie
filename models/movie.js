const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let schema = new Schema([{
    fields: {
        directors: [String],
        release_date: String,
        genres: [String],
        image_url: String,
        plot: String,
        title: String,
        actors: [String],
        year: Number,
        rating: Number,
        running_time_secs: Number
    }

}])

module.exports = mongoose.model('Movie', schema)