/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroQuizParser from './parsers/hero-quiz.js';
import columnsBannerParser from './parsers/columns-banner.js';
import columnsFinderParser from './parsers/columns-finder.js';
import cardsProductParser from './parsers/cards-product.js';
import heroOfferParser from './parsers/hero-offer.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/frescopa-cleanup.js';
import sectionsTransformer from './transformers/frescopa-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-quiz': heroQuizParser,
  'columns-banner': columnsBannerParser,
  'columns-finder': columnsFinderParser,
  'cards-product': cardsProductParser,
  'hero-offer': heroOfferParser,
};

// PAGE TEMPLATE CONFIGURATION (from page-templates.json)
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage template for the site landing page',
  urls: [
    'https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html',
  ],
  blocks: [
    {
      name: 'hero-quiz',
      instances: ['div.teaser:has(#teaser-9faac08052)'],
    },
    {
      name: 'columns-banner',
      instances: ['div.frescopa-banner'],
    },
    {
      name: 'columns-finder',
      instances: ['div.location-finder'],
    },
    {
      name: 'cards-product',
      instances: ['div.container.responsivegrid.flexcolummns'],
    },
    {
      name: 'hero-offer',
      instances: ['div.contentfragment.cfoffer'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero / Coffee Quiz Teaser',
      selector: 'div.teaser:has(#teaser-9faac08052)',
      style: null,
      blocks: ['hero-quiz'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Subscription Banner',
      selector: 'div.frescopa-banner',
      style: null,
      blocks: ['columns-banner'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Location Finder',
      selector: 'div.location-finder',
      style: null,
      blocks: ['columns-finder'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Product Cards',
      selector: 'div.container.responsivegrid.flexcolummns',
      style: null,
      blocks: ['cards-product'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Offer / Promo Banner',
      selector: 'div.contentfragment.cfoffer',
      style: null,
      blocks: ['hero-offer'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn(hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
          });
        });
      } catch (e) {
        console.warn(`Invalid selector for block "${blockDef.name}": ${selector}`);
      }
    });
  });

  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
