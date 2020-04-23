<template>
<div>
<h1>Expected Sources of Income </h1>
<v-data-table
:items="items"
:headers="headers">
<template #body.append={headers}>
<tr>
    <td :colspan="headers.length">
         <div class="green"><p>green</p></div>
     </td>
</tr>
</template>
<template #body.append>
<tr>
    <td :colspan="headers.length">
    <div class="blue"><p>blue</p></div>
     </td>
</tr>
</template>
</v-data-table>
</div>
</template>




<script>

export default{
data(){
return{
   items:[{Organization:'text',Description:'',Amount:'',Percent:''}],
       headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
          {text:'Description',value:'Description'},
          {text:'Amount(€)',value:'Amount'},
          {text:'Percentage',value:'Percent'},]
}
}
}

</script>

<style>

</style>