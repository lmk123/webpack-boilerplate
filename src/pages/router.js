import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

const router = new VueRouter();

router.map( {
  '/': {
    component: require( './home.vue' )
  }
} );

export default router;
