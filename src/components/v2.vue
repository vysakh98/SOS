<template>
<div id="Source_Funding_Table">
<v-container id="top-container">
<h1>Expected Sources of Funding</h1>
<v-btn @click="dialog=true" id="addbtn"><v-icon fab>add</v-icon></v-btn>
<v-data-table
class="elevation-1 display-1"
:headers='headers'
:items='items'>
<template #item.Percent="{item}">
<td v-if="item.Organization.startsWith('SOS')"><v-chip color="blue" dark>{{SosPercent}}</v-chip></td>
</template>
<template #body.append>
<tr>
<td>Subtotal Other Contributions</td>
<td></td>
<td><v-chip color="blue" dark>{{OthersTotal}}</v-chip></td>
<td><v-chip color="blue" dark>{{OthersPercent}}%</v-chip></td>
</tr>
<tr>
<td>Expected Total Contribution</td>
<td></td>
<td><v-chip color="blue" dark>{{Sum}}</v-chip></td>
<td></td>
</tr>
</template>
</v-data-table>

    <v-dialog
      v-model="dialog"
      max-width="390"
    >
    <v-card class="card">
    <v-card-title>Details</v-card-title>
    <v-form class="form" ref="form">
    <v-text-field v-model="Organization" :rules="[v => !!v || 'Organization required']" label="Organization" @keyup="upper($event)" required></v-text-field>
    <v-text-field class="input" :rules="[v => !!v || 'Amount required']" type="number" v-model="Amount"  label="Amount" required></v-text-field>
    <v-text-field class="input" v-show="JobShow==true" v-model="Description" label="JobTitle"></v-text-field>
    <v-btn  color="success" id="submitbtn" class="mr-4" @click="submit">Submit</v-btn>
    </v-form>
    </v-card>
    </v-dialog>
</v-container>
</div>
</template>

<script>
export default{
data(){
return{
  items:[],
  r:false,
  Percent:0,
  Sum:0,
  Sos:0,
  Description:'',
  dialog:false,
  Organization:'',
  JobShow:true,
  Amount:'',
  headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
          {text:'Description',value:'Description'},
          {text:'Amount(€)',value:'Amount'},
          {text:'Percentage',value:'Percent'},]
}
},
methods:{
  submit:function(){
  if(this.$refs.form.validate()){
  console.log(typeof this.Amount)
  console.log(this.items)
  if(this.Organization.startsWith("SOS")){
  this.Sos=this.Amount
  let data1={Organization:this.Organization,
            Amount:this.Amount,
            Percent:0,
            Description:this.Description}
  let data2={Organization:'OtherContributers'}  
  this.Sum=this.Sum+parseInt(this.Amount)
  this.items.push(data1)
  this.items.push(data2) 
   this.Organization=''
        this.Amount=''
        this.Description=''  
        this.dialog=false
  }
  else{
  this.Sum=this.Sum+parseInt(this.Amount)
  let data={Organization:this.Organization,
            Amount:this.Amount,
            Percent:0,
            Description:this.Description}
        this.items.push(data)
        this.Organization=''
        this.Amount=''
        this.Description=''
        this.dialog=false
    }
  }
  },
  upper(e){
  this.Organization = e.target.value.toUpperCase()
  }
},
watch:{
  Organization(){
  if(this.Organization.startsWith("SOS")){
    this.JobShow=false
  }
  else{
  this.JobShow=true
  }
  }
  },
computed:{
  SosPercent:function(){
  return Math.round((parseInt(this.Sos)/this.Sum)*100)+'%'
  },
  OthersPercent:function(){
  return Math.round(((this.Sum-this.Sos)/this.Sum)*100)
  },
  OthersTotal:function(){
   return this.Sum-this.Sos
  }
}
}
</script>

<style scoped>
.form{
padding:10px;
}
.card{
}
.input{
}
.elevation-1{
  border:1px solid black;
}
input{
  width:30px;
}
h1{
  text-align:center;
}
#addbtn{
position:absolute;
right:70px;
margin-top:5px;
}
#top-container{
}
#others{
  text-align:center;
  border-top:1px solid black;
  padding-top:10px;
}
#submitbtn{
margin-left:150px;
margin-bottom:10px;
}
@media only screen and (max-width: 411px) {
#top-container{
margin-top:30px;
}
}
@media only screen and (max-width: 411px) {
#addbtn{
position:absolute;
right:10px;
top:0px;
}
}
</style>
