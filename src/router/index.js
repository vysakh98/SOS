import Vue from 'vue'
import VueRouter from 'vue-router'
import v2 from '@/components/v2.vue'
import v1 from '@/components/Expected_Source_Funding.vue'
import v3 from '@/components/v3.vue'
import v4 from '@/components/v4.vue'
import v5 from '@/components/v5.vue'


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
   component:v3},
   {path:'/v4',
   name:'v4',
   component:v4},

   {path:'/v5',
   name:'v5',
   component:v5}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
