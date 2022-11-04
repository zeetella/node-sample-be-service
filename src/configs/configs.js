module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO: {
        URL: process.env.MONGODB_URL,
    },
    USER: {
        DEFAULT_ROLE: process.env.USER_DEFAULT_ROLE,
    }
}