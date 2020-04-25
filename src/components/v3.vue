<template>
<v-container id="top-container">
<h1>Expected Sources of Funding</h1>
<v-data-table
:items="items"
:headers="headers"
class="elevation-1">
<template #item.Percent>
<td><v-chip color="blue" dark>{{Sospercent}}%</v-chip></td>
</template>
<template #item.Amount="{item}">
<v-edit-dialog :return-value.sync="item.Amount"
        >{{ item.Amount }}
  <template #input>
     <v-text-field v-model="Amount" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #body.append={headers}>
<tr>
    <td :colspan="headers.length">
<div><v-app-bar-nav-icon @click="Show=!Show"></v-app-bar-nav-icon></div>
    </td>
</tr>
<tr>
    <td>
<subtable v-show="Show" :sos="Amount" v-on:Subtotal="Total($event)"></subtable>
    </td>
</tr>
</template>
<template #footer>
<div id="footer">
<p>Expected Total Contribution:<v-chip color="blue" dark>{{ExpectedTotal}}</v-chip></p>
</div>
</template>
</v-data-table>
</v-container>
</template>


<script>
import Subtable from "@/components/subtable"
export default{
  data(){
  return{
  total:null,
  Amount:'',
  Show:false,
  headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
          {text:'Amount(€)',value:'Amount'},
          {text:'Percentage',value:'Percent'},],

  items:[{Organization:'SOS',Amount:this.Amount,Percent:''}]

  }
  },
   methods:{
  Total:function(e){
  this.total=e.total
  }
  },
  components:{
  'subtable':Subtable
  },
  computed:{
  ExpectedTotal(){
  return parseInt(this.Amount)+this.total
  },
  Sospercent(){
  let Total=this.total+parseInt(this.Amount)
  return Math.round((this.Amount/Total)*100)
  }
  }
}
</script>
<style scoped>
#addbtn{
position:absolute;
right:70px;
margin-top:5px;
}
#top-container{
  border:1px solid black;
}
#footer{
  border-top:1px solid black;
  padding-top:10px;
}
h1{
text-align:center;
}
</style>