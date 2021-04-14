import axios from "axios";

const url = 'api/posts/';

class PostService{
    // get posts
    static getPosts(){
        return new Promise( async(resolve, reject) =>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post,
                        createTime : new Date(post.createTime)
                    }))
                ); 
            }catch(err){
                reject(err);
            }
        })
    }
    // Posts
    static InsertPosts(text){
        return axios.post(url, {
            text
        });
    }
    //Delete
    static DeletePosts(id){
        return axios.delete(`${url}${id}`);
    };

}

export default PostService;