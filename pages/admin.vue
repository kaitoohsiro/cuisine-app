<template>
  <amplify-authenticator>
    <v-btn depressed color="" to="/writeCuisine/new">
      <v-icon>{{ icon }}</v-icon
      >CREATE
    </v-btn>
    <v-layout row wrap>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </v-layout>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { API } from 'aws-amplify'
import PostCard from '../components/writeCuisine/index'
import { listCuisines } from '../graphql/queries'

export default {
  name: 'Cuisine',
  components: {
    PostCard,
  },
  data() {
    return {
      posts: [],
      icon: 'mdi-pencil',
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
