import { QuartzComponent } from "./components/types"
import { ValidLocale } from "./i18n"
import { PluginTypes } from "./plugins/types"
import { Theme } from "./util/theme"

export const baseDir = new URL("..", import.meta.url).pathname

export const plugins: PluginTypes = {
  // 核心插件
  transformers: [
    // 代码高亮
    {
      component: () => import("./plugins/transformers/highlight"),
      type: "transformer",
    },
    // 数学公式
    {
      component: () => import("./plugins/transformers/katex"),
      type: "transformer",
    },
    // 维基链接
    {
      component: () => import("./plugins/transformers/wikilinks"),
      type: "transformer",
    },
    // 反向链接
    {
      component: () => import("./plugins/transformers/backlinks"),
      type: "transformer",
    },
    // 图视图
    {
      component: () => import("./plugins/transformers/graph"),
      type: "transformer",
    },
    // 全文搜索
    {
      component: () => import("./plugins/transformers/search"),
      type: "transformer",
    },
    // 弹出预览
    {
      component: () => import("./plugins/transformers/popover"),
      type: "transformer",
    },
    // 语法高亮
    {
      component: () => import("./plugins/transformers/syntaxhighlighter"),
      type: "transformer",
    },
  ],
  filters: [
    // 排除文件
    {
      component: () => import("./plugins/filters/excludeFiles"),
      type: "filter",
    },
    // 排除目录
    {
      component: () => import("./plugins/filters/excludeDirs"),
      type: "filter",
    },
    // 排除特定文件
    {
      component: () => import("./plugins/filters/excludeFilesBySuffix"),
      type: "filter",
    },
  ],
  emitters: [
    // 默认发射器
    {
      component: () => import("./plugins/emitters/default"),
      type: "emitter",
    },
    // RSS 发射器
    {
      component: () => import("./plugins/emitters/rss"),
      type: "emitter",
    },
    // 站点地图发射器
    {
      component: () => import("./plugins/emitters/sitemap"),
      type: "emitter",
    },
  ],
}

export const components: QuartzComponent[] = [
  // 头部组件
  () => import("./components/Head"),
  () => import("./components/GlobalHeader"),
  () => import("./components/GlobalFooter"),
  () => import("./components/Body"),
  () => import("./components/Content"),
  () => import("./components/Graph"),
  () => import("./components/Explorer"),
  () => import("./components/NotFound"),
  () => import("./components/TagList"),
  () => import("./components/CategoryList"),
  () => import("./components/RecentNotes"),
  () => import("./components/SearchBar"),
  () => import("./components/Backlinks"),
  () => import("./components/Popovers"),
]

export const configuration: GlobalConfiguration = {
  pageTitle: "我的知识库",
  pageTitleSuffix: " - TerryHank",
  enableSPA: true,
  enablePopovers: true,
  analytics: null,
  ignorePatterns: ["content/**/node_modules/**", "content/**/vendor/**"],
  baseUrl: "https://terryhank.github.io/my-wiki",
  theme: "light",
  locale: "zh-CN" as ValidLocale,
}

export interface GlobalConfiguration {
  pageTitle: string
  pageTitleSuffix?: string
  enableSPA: boolean
  enablePopovers: boolean
  analytics: Analytics
  ignorePatterns: string[]
  baseUrl?: string
  theme: Theme
  locale: ValidLocale
}

export interface Analytics {
  provider: "none"
}