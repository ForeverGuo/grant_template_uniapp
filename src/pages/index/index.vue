<template>
    <view class="content">
        <image class="logo" src="../../static/logo.png"></image>
        <view>
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script lang="ts">
    import {
        defineComponent
    } from "vue";
    export default defineComponent({
        setup() {
            return {
                title: "hello",
            };
        },
    });
</script>

<style lang="scss" scoped>
    .content {
        text-align: center;
        height: 400rpx;
    }

    .logo {
        height: 200rpx;
        width: 200rpx;
        margin-top: 200rpx;
    }

    .title {
        font-size: 36rpx;
        color: $uni-color-primary;
    }
</style>
