const Movie = require('./models/Movie');

const resolvers = {
    Query: {
        getAllMovies: async () => await Movie.find(),
        getMovieById: async (_, { id }) => await Movie.findById(id),
    },
    Mutation: {
        insertMovie: async (_, args) => {
            const newMovie = new Movie(args);
            return await newMovie.save();
        },
        updateMovie: async (_, { id, ...updates }) => {
            return await Movie.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteMovie: async (_, { id }) => {
            await Movie.findByIdAndDelete(id);
            return " Movie deleted successfully";
        }
    }
};

module.exports = resolvers;
