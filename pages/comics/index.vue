<template>
  <v-container grid-list-md text-xs-center class="px-4">
    <v-layout row wrap align-center >
      <loading-overlay :value="isLoading"></loading-overlay>
      <v-flex xs12 sm4 md4>
        <v-overflow-btn
          v-model="sortData"
          :items="sorting_items"
          label="Sort By"
          item-text="text"
          hide-details
          v-if="isShow"
          return-object
        ></v-overflow-btn>
      </v-flex>
      <v-flex hidden-xs-only sm4 md4>
        <img src="~/assets/banner.jpg" style="height:100px" v-if="isShow"/>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-autocomplete
          v-model="model"
          :items="items"
          color="blue-grey lighten-2"
          :search-input.sync="search"
          label="Search"
          item-text="title"
          item-value="id"
          v-if="isShow"
        >
          <template
            slot="item"
            slot-scope="data"
          >
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>
                <img :src="data.item.thumbnail.path+variant_small">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex v-for="i in listDataComics" :key="`${i.id}`" xs12 sm3 md3>
        <v-card dark height="370">
          <img  style="padding-top: 5%"
                :src="i.thumbnail.path+variant_xlarge"
          >
          <v-card-text class="px-3">{{i.title}}</v-card-text>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-icon
              slot="activator"
              dark
              @click="viewAction(i.id)"
            >remove_red_eye</v-icon>
            <span>View Detail</span>
          </v-tooltip>
        </v-card>
      </v-flex>
      <v-dialog
        v-model="isShowDialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Information
          </v-card-title>

          <v-card-text>
            {{errorMessages}}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="isShowDialog = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  import services from '@/pages/comics/services'
  import loadingOverlay from '@/pages/common/loading-overlay'

  export default {
    name: 'index',
    components: {
      'loading-overlay': loadingOverlay,
    },
    mounted() {
      this.getListDataComics()
    },
    data() {
      return {
        errorMessages: '',
        isShowDialog: false,
        variant_xlarge: '/portrait_xlarge.jpg',
        variant_small: '/portrait_small.jpg',
        listDataComics: [],
        items: [],
        model: null,
        loadingData: false,
        isLoading: false,
        isShow: false,
        total: 0,
        search: null,
        sortData: null,
        sorting_items: [
          {text:'Title Asc',value:'title'},
          {text:'Issue Number Asc',value:'issueNumber'},
          {text:'Foc Date Asc',value:'focDate'},
          {text:'Onsale Date Asc',value:'onsaleDate'},
          {text:'Modified Asc',value:'modified'},
          {text:'Title Desc',value:'-title'},
          {text:'Issue Number Desc',value:'-issueNumber'},
          {text:'Foc Date Desc',value:'-focDate'},
          {text:'Onsale Date Desc',value:'-onsaleDate'},
          {text:'Modified Desc',value:'-modified'}
        ],
        headers: [
          { text: 'Id', value: 'id', width:'10%', align: 'left'},
          { text: 'Title', value: 'title', width:'25%', align: 'center'},
          { text: 'Description', value: 'description', align: 'center'},
          { text: 'Action',sortable: false, align: 'center'}
          ],
      }
    },
    methods: {
      getListDataComics: function () {
        var param = {
          sortBy: ''
        }
        if(this.sortData != null){
          param.sortBy = this.sortData.value
        }
        this.isLoading = true
        services.getListDataComics(param, this.getListDataComicsCallback)
      },
      getListDataComicsCallback: function (properties) {
        if (properties.IsHttpError === false) {
          this.isLoading = false
          this.isShow = true
          this.listDataComics = []
          this.listDataComics = properties.ResponseData.data.data.results
        }else{
          this.isShowDialog = true
          this.errorMessages = properties.HttpErrorMessage.response.data.message
        }
      },
      searchListDataComics: function (param) {
          this.isLoading = true
          services.searchListDataComics(param, this.searchListDataComicsCallback)
      },
      searchListDataComicsCallback: function (properties) {
        if (properties.IsHttpError === false) {
          this.isLoading = false
          this.isShow = true
          this.items = []
          this.items = properties.ResponseData.data.data.results
        }else{
          this.isShowDialog = true
          this.errorMessages = properties.HttpErrorMessage.data.data.message
        }
      },
      viewAction: function (param) {
        this.$router.push({ path: `/comics/detail/${param}` })
      },
    },
    watch: {
      search (val) {
        if(val.length > 3){
          this.searchListDataComics(val)
        }
      },
      model (val) {
        if(val != null){
          this.viewAction(val)
        }
      },
      sortData (val) {
        if(val != null) {
          this.getListDataComics()
        }
      },
    }

  }
</script>

<style scoped>

</style>
