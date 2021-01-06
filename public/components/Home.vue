<template>
  <div>

   
    <article v-for="article in articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + article.image + ')' }">
        </div>
      </div>
      <div class="article-content" v-if="editingArticle.id !== article.id">
        <div class="article-title">
          <h2>{{ article.nom }}  </h2>
          <div>
            

            
         
           
            
          
           

         <a v-if="isConnected" v-bind:href="'../chat.html?room=' + article.nom ">Rejoindre le tchat </a>
          
    
        
          <button v-if="isConnected" @click="deleteArticle(article.id)">Supprimer</button>
          <button v-if="isConnected" @click="editArticle(article)">Modifier</button>
          </div>
        </div>

      </div>
      <div class="article-content" v-else>
        <div class="article-title">
          <h2><input type="text" v-model="editingArticle.nom"> </h2>
          
          <div>
            <button @click="sendEditArticle()">Valider</button>
            <button @click="abortEditArticle()">Annuler</button>
          </div>
        </div>
  
        <input type="text" v-model="editingArticle.image" placeholder="Lien vers l'image">
      </div>
    </article>
    <form v-if="isConnected" @submit.prevent="addArticle">
      <h2>Ajouter un nouveau film/anime/série</h2>
      <input type="text" v-model="newArticle.nom" placeholder="Nom" required>
 
      <input type="text" v-model="newArticle.image" placeholder="Lien de l'image">
      <button type="submit">Ajouter</button>
    </form>
  </div>

  
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
   
    isConnected: { type: Boolean }
    
  },
  data () {
    return {
      newArticle: {
        nom: '',
        image: ''

      },
      editingArticle: {
        id: -1,
        nom: '',
        image: ''

      }
    }
  },
  methods: {
    addArticle () {
      this.$emit('add-article', this.newArticle)
    },
    deleteArticle (articleId) {
      this.$emit('delete-article', articleId)
    },
    editArticle (article) {
      this.editingArticle.id = article.id
      this.editingArticle.nom = article.nom

      this.editingArticle.image = article.image

    },
   
    sendEditArticle () {
      this.$emit('update-article', this.editingArticle)
      this.abortEditArticle()
    },
    abortEditArticle () {
      this.editingArticle = {
        id: -1,
        nom: '',
        image: ''

      }
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 500px;
  height: 300px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
</style>
