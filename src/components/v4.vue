<template>
<div>
<v-container>
<h1>Expected Sources of Income </h1>
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
     <v-text-field v-model="Amount" label="Edit" type="number"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #body.append="{headers}">
<tr>
 <td :colspan="headers.length">
    <subtable :sos="Amount" v-on:Subtotal="Total($event)"></subtable>
 </td>
</tr>
<tr :colspan="headers.length">
<td>Expected-total</td>
<td></td>
<td><v-chip color="blue" dark>{{ExpectedTotal}}</v-chip></td>
<td></td>
</tr>
<tr :colspan="headers.length">
<td>Others-percent</td>
<td><v-chip color="blue" dark>{{OthersPercent}}%</v-chip></td>
</tr>
</template>
</v-data-table>
</v-container>
</div>
</template>




<script>
import subtable from '@/components/subtable2.vue'
export default{
data(){
return{
   total:null,
   Amount:null,
   items:[{Organization:'SOS',Description:'',Amount:'',Percent:''}],
       headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
           {text:'Percentage',value:'Percent'},
           {text:'Amount(€)',value:'Amount'}]
}
},
methods:{
	Total:function(e){
  this.total=e.total
  }
},
components:{
	'subtable':subtable
},
computed:{
	ExpectedTotal(){
  return parseInt(this.Amount)+this.total
  },
   Sospercent(){
  let Total=this.total+parseInt(this.Amount)
  return Math.round((this.Amount/Total)*100)
  },
  OthersPercent:function(){
  let Total=parseInt(this.Amount)+this.total
  return Math.round((this.total/Total)*100)
  }
}

}

</script>

<style scoped>
.elevation-1{
	border:1px solid black;
}

#green{
	height:50px;
	padding-bottom:10px;
}
#btn{
	position:absolute;
	right:20px;
}
#p1{
	padding-bottom:10px;
}
#footer{
	border:1px solid black;
}


</style>