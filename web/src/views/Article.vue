<template>
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <div class="iconfont icon-fanhui-xianxing text-blur" 
            @click="$router.go(-1)"></div>
            <strong class="flex-1 text-ellipsis pr-2 text-blur">
                {{model.name}}
            </strong>
            <div class="text-grey-1 fs-sm">{{model.createdAt | date}}</div>
        </div>
        <div v-html="model.body" class="px-3 body fs-xl"></div>
        <div class="px-3 py-2">
            <div class="d-flex al-centers">
                <i class="iconfont icon-guanlian"></i>
                <strong class="text-blur fs-xl">相关资讯</strong>
            </div>
            <div class="pt-2">
                <router-link :to="`/articles/${item._id}`" tag="div" v-for="item in  model.related" :key="item._id"
                    class="d-flex my-3 fs-lg py-1 fs-lg">
                    <span class="flex-1 text-ellipsis pr-2">{{ item.name }}</span>
                    <span class="text-grey-1">{{item.createdAt | date}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        filters: {
            date(val) {
                return dayjs(val).format('YYYY-MM-DD')
            }
        },
        props: {
            id: {
                required: true
            }
        },
        data() {
            return {
                model: null
            }
        },
        created() {
            this.fetch()
        },
        watch: {
            id: 'fetch'
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/articles/${this.id}`)
                this.model = res.data
            }
        }
    }
</script>

<style lang="scss">
    .page-article {
        .icon-fanhui-xianxing {
            font-size: 1.3846rem;
        }

        .icon-guanlian {
            font-size: 1.5385rem;
        }

        .body {
            img {
                width: 100%;
                height: auto;
            }

            iframe {
                width: 100%;
                height: auto;
            }
        }
    }
</style>