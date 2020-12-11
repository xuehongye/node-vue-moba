<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/884a6acd58c3684a55d84ba059142b50.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/99f665ec1ac02c0f7d1a050ae23e05b3.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/4cf0ecba44fbb677b67e2bdd8da5c873.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-2 mb-3" v-for="(item, index) in navItems" :key="index">
          <i :class="['sprite', item.spriteClass]"></i>
          <div class="py-2">{{ item.name }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card title="新闻资讯" icon="cc-menu-circle" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 d-flex ai-center"
          v-for="(news, index) in category.newsList" :key="index">
          <span
            :style="{color: news.color, border: `1px solid ${news.color}`, padding: '2px', borderRadius: '0.2rem'}">{{ news.categoryName }}</span>
          <span class="flex-1 px-2 text-dark text-ellipsis">{{ news.name }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" icon="-superhero" :categories="heroesCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center heroList"
            v-for="(hero, index) in category.heroList" :key="index">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          autoplay: true,
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        },
        navItems: [{
            name: '爆料站',
            spriteClass: 'sprite-news'
          },
          {
            name: '故事站',
            spriteClass: 'sprite-story'
          },
          {
            name: '周边商城',
            spriteClass: 'sprite-mall'
          },
          {
            name: '体验服',
            spriteClass: 'sprite-cloth'
          },
          {
            name: '新人专区',
            spriteClass: 'sprite-new-people'
          },
          {
            name: '荣耀-传承',
            spriteClass: 'sprite-inherit'
          },
          {
            name: '王者营地',
            spriteClass: 'sprite-camp'
          },
          {
            name: '公众号',
            spriteClass: 'sprite-official-account'
          },
          {
            name: '版本介绍',
            spriteClass: 'sprite-version-info'
          },
          {
            name: '对局环境',
            spriteClass: 'sprite-match '
          },
          {
            name: '无限王者团',
            spriteClass: 'sprite-group'
          },
          {
            name: '创意互动营',
            spriteClass: 'sprite-interaction'
          },
        ],
        newsCats: [],
        heroesCats: []
      }
    },
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      },
      getDate(data) {
        let date = new Date(data)
        let month = date.getMonth() + 1
        let day = date.getDate()
        return (month > 10 ? month : ('0' + month)) + '/' + (day > 10 ? day : ('0' + day))
      }
    },
    created() {
      this.fetchNewsCats()
      this.fetchHerosCats()
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    methods: {
      async fetchNewsCats() {
        const res = await this.$http.get('/news/list')
        this.newsCats = res.data
      },
      async fetchHerosCats() {
        const res = await this.$http.get('/heroes/list')
        this.heroesCats = res.data
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables';

  .pagination-home {
    .swiper-pagination-bullet {
      background: map-get($color, 'white');
      border-radius: 0.1538rem;
      opacity: 1;

      &.swiper-pagination-bullet-active {
        background: map-get($color, 'info');
      }
    }

  }

  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;

      &:nth-child(4n) {
        border-right: none;
      }
    }
  }

  .heroList {
    width: 20%;
  }
</style>