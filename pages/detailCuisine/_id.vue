<template>
  <DetailCard :key="cuisine.id" :cuisine="cuisine" />
</template>

<script>
import { API } from 'aws-amplify'
import { getCuisine } from '../../graphql/queries'
import DetailCard from '../../components/readCuisine/detail'

export default {
  components: {
    DetailCard,
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
      // eslint-disable-next-line no-undef
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
