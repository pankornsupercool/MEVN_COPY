<template>
  <div>
    <h1>Latest Post</h1>
    <hr>
    <p v-if="error">{{error}}</p>
    <div class="create-post">
      <label for="create-post">
        Say  Something...
      </label>
      <input type="text" id="create-post" v-model="text" Placeholder="Post your message here"/>
      <button v-on:click="addPost">Post</button>
    </div>
    <div class="card-container" v-for="(post,index) in posts" :index="index" v-bind:key="post.id">
      <ul>
        <li class="card" >
          {{`${post.createTime.getDate()}/${post.createTime.getMonth()}/${post.createTime.getFullYear()}`}}
          <hr>
          {{post.text}}
          <button v-on:click="deletePost(post._id)">Delete</button>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PostService from "../services/PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts :Object,
      error : "",
      text : "",
    }
  },
  async created() {
    
    try{
      this.posts = await PostService.getPosts();
    }catch(err){
      this.error = "ZA "+err.message;
      
    }
  },
  methods :{
    async addPost(){
      await PostService.InsertPosts(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id){
      await PostService.DeletePosts(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
}

a {
  color: #42b983;
}
.card-container{
  display: flex;
  justify-content: center;
}

.card{
  border: 2px solid black;
  padding: 10px;
}
</style>
