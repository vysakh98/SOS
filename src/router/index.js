import Vue from 'vue'
import VueRouter from 'vue-router'
import v2 from '@/components/v2.vue'
import v1 from '@/components/Expected_Source_Funding.vue'
import v3 from '@/components/v3.vue'


Vue.use(VueRouter)

  const routes = [
  {path:'/v2',
   name:'v2',
   component:v2},
    {path:'/',
   name:'v1',
   component:v1},
   {path:'/v3',
   name:'v3',
   component:v3}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
