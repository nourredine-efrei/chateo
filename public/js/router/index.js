import Vue from 'vue'
import Router from 'vue-router'
import App from '../../../views/App.vue'

Vue.use(Router);

export default new Router({

routes : [

{
path: '/',
name: 'Home',
component: App

},
{
    path: '/register',
    name: 'Register',
    component: () => import ('../../../views/register.vue')
    
    }


]


})

const app = new Vue ({
    Router

}).$mount('@#app')
