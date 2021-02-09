<template>
  <amplify-authenticator>
    <EditCard :key="cuisine.id" :cuisine="cuisine" />
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { API } from 'aws-amplify'
import { getCuisine } from '../../graphql/queries'
import EditCard from '../../components/writeCuisine/edit'

export default {
  name: 'Edit',
  components: {
    EditCard,
  },
  data() {
    return {
      cuisine: [],
    }
  },
  created() {
    this.getCuisineDetail()
  },
  methods: {
    async getCuisineDetail() {
      const detailCuisine = await API.graphql({
        query: getCuisine,
        variables: {
          id: this.$route.params.id,
        },
      })
      this.cuisine = detailCuisine.data.getCuisine
    },
  },
}
</script>
