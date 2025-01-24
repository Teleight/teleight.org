import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TeleightBots",
  description: "Enhancing bot development in java",
  srcDir: "docs",
  lastUpdated: true,
  cleanUrls: true,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => {
          return tag.indexOf("rapi-doc") >= 0;
        },
      },
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          gradle: "vscode-icons:file-type-light-gradle",
          maven: "vscode-icons:file-type-maven",
        },
      }),
    ],
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      level: "deep",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Javadoc", link: "https://javadoc.teleight.org" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Teleight/TeleightBots" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Quick start", link: "/quick-start" },
          { text: "Choosing Update System", link: "/choosing-update-system" },
          { text: "Long Polling Bot", link: "/long-polling" },
          { text: "Webhook Bot", link: "/webhooks" },
        ],
      },
      {
        text: "Features",
        collapsed: false,
        items: [
          { text: "Events", link: "/features/events" },
          { text: "Commands", link: "/features/commands" },
          {
            text: "Conversations",
            link: "/features/conversations/",
            items: [
              {
                text: "Custom properties",
                link: "/features/conversations/custom-properties",
              },
              {
                text: "Instance constraints",
                link: "/features/conversations/instance-constraints",
              },
            ],
          },
          { text: "Menus**", link: "/features/menus" },
          { text: "Logging", link: "/features/logging" },
          { text: "Extensions", link: "/features/extensions" },
          { text: "File downloading", link: "/features/file-downloader" },
          { text: "Scheduler", link: "/features/scheduler" },
        ],
      },
      { text: "API Playground", link: "/playground" },
    ],
  },
});
