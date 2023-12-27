import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthPage from './components/AuthPage'
import insertNewAccount from './pages/insertNewAccount'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: AuthPage
    },
    {
        path: '/pageforapi',
        component: insertNewAccount
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})