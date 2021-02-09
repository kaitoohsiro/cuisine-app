<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="5">
        <div>
          <v-img :src="cuisine.cuisine_image_url" height="300px" />
          <h3 height="10%" class="text-center ma-5">
            {{ cuisine.cuisine_title }}
          </h3>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="ma-3">
          <v-card-title>材料</v-card-title>

          <v-card-subtitle v-html="cuisine.cooking_ingredient" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="ma-3">
          <v-card-title>調理方法</v-card-title>
          <v-card-subtitle v-html="cuisine.cooking_method" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DetailCard',
  props: ['cuisine'],
}
</script>
