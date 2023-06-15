const _ = require('lodash');

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
  return 0;
};

const totalLikes = (blogs) => {
  let sum = 0;

  _.forEach(blogs, (v, k) => {
    sum += blogs[k].likes;
  });

  return sum;
};

const favoriteBlog = (blogs) => {
  let fav = [];
  let likeCt = 0;

  _.forEach(blogs, (v, k) => {
    if (blogs[k].likes > likeCt) {
      likeCt = blogs[k].likes;
      fav = blogs[k];
    }
  });

  return fav;
};

const mostBlogs = (blogs) => {
  const groupObj = _(blogs)
    .groupBy('author')
    .map((count, key) => ({
      author: key,
      blogs: _.size(count),
    }))
    .value();

  const maxObj = _.maxBy(groupObj, 'blogs');

  return maxObj;
};

const mostLikes = (blogs) => {
  const groupObj = _(blogs)
    .groupBy('author')
    .map((obj, key) => ({
      author: key,
      likes: _.sumBy(obj, (o) => o.likes),
    }))
    .value();

  const maxObj = _.maxBy(groupObj, 'likes');

  return maxObj;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
