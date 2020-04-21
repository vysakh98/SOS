<template>
  <v-app>
    <v-content>
      <Source_Funding_Table/>
    </v-content>
  </v-app>
</template>

<script>
import Expected_Source_Funding from './components/Expected_Source_Funding';

export default {
  name: 'App',

  components: {
    'Source_Funding_Table':Expected_Source_Funding
  },

  data: () => ({
    //
  }),
};
</script>
