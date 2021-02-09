<template>
  <v-flex xs12 sm6 md4>
    <article>
      <v-hover>
        <v-card
          class="post"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
          <a :href="'/detailCuisine/' + post.id">
            <v-img
              class="white--text"
              height="170px"
              :src="post.cuisine_image_url"
            />
          </a>
          <v-card-title>
            <div>
              <h2>{{ post.cuisine_title }}</h2>
              <span class="grey--text">{{ post.createdAt }}</span>
              <br />
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <DeleteCard :cardId="post.id" />
            <v-btn flat color="" :to="'/writeCuisine/' + post.id"> EDIT </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </article>
  </v-flex>
</template>

<script>
import DeleteCard from './delete'

export default {
  name: 'PostCard',
  components: {
    DeleteCard,
  },
  props: ['post'],
}
</script>

<style scoped>
.post {
  margin: 20px;
}
</style>
