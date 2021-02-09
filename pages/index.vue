<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </v-layout>
  </v-container>
</template>

<script>
import { API } from 'aws-amplify'
import PostCard from '../components/readCuisine/index'
import { listCuisines } from '../graphql/queries'

export default {
  name: 'Cuisine',
  components: {
    PostCard,
  },
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getCuisine()
  },
  methods: {
    async getCuisine() {
      const posts = await API.graphql({
        query: listCuisines,
      })
      this.posts = posts.data.listCuisines.items
    },
  },
}
</script>
