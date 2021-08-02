import {defineNuxtModule} from '@nuxt/kit'
import {resolve} from 'upath'
import {discoverProjectStyles, getCriticalRules, StyleDefinition} from 'used-styles'

const configKey = 'used-styles'

export default defineNuxtModule({
  name: 'used-styles',
  configKey,
  defaults: {},
  setup(_, nuxt) {
    // Only enable for production
    if (nuxt.options.dev) {
      return
    }

    let styleData: StyleDefinition;
    const buildDir = resolve(nuxt.options.buildDir, 'dist/client/css');
    //
    // const critters = new Critters({
    //   path: resolve(nuxt.options.buildDir, 'dist/client'),
    //   publicPath: nuxt.options.build.publicPath,
    //   ...options.config,
    // })

    // Enable css extraction
    nuxt.options.build.extractCSS = true

    nuxt.hook('render:resourcesLoaded', () => {
      console.log('loading styles from', buildDir);
      styleData = discoverProjectStyles(buildDir);
    })

    const process = async (result: any) => {
      await styleData;
      const inlineCss = getCriticalRules(result.html, styleData);
      console.log('inlines', inlineCss.length, 'bytes')
      result.html = result.html
        ///
        .replace(/<style(.*)<\/style>/mg, '<!--removed style-->')
        .replace('</head>', `<style data-used-styles>${inlineCss}</style></head>`);
    };

    // Add transform step
    nuxt.hook('render:route', async (_url, result) => {
      return process(result);
    });

    nuxt.hook('generate:page', async (result) => {
      return process(result);
    });

    // run at client, somehow
    /**
     import { moveStyles } from 'used-styles/moveStyles';
     moveStyles();
     */
  }
})
