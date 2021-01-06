const Home = window.httpVueLoader('./components/Home.vue')

const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Signup = window.httpVueLoader('./components/SignupForm.vue')
const Test = window.httpVueLoader('./components/test.vue')
const Chat = window.httpVueLoader('./components/Chat.vue')



const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },

  { path: '/chat', component: Chat }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
   
    user: {},
    isConnected: false
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    
    try {
      const res3 = await axios.get('/api/me')
      this.user = res3.data
      this.isConnected = true
    } catch (err) {
      // if (err.response && err.response.statusCode === 401) {
      if (err.response?.status === 401) {
        this.isConnected = false
      } else {
        console.log('error', err)
      }
    }
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
     
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
     
      article.nom = newArticle.nom
      article.image = newArticle.image
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
  
    async login (user) {
      const res = await axios.post('/api/login', user)
      this.user = res.data
      this.isConnected = true
      this.$router.push('/')
    }
  }
})






