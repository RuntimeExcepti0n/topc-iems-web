<template> 
  <building-detail :is-edit='false'></building-detail>
</template>
<script>
  import buildingDetail from './components/buildingDetail'
  export default {
    name: 'addBuilding',
    components: { buildingDetail }
  }
</script>
<style>
</style>
