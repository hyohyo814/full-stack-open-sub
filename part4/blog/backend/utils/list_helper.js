const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

const dummy = blogs => {
    if (blogs) {
        return 1
    } else {
        return 0
    }
}

const totalLikes = blogs => {
    let sum = 0

    for (const key in blogs) {
        sum += blogs[key].likes
    }

    return sum
}

module.exports = {
    dummy,
    totalLikes
}