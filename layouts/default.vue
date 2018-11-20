<template>
  <v-app id="keep">
    <v-toolbar
       :clipped-left="$vuetify.breakpoint.lgAndUp"
       dark
       light
       app
       fixed>
      <span class="hidden-sm-and-down">
              <img src="~/assets/marvel-icon-png.png" style="height:40px">
      </span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container class="align-content-center">
        <v-layout>
          <v-flex shrink>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <!--<v-footer-->
      <!--class="pa-3"-->
      <!--color="secondary lighten-2"-->
      <!--app-->
      <!--inset-->
      <!--light-->
    <!--&gt;-->
      <!--<v-layout-->
        <!--dark-->
        <!--justify-center-->
        <!--row-->
        <!--wrap-->
      <!--&gt;-->
        <!--<v-flex-->
          <!--lighten-2-->
          <!--text-xs-center-->
          <!--white&#45;&#45;text-->
          <!--xs12-->
        <!--&gt;-->
          <!--&copy;2018&nbsp;—&nbsp;<strong>Marvel&nbsp;Comics</strong>&nbsp;by&nbsp;<strong>Muhammad Angga Huda Hermawan</strong>&nbsp;v1.0.0-->
        <!--</v-flex>-->
      <!--</v-layout>-->
    <!--</v-footer>-->
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'book', text: 'Comics', link:'comics' }]
    }),
    mounted() {
      this.$router.push({ path: `/comics` })
    },
    props: {
      source: String
    }
  }
</script>

<style scoped>
  #keep main .container {
    height: 660px;
  }

  .navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>
