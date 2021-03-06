import { $, path, cd } from 'zx'
import del from 'del'
import { series } from 'gulp'

async function clean() {
    await del(['root/.vitepress/dist'])
}

async function build() {
    await $`pnpm build`
}

async function publish() {
    cd(path.resolve(__dirname, 'root/.vitepress/dist'))
    await $`git init`
    await $`git add -A`
    await $`git commit -m 'deploy'`
    await $`git push -f git@github.com:0x009922/sop.git master:gh-pages`
}

export const cleanBuildAndPub = series(clean, build, publish)

export { cleanBuildAndPub as publish }
