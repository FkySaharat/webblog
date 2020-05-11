//shape of data 

const Blog = function(blog){
    this.blog_id =blog.blog_id;
    this.title = blog.title;
    this.body =blog.body;
    this.created_time=blog.created_time;
    this.user_id =blog.userId;
}

module.exports = Blog;