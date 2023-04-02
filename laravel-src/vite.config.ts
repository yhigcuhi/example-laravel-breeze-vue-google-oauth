import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            // bladeに記述する @vite(['resources/css/app.css', 'resources/js/app.ts']) ようっぽい
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    // Vueプラグインは、Single File Componentsで
                    // 参照する場合、アセットのURLをLaravelのWebサーバを
                    // 指すように書き換えます。
                    // これを`null`に設定すると、Laravelプラグインは
                    // アセットURLをViteサーバを指すように書き換えます。
                    base: null,

                    // Vueプラグインは、絶対URLを解析し、ディスク上のファイルへの
                    // 絶対パスとして扱います。
                    // これを`false`に設定すると、絶対URLはそのままになり、
                    // 期待通りにpublicディレクトリの中で、アセットへ参照できます。
                    includeAbsolute: false,
                },
            },
        }),
    ],
    // 謎エラー対策
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    // localhost:{WEB port}で起動しているdocker で laravel viteの5173ポートへフォワードするため
    server: {
        host: true
    },
});
