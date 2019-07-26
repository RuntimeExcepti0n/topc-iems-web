<template> 
  <building-detail :is-edit='true'></building-detail>
</template>
<script>
  import buildingDetail from './components/buildingDetail'
  export default {
    name: 'updateBuilding',
    components: { buildingDetail }
  }
</script>
<style>
</style>
