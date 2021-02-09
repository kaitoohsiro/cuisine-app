<template>
  <v-flex xs12 sm6 md4>
    <article>
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
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
            <v-btn flat color="red" :to="'/detailCuisine/' + post.id">
              DETAIL
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </article>
  </v-flex>
</template>

<script>
export default {
  name: 'PostCard',
  props: ['post'],
}
</script>
