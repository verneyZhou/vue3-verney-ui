<template>
    <div class='verney-waterfall-wrapper' ref="verneyWaterfallWrapper">
        <div class="left-waterfall-wrapper" ref="leftWaterfallWrapper">
            <template v-if="leftFeedList.length">
                <WaterfallItem v-for="(item, index) in leftFeedList" :key="item[rowKey] || index" @update="(height) => handleWaterfall('left', height)">
                    <slot name="card" :item="item" :index="index"/>
                </WaterfallItem>
            </template>
        </div>
        <div class="right-waterfall-wrapper" ref="rightWaterfallWrapper">
            <template v-if="rightFeedList.length">
                <WaterfallItem v-for="(item, index) in rightFeedList" :key="item[rowKey] || index" @update="(height) => handleWaterfall('right', height)">
                    <slot name="card" :item="item" :index="index"/>
                </WaterfallItem>
            </template>
        </div>
    </div>
</template>

<script lang='ts'>
export default {
    name: 'Waterfall'
};
</script>
<script setup lang='ts'>
    import WaterfallItem from './waterfall-item.vue';
    import { onMounted, ref, watch, nextTick, getCurrentInstance } from 'vue';
    let { proxy }: any = getCurrentInstance();

    const props = defineProps({
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
        rowKey: {
            type: String,
            default: 'id',
        }
    });

    onMounted(() => {
        // console.log('====mounted', props.list);
    });

    let rowKeyList = ref(<any>[]); // 已经获取的瀑布流列表
    let loadingFeedList = ref(<any>[]); // 正在渲染的瀑布流列表
    let leftFeedList = ref(<any>[]);
    let rightFeedList = ref(<any>[]);
    let leftCardWrapperHeight = ref(0);
    let rightCardWrapperHeight = ref(0);
    let waterfallLoading = ref(false); // 是否正在加载瀑布流


    watch(
        () => props.list,
        (list) => {
            console.log('===waterfall==value', list);
            if (list.length === 0) return;
            list.forEach((item: any) => {
                if (!rowKeyList.value.includes(item[props.rowKey])) { // 新的数据
                    rowKeyList.value.push(item[props.rowKey]);
                    loadingFeedList.value.push(item);
                }
            })
            if (waterfallLoading.value) return;
            handleWaterfall('init');
        },
        { immediate: true, deep: true }
    );


    // function init() {
    //     feedList.value = [];
    //     loadingFeedList.value = [];
    //     leftFeedList.value = [];
    //     rightFeedList.value = [];
    //     leftCardWrapperHeight.value = 0;
    //     rightCardWrapperHeight.value = 0;
    //     waterfallLoading.value = false;
    // }

    // 布局
    async function handleWaterfall(type = 'init', height = 0) {
        setTimeout(async () => {
            if (type === 'left') {
                leftCardWrapperHeight.value += height;
            }
            if (type === 'right') {
                rightCardWrapperHeight.value += height;
            }
            if (type === 'init') {
                const leftWrapperPosition: any = await getClientRect('leftWaterfallWrapper');
                const rightWrapperPosition: any = await getClientRect('rightWaterfallWrapper');
                leftCardWrapperHeight.value = leftWrapperPosition ? leftWrapperPosition.height : 0;
                rightCardWrapperHeight.value = rightWrapperPosition ? rightWrapperPosition.height : 0;
            }

            // 加载完毕
            if (loadingFeedList.value.length === 0) {
                waterfallLoading.value = false;
                return;
            };
            if (!waterfallLoading.value) waterfallLoading.value = true;
            let feed: any = loadingFeedList.value.shift();
            if (leftCardWrapperHeight.value <= rightCardWrapperHeight.value) {
                leftFeedList.value.push(feed);
            } else {
                rightFeedList.value.push(feed);
            }


        }, 100)
    }

    // 获取位置信息
    async function getClientRect(refName = '') {
        return new Promise(resolve => {
            nextTick(() => {
                if (!refName) resolve(null);
                const curRef = proxy.$refs[refName];
                if (!curRef) resolve(null);
                let postion = curRef.getBoundingClientRect();
                console.log('====postion', refName, postion);
                resolve(postion || null);
            })
        })
    }


</script>
<style lang='less' scoped>
    .verney-waterfall-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .left-waterfall-wrapper, .right-waterfall-wrapper {
            width: 50%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
    }
</style>