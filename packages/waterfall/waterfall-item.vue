<template>
<div class="verney-waterfall-item" ref="verneyWaterfallItem">
    <slot></slot>
</div>
</template>

<script lang='ts'>
export default {
name: 'WaterfallItem',
};
</script>
<script setup lang='ts'>
import { onMounted, nextTick, getCurrentInstance } from 'vue';
let { proxy }: any = getCurrentInstance();

const defaultHeight = 300;
onMounted(() => {
    console.log('====mounted');
    setTimeout(() => {
        nextTick(() => {
            const curRef = proxy.$refs.verneyWaterfallItem;
            if (!curRef) return;
            let postion = curRef.getBoundingClientRect();
            console.log('====postion  verneyWaterfallItem', postion);
            proxy.$emit('update', Math.max(postion.height, defaultHeight));
        })
    }, 200)
});
</script>
<style lang='less' scoped>
.verney-waterfall-item {
    width: 100%;
    height: fit-content;
}
</style>