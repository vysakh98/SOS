<template>
<v-data-table
:headers="headers"
:items="items"
class="elevation-1">
<template #body.append="{headers}">
<tr :colspan="headers.length">
<td>Subtotal</td>
<td></td>
<td><v-chip color="blue">{{Sum}}</v-chip></td>
</tr>
</template>
<template #item.Amount="{item}">
<v-edit-dialog @save="save(item.Amount)" :return-value.sync="item.Amount"
        >{{ item.Amount }}
  <template #input>
     <v-text-field v-model="Amount" label="Edit" type="number"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.Organization="{item}">
<v-edit-dialog :return-value.sync="item.Organization"
        >{{ item.Organization }}
  <template #input>
     <v-text-field  v-model="Organization" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.Description="{item}">
<v-edit-dialog :return-value.sync="item.Description"
        >{{ item.Description }}
  <template #input>
     <v-text-field v-model="Description" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #top>
<v-container class="green" id="green">
<h1 class=" white--text">other contributors <span class="btn"><v-btn class="btn" @click="add"><v-icon>add</v-icon></v-btn></span></h1>
</v-container>
</template>
</v-data-table>
</template>

<script>
export default{
props: {
    sos: {
      type: String
    }
  },
	data(){
	return{
	Sum:null,
	Amount:null,
	Description:'',
	Organization:'',
	items:[],
	headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
             {text:'Description',value:'Description'},
             {text:'Amount(€)',value:'Amount'}
          ]

	}
	},
	methods:{
	add(){
	this.items.push({Organization:'',Description:'',Amount:''})
	},
	save(amount){
      console.log(amount)
       this.Sum=this.Sum-amount
      this.Sum=this.Sum+parseInt(this.Amount)
      this.$emit('Subtotal',{total:this.Sum})
  }
	},
	computed:{
OthersPercent:function(){
  let Total=parseInt(this.sos)+this.Sum
  return Math.round((this.Sum/Total)*100)
  }
}
}
</script>

<style scoped>
.elevation-1{
	border:1px solid black;
}
.btn{
position:absolute;
left:80%;
padding-bottom:10px;
}
#footer{
	border-top:1px solid black;
}
#Oi{
	border-bottom: 2px solid red;
}
</style>