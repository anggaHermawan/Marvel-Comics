<template>
  <v-container grid-list-md class="px-2" mb-5>
    <v-layout row wrap>
      <loading-overlay :value="isLoading"></loading-overlay>
        <v-flex xs12 sm4 md4 v-if="isShow">
          <v-card width="auto" contain>
            <v-img :src="pathImg" height="500" contain></v-img>
          </v-card>
        </v-flex>
        <v-flex xs12 sm8 md8 v-if="isShow">
          <v-card width="900">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{dataComic.title}}</h3>
              </div>
            </v-card-title>
            <h2 style="margin-left: 3%">Description</h2>
            <v-card-text>
              {{dataComic.description}}
            </v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6 md6>
                <h2 style="margin-left: 3%">Creator</h2>
                <v-card-text>
                  <div v-for="i in dataComic.creators.items" :key="`${i.resourceURI}`">
                    <strong>Name</strong>: {{ i.name }} &nbsp;
                    <strong>Role</strong>: {{ i.role }}
                  </div>
                </v-card-text>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <h2 style="margin-left: 3%">Issue Number</h2>
                <v-card-text>
                  {{dataComic.issueNumber}}
                </v-card-text>
                <h2 style="margin-left: 3%">isbn</h2>
                <v-card-text>
                  {{dataComic.isbn}}
                </v-card-text>
                <h2 style="margin-left: 3%">pages</h2>
                <v-card-text>
                  {{dataComic.pageCount}}
                </v-card-text>
                <h2 style="margin-left: 3%">Published</h2>
                <v-card-text>
                  <div v-for="i in dataComic.dates" :key="`${i.type}`" v-if="i.type === 'onsaleDate'">
                    <strong>{{ new Date(i.date) | moment("DD MMM YYYY") }}</strong>
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>

            <v-card-actions>
              <v-btn light color="secondary lighten-2" @click="onBack">
                Back
                <v-icon right dark>undo</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>

</template>

<script>

  import services from '@/pages/comics/services'
  import loadingOverlay from '@/pages/common/loading-overlay'

  export default {
    name: 'index',
    layout: 'secure',
    mounted(){
      this.getDetailComics()
    },
    components: {
      'loading-overlay': loadingOverlay,
    },
    data () {
      return {
        id: this.$route.params.id,
        isLoading: false,
        variant_detail: '/detail.jpg',
        dataComic: {},
        pathImg: '',
        isShow: false,
      }
    },
    methods: {
        getDetailComics: function(){
          this.isLoading = true
          services.getDetailDataComics(this.id, this.getDetailComicsCallback)
        },
        getDetailComicsCallback: function (properties) {
          if (properties.IsHttpError === false) {
            this.isShow = true
            this.isLoading = false
            this.isShow = true
            this.dataComic = {}
            this.dataComic = properties.ResponseData.data.data.results[0]
            this.pathImg = this.dataComic.thumbnail.path + this.variant_detail
          }else{
            this.isShowDialog = true
            this.errorMessages = properties.HttpErrorMessage.data.data.message
          }
        },
      onBack: function () {
        this.$router.push({ path: `/comics/` })
      }
    }
  }
</script>

<style scoped>

</style>
