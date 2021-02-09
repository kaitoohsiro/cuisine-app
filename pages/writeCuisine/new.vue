<template>
  <amplify-authenticator>
    <NewCard />
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import NewCard from '../../components/writeCuisine/create'

export default {
  name: 'name',
  components: {
    NewCard,
  },
}
</script>
