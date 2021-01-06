<template>
  <div>
    <h2>Login</h2>
    <!-- TODO -->
   <form @submit.prevent="loginUser()">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input  v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password"  v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      email: '',
      password: ''
      
    }
  },
  async mounted () {
  },
  methods: {
    async loginUser() {
      this.$emit('login', {
        email: this.email,
        password: this.password,
        score: this.score
       
      })
    } 
  }
}
</script>

<style scoped>
</style>
