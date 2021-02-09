<template>
  <div>
    <div>
      <v-card flat>
        <v-form ref="form" @submit.prevent="submit">
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.first"
                  :rules="rules.name"
                  color="purple darken-2"
                  label="Cooking name"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <input v-if="view" type="file" @change="confirmImage" />
                <p v-if="confirmedImage">
                  <img class="img" :src="confirmedImage" alt />
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </div>
    <v-container>
      <v-row>
        <v-col col="12">
          <h2 class="cook">Cooking Ingredient</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="6">
          <div class="container">
            <no-ssr placeholder="Loading Your Editor...">
              <vue-editor
                id="editor"
                v-model="cookingIngredient"
                use-custom-image-handler
                @imageAdded="handleImageAdded"
              />
            </no-ssr>
          </div>
        </v-col>
        <v-col col="6">
          <p class="preview">preview</p>
          <div v-html="cookingIngredient" />
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <h2 class="cook">Cooking Method</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="6">
          <div class="container">
            <no-ssr placeholder="Loading Your Editor...">
              <vue-editor
                v-model="cookingMethod"
                use-custom-image-handler
                @imageAdded="handleImageAdded"
              />
            </no-ssr>
          </div>
        </v-col>
        <v-col col="6">
          <p class="preview">preview</p>
          <div v-html="cookingMethod" />
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="blue-grey" class="ma-2 white--text" @click="pushData">
      Upload
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import { API, Storage } from 'aws-amplify'
import { updateCuisine } from '../../graphql/mutations'
import awsmobile from '../../aws-exports'

export default {
  name: 'EditCard',
  props: ['cuisine'],
  data() {
    const defaultForm = Object.freeze({
      first: this.cuisine.cuisine_title,
    })
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        name: [(val) => (val || '').length > 0 || 'This field is required'],
      },
      error: '',
      message: '',
      file: '',
      confirmedImage: this.cuisine.cuisine_image_url,
      view: true,
      cookingIngredient: this.cuisine.cooking_ingredient,
      cookingMethod: this.cuisine.cooking_method,
      loader: null,
      loading3: false,
      imageUrl: this.cuisine.cuisine_image_url,
      changeImage: 0,
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
  },
  methods: {
    confirmImage(event) {
      this.message = ''
      this.file = event.target.files[0]
      if (!this.file.type.match('image.*')) {
        this.message = '画像ファイルを選択して下さい'
        this.confirmedImage = ''
        return
      }
      this.createImage(this.file)
    },
    createImage(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.confirmedImage = e.target.result
      }
      this.changeImage = 1
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('image', file)
      const config = {
        headers: {
          // header setting
        },
      }
      this.$axios
        .$post('/api_url', formData, config)
        .then((result) => {
          const url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    async pushData() {
      if (
        // eslint-disable-next-line eqeqeq
        this.form.first == '' ||
        // eslint-disable-next-line eqeqeq
        this.imageUrl == '' ||
        // eslint-disable-next-line eqeqeq
        this.cookingIngredient == '' ||
        // eslint-disable-next-line eqeqeq
        this.cookingMethod == ''
      ) {
        this.error = 'データが入っていない項目があります。'
        return
      }
      const filePath = `cuisine/${this.file.name}`
      const imageUrlDefault =
        'https://' +
        awsmobile.aws_user_files_s3_bucket +
        '.s3-' +
        awsmobile.aws_user_files_s3_bucket_region +
        '.amazonaws.com/public/' +
        filePath
      // eslint-disable-next-line eqeqeq
      if (this.changeImage === 1) {
        await Storage.put(filePath, this.file).then((result) => {
          this.imageUrl = imageUrlDefault + filePath
        })
      }
      const cuisineInfo = {
        id: this.cuisine.id,
        cuisine_title: this.form.first,
        cuisine_image_url: this.imageUrl,
        cooking_ingredient: this.cookingIngredient,
        cooking_method: this.cookingMethod,
      }
      await API.graphql({
        query: updateCuisine,
        variables: { input: cuisineInfo },
      })
      window.location.href = '/detailCuisine/' + this.cuisine.id
    },
  },
}
</script>

<style>
.preview,
.cook {
  color: #e65100;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
