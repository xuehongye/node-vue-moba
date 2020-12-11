<template>
    <m-card :title="title" :icon="icon">
        <div class="nav jc-between">
            <div :class="active === index ? 'nav-item active' : 'nav-item'" v-for="(category, index) in categories"
                :key="index" @click="$refs.list.$swiper.slideTo(index)">
                <div class="nav-link">{{ category.name }}</div>
            </div>
        </div>
        <div class="pt-3">
            <swiper ref="list" :options="{autoHeight: true}" @slide-change="() => active = $refs.list.$swiper.activeIndex">
                <swiper-slide v-for="(category, index) in categories" :key="index">
                    <slot name="items" :category='category'></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: true
        }
    }, 
    data() {
        return {
            active: 0
        }
    }
}
</script>
