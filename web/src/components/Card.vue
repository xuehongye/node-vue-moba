<template>
  <div class="card p-2 bg-white mt-3">
    <div class="d-flex ai-center py-3 mx-3" :class="{'border-bottom': !plain, 'pb-0': plain}">
      <i :class="['iconfont', 'icon-'+icon]"></i>
      <div class="fs-xl flex-1 px-2"><strong>{{ title }}</strong></div>
      <i class="iconfont icon-more" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3 px-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      plain: {
        type: Boolean,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/scss/_variables.scss';

  .card {
    border-bottom: 1px solid $border-color;
  }
</style>