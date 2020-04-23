<template>
<v-container id="sub-container">
<v-data-table
:headers="headers"
:items="items"
class="elevation-1"
>
<template #item.Amount="{item}">
<v-edit-dialog :return-value.sync="item.Amount"
       @save="save(item.Amount)" >{{ item.Amount }}
  <template #input>
     <v-text-field v-model="Amount" label="Edit"></v-text-field>
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
<template #item.Organization="{item}">
<v-edit-dialog :return-value.sync="item.Organization"
        >{{ item.Organization }}
  <template #input>
     <v-text-field v-model="Organization" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #top>
<v-container class="green" id="green">
<h1 class=" white--text">other contributors <span class="btn"><v-btn class="btn" @click="dialog=true"><v-icon>add</v-icon></v-btn></span></h1>
</v-container>
</template>
<template #footer>
<div id="footer">
<p>Subtotal Other Contributions:<v-chip color="blue" dark>{{Sum}}</v-chip></p>
<p>Percent:<v-chip color="blue" dark>{{OthersPercent}}%</v-chip></p>
</div>
</template>
</v-data-table>
 <v-dialog
      v-model="dialog"
      max-width="390"
    >
    <v-card class="card">
    <v-card-title>Other Contributors Information</v-card-title>
    <v-form class="form" ref="form">
    <v-text-field v-model="Organization" :rules="[v => !!v || 'Organization required']" label="Organization" @keyup="upper($event)" required></v-text-field>
    <v-text-field class="input" :rules="[v => !!v || 'Amount required']" type="number" v-model="Amount"  label="Amount" required></v-text-field>
    <v-text-field class="input"  v-model="Description" label="JobTitle"></v-text-field>
    <v-btn  color="success" id="submitbtn" class="mr-4" @click="submit">Submit</v-btn>
    </v-form>
    </v-card>
    </v-dialog>
</v-container>
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
	Pervamount:null,
	Total:null,
	Sum:0,
	Organization:'',
	Description:'',
	Amount:'',
	items:[],
	headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
          {text:'Description',value:'Description'},
          {text:'Amount(€)',value:'Amount'}],
     dialog:false
	}
},
methods:{
submit:function(){
if(this.$refs.form.validate()){
this.Sum=parseInt(this.Sum)+parseInt(this.Amount)
     let data={Organization:this.Organization,
            Amount:this.Amount,
            Percent:0,
            Description:this.Description}
        this.items.push(data)
        this.Organization=''
        this.Amount=''
        this.Description=''
        this.dialog=false
        this.$emit('Subtotal',{total:this.Sum})
    }
    },
upper(e){
  this.Organization = e.target.value.toUpperCase()
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
#green{
    padding:10px;
	height:50px;
	padding-bottom:10px;
}
.btn{
position:absolute;
right:50px;
}
p{
margin-bottom:0px;

}
.form{
padding:10px;
}
#submitbtn{
margin-left:150px;
margin-bottom:10px;
}
#footer{
	border-top:1px solid black;
	padding-top:10px;
	padding-left:5px;
}	

</style>