<script setup lang="ts">
import { useData } from "vitepress";
import { onBeforeMount, ComputedRef, ref, watch, computed } from "vue";
import { onMounted } from "vue";

const data = useData();
const url =
    "https://raw.githubusercontent.com/PaulSonOfLars/telegram-bot-api-spec/2f524c948b23c142306cb4177e2841fa2755ca86/api-openapi.yaml";

const theme: ComputedRef<"dark" | "light"> = computed(() =>
    data.isDark.value ? "dark" : "light",
);
const bg_color: ComputedRef<string> = computed(() =>
    data.isDark.value ? "#1b1b1f" : "#ffffff",
);
const nav_bg_color: ComputedRef<string> = computed(() =>
    data.isDark.value ? "#1b1b1f" : "#ffffff",
);

// before html rendering and hydration
onBeforeMount(() => {
    import("rapidoc");
});

// after html rendering and hydration
onMounted(() => {});
</script>

<template>
    <div>
        <rapi-doc
            :spec-url="url"
            render-style="focused"
            :theme
            style="height: 100vh; width: 100%"
            :bg-color="bg_color"
            :nav-bg-color="nav_bg_color"
            primary-color="#949cdf"
            allow-authentication="false"
            allow-spec-url-load="false"
            allow-spec-file-load="false"
            show-header="false"
            show-curl-before-try="true"
            schema-expand-level="2"
            default-schema-tab="example"
            fill-request-fields-with-example="false"
            show-method-in-nav-bar="as-colored-text"
        >
        </rapi-doc>
    </div>
</template>

<style scoped></style>
