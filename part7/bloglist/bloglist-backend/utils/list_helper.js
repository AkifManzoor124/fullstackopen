const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map( blog => blog.likes).reduce((total, like) => total + like, 0)
}

const favoriteBlogs = (blogs) => {
    let max = {
        likes: 0
    }
    blogs.forEach(blog => {
        if(blog.likes > max.likes){
            max = blog
        }
    })
    delete max._id
    delete max.url
    delete max.__v
    console.log(max)
    return max
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs
}