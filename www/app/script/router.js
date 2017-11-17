/**
 * Created by alone on 17-5-11.
 */
import Index from '../view/index.vue';
import Home from '../view/home.vue';
import Account from '../view/account.vue';
export default [{
    path: '/',
    component: Index,
    children: [{
        path: 'home',
        component: Home
    }, {
        path: 'account',
        component: Account
    }]
}]