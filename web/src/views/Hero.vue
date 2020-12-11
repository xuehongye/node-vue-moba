<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
            <img src="../assets/images/logo.png" alt="" height="30">
            <div class="px-3 flex-1 d-flex ai-center">
                <div class=" pb-1 mr-3 pr-3">王者荣耀</div>
                <div class="fs-md">攻略战</div>
            </div>
            <router-link tag="div" to='/' class="d-flex ai-center">更多英雄 <span class="fs-xxxl ml-2">&gt;</span>
            </router-link>
        </div>
        <div class="top" :style="{'background-image': `url(${model.banner})`}">
            <div class="info text-white p-3 fs-sm d-flex flex-column jc-end h-100">
                <div>{{ model.title }}</div>
                <h3 class="my-1">{{ model.name }}</h3>
                <div>{{ model.categories.map(v => v.name).join('/') }}</div>
                <div class="d-flex jc-between pt-2">
                    <div class="scores d-flex ai-center" v-if="model.scores">
                        <span>难度</span>
                        <span class="badge bg-primary">{{ model.scores.difficult }}</span>
                        <span>技能</span>
                        <span class="badge bg-blur-1">{{ model.scores.skills }}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger">{{ model.scores.attack }}</span>
                        <span>生存</span>
                        <span class="badge bg-dark">{{ model.scores.survive }}</span>
                    </div>
                    <router-link to='/' tag="span" class="text-grey-1">
                        皮肤：2 &gt;
                    </router-link>
                </div>
            </div>
        </div>
        <!-- end of top -->
        <div>
            <div class="px-3 bg-white">
                <div class="nav d-flex jc-around border-bottom pt-3 pb-2">
                    <div class="nav-item active">
                        <div class="nav-link">英雄初识</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">进阶攻略</div>
                    </div>
                </div>
            </div>
            <swiper>
                <swiper-slide>
                    <div>
                        <div class="bg-white p-2 border-bottom">
                            <div class="d-flex pt-1 px-2">
                                <router-link tag="button" to='/' class="btn btn-lg flex-1">
                                    <i class="iconfont icon-cc-menu-circle"></i>
                                    英雄介绍视频
                                </router-link>
                                <router-link tag="button" to='/' class="btn btn-lg flex-1 ml-2">
                                    <i class="iconfont icon-cc-menu-circle"></i>
                                    一图识英雄
                                </router-link>
                            </div>
                            <!-- skills -->
                            <div class="skills mt-4">
                                <div class="d-flex jc-around pt-2">
                                    <img :src="item.icon" alt="" v-for="(item, i) in model.skills" :key="item.id" :class="currentSkillIndex === i ? 'icon active' : 'icon'"
                                        @click="currentSkillIndex = i">
                                </div>
                                <div v-if="currentSkill" class="px-2">
                                    <div class="d-flex ai-center pt-2">
                                        <h3>{{ currentSkill.name }}</h3>
                                        <span class="text-grey-1 ml-4">
                                            （冷却值：{{currentSkill.delay}}
                                            消耗：{{currentSkill.cost}}）
                                        </span>
                                    </div>
                                    <p class="text-dark">{{ currentSkill.description }}</p>
                                    <div class="border-bottom"></div>
                                    <p class="text-grey-1">小提示：{{ currentSkill.tips }}</p>
                                </div>
                            </div>

                        </div>

                        <m-card plain icon='cc-menu-circle' title="出装推荐" class="hero-items">
                            <div class="fs-xl">顺风出装</div>
                            <div class="d-flex jc-around text-center mt-3">
                                <div v-for="item in model.items1" :key="item.name">
                                    <img :src="item.icon" alt="" class="icon">
                                    <div class="fs-sm mt-2">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="border-bottom mt-3"></div>
                            <div class="fs-xl mt-3">逆风出装</div>
                            <div class="d-flex jc-around text-center mt-3">
                                <div v-for="item in model.items2" :key="item.name">
                                    <img :src="item.icon" alt="" class="icon">
                                    <div class="fs-sm mt-2">{{ item.name }}</div>
                                </div>
                            </div>
                        </m-card>
                        <m-card plain icon='cc-menu-circle' title="使用技巧">
                            <p class="m-0">{{ model.usageTips }}</p>
                        </m-card>
                        <m-card plain icon='cc-menu-circle' title="对抗技巧">
                            <p class="m-0">{{ model.battleTips }}</p>
                        </m-card>
                        <m-card plain icon='cc-menu-circle' title="团战思路">
                            <p class="m-0">{{ model.teamTips }}</p>
                        </m-card>
                        <m-card plain icon='cc-menu-circle' title="英雄关系">
                            <div class="fs-xl">最佳搭档</div>
                            <div class="d-flex jc-between pt-3" v-for="item in model.partners" :key="item.name">
                                <img :src="item.hero.avatar" alt="" width='50' height="50">
                                <p class="m-0 ml-3">{{item.description}}</p>
                            </div>
                            <div class="border-bottom mt-3"></div>
                        </m-card>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                required: true
            }
        },
        data() {
            return {
                model: null,
                currentSkillIndex: 0
            }
        },
        computed: {
            currentSkill() {
                return this.model.skills[this.currentSkillIndex]
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/heroes/${this.id}`)
                this.model = res.data
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .page-hero {
        .top {
            height: 50vw;
            background: #fff no-repeat top center;
            background-size: auto 100%;
        }

        .info {
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

            .scores {
                .badge {
                    margin: 0 0.25rem;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    line-height: 0.9rem;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 0.4rem;
                    border: 1px solid rgba(255, 255, 255, 0.3)
                }
            }
        }

        .skills {
            img.icon {
                width: 66px;
                height: 66px;
                border: 3px solid map-get($color, 'white');
                border-radius: 45%;

                &.active {
                    border-color: map-get($color, 'primary');

                }
            }
        }
        .hero-items{
           img.icon{
               width: 45px;
               height: 45px;
               border-radius: 50%;
           } 
        }
    }
</style>