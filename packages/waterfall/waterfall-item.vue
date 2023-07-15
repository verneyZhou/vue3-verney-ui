<template>
    <div class="verney-waterfall-item" ref="verneyWaterfallItem">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: 'WaterfallItem',
};
</script>
<script setup lang="ts">
import { debounce } from '../utils/util';
import { onMounted, nextTick, getCurrentInstance } from 'vue';
let { proxy }: any = getCurrentInstance();

const defaultHeight = 300;
let timer: any = null;
onMounted(() => {
    console.log('====mounted');
    setTimeout(() => {
        nextTick(() => {
            const curRef = proxy.$refs.verneyWaterfallItem;
            if (!curRef) return;
            console.log(curRef);
            let imgs = curRef.querySelectorAll('img');
            // console.log('====imgs', imgs);
            if (imgs && imgs.length) {
                imgs.forEach((v) => {
                    v.addEventListener('load', () => {
                        // let imgPos = v.getBoundingClientRect();
                        // console.log('====load', imgPos);
                        let postion = curRef.getBoundingClientRect();
                        console.log(
                            '====postion  verneyWaterfallItem',
                            postion
                        );
                        update(postion.height);
                    });
                });
            } else {
                let postion = curRef.getBoundingClientRect();
                console.log('====postion  verneyWaterfallItem', postion);
                update(postion.height);
            }
        });
    }, 200);
});

function update(height = 0) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        proxy.$emit('update', Math.max(height, defaultHeight));
    }, 200);
}

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject(new Error('Image load error'));
        };
        image.crossOrigin = 'Anonymous'; // 支持跨域图片
        image.src = url;
    });
}
</script>
<style lang="less" scoped>
.verney-waterfall-item {
    width: 100%;
    height: fit-content;
}
</style>
