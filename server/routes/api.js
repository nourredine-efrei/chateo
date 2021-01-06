const express = require('express')
const router = express.Router()
// const articles = require('../data/articles.js')
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
  user: "tujnfchbsgxwrn",
  password: "151ce1735f91784ef1b15fd0d204923c5d863eb1aa2a47f8803aabeff56d0d8c",
  database: "da43g7rmjqaks6",
  port: 5432,
  host: "ec2-52-213-173-172.eu-west-1.compute.amazonaws.com",
  ssl: { rejectUnauthorized: false }

});

client.connect()

const users = []



router.put('/api/parapluie/:parapluieId', (req, res) => {
  const parapluieId = parseInt(req.params.parapluieId)
  const taille = req.body.taille
  const prix = req.body.prix
  const para = parapluies.find(p => p.id === parapuieId)
  if (!para) {
    res.status(404).send()
    return
  }
  res.json(para)
})





router.post('/login', async (req, res) => {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password

  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  if (result.rows.length === 0) {
    res.status(401).json({
      message: 'user doesnt exist'
    })
    return
  }
  // si on a pas trouvé l'utilisateur
  // alors on le crée
  const user = result.rows[0]

  if (await bcrypt.compare(password, user.password)) {
    // alors connecter l'utilisateur
    req.session.userId = user.id
    res.json({
      id: user.id,
      email: user.email,
      score: user.score
    })
  } else {
    res.status(401).json({
      message: 'bad password'
    })
    return
  }
})

router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  if (result.rows.length > 0) {
    res.status(401).json({
      message: 'user already exists'
    })
    return
  }
  // si on a pas trouvé l'utilisateur
  // alors on le crée

  const hash = await bcrypt.hash(password, 10)

  await client.query({
    text: `INSERT INTO users(email, password, admin, score)
    VALUES ($1, $2, $3, $4)
    `,
    values: [email, hash, false, 0]
  })
  res.send('ok')
})

router.get('/me', async (req, res) => {
  if (typeof req.session.userId === 'undefined') {
    res.status(401).json({ message: 'not connected' })
    return
  }

  const result = await client.query({
    text: 'SELECT id, email FROM users WHERE id=$1',
    values: [req.session.userId]
  })

  res.json(result.rows[0])
})

/


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM category'
  })
  res.json(result.rows)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', async (req, res) => {
  const nom = req.body.nom
  const image= req.body.image
 
  // vérification de la validité des données d'entrée
  if (typeof nom !== 'string' || nom === '' ||
      typeof image !== 'string' || image === '' )
   
      {
    res.status(400).json({ message: 'bad request' })
    return
  }

  // articles.push(article)
  const result = await client.query({
    text: `INSERT INTO category(nom, image)
    VALUES ($1, $2)
    RETURNING *
    `,
    values: [nom, image]
  })
  const id = result.rows[0].id

  // on envoie l'article ajouté à l'utilisateur
  res.json({
    id: id,
    nom: nom,
    image: image
  })
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
async function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const result = await client.query({
    text: 'SELECT * FROM category WHERE id=$1',
    values: [articleId]
  })
  // const article = articles.find(a => a.id === req.articleId)
  if (!result.rows.length) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = result.rows[0]
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, async (req, res) => {
    const nom = req.body.nom
    const image= req.body.image
    const id = req.body.id
   

    console.log('id de la catégorie : ' + req.articleId)
    await client.query({
      text: `UPDATE category
              SET nom=$1,
                  image=$2
              WHERE id=$3
            `,
      values: [nom, image, req.articleId]
    })
    res.send()
  })

  .delete(parseArticle, async (req, res) => {
    await client.query({
      text: 'DELETE FROM category WHERE id=$1',
      values: [req.articleId]
    })
    res.send()
  })

module.exports = router
