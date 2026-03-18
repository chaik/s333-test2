var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-quiz.js
  function parse(element, { document: document2 }) {
    const img = element.querySelector(".cmp-teaser__image img, .cmp-image img");
    const pretitle = element.querySelector(".cmp-teaser__pretitle");
    const heading = element.querySelector(".cmp-teaser__title, h1, h2, h3");
    const ctaLinks = Array.from(element.querySelectorAll(".cmp-teaser__action-link"));
    const cells = [];
    if (img) {
      cells.push([img]);
    }
    const contentCell = [];
    if (pretitle) contentCell.push(pretitle);
    if (heading) contentCell.push(heading);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-quiz", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-banner.js
  function parse2(element, { document: document2 }) {
    const img = element.querySelector(".cmp-frescopa-banner__image img");
    const heading = element.querySelector(".cmp-frescopa-banner__title, h2");
    const description = element.querySelector(".cmp-frescopa-banner__description");
    const cta = element.querySelector('.cmp-frescopa-banner__cta, a[role="button"]');
    const col1 = [];
    if (img) col1.push(img);
    const col2 = [];
    if (heading) col2.push(heading);
    if (description) col2.push(description);
    if (cta) col2.push(cta);
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-finder.js
  function parse3(element, { document: document2 }) {
    const heading = element.querySelector(".cmp-location-finder__title, h2");
    const label = element.querySelector(".cmp-location-finder__label");
    const col1 = [];
    if (heading) col1.push(heading);
    if (label) col1.push(label);
    const mapPlaceholder = document2.createElement("p");
    mapPlaceholder.textContent = "Map View";
    const col2 = [mapPlaceholder];
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-finder", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse4(element, { document: document2 }) {
    const teasers = element.querySelectorAll(".teaser");
    const cells = [];
    teasers.forEach((teaser) => {
      const img = teaser.querySelector(".cmp-teaser__image img, .cmp-image img");
      const heading = teaser.querySelector(".cmp-teaser__title, h3");
      const description = teaser.querySelector(".cmp-teaser__description");
      const ctaLinks = Array.from(teaser.querySelectorAll(".cmp-teaser__action-link"));
      const col1 = [];
      if (img) col1.push(img);
      const col2 = [];
      if (heading) col2.push(heading);
      if (description) col2.push(description);
      col2.push(...ctaLinks);
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-offer.js
  function parse5(element, { document: document2 }) {
    const getFieldValue = (fieldName) => {
      const el = element.querySelector(
        `.cmp-contentfragment__element--${fieldName} dd`
      );
      return el ? el.textContent.trim() : "";
    };
    const headline = getFieldValue("headline");
    const pretitle = getFieldValue("pretitle");
    const detail = getFieldValue("detail");
    const ctaText = getFieldValue("callToAction");
    const ctaUrl = getFieldValue("ctaUrl");
    const heroImagePath = getFieldValue("heroImage");
    const cells = [];
    if (heroImagePath) {
      const img = document2.createElement("img");
      img.src = heroImagePath;
      cells.push([img]);
    }
    const contentCell = [];
    if (pretitle) {
      const p = document2.createElement("p");
      p.textContent = pretitle;
      contentCell.push(p);
    }
    if (detail) {
      const p = document2.createElement("p");
      p.textContent = detail;
      contentCell.push(p);
    }
    if (headline) {
      const h2 = document2.createElement("h2");
      h2.textContent = headline;
      contentCell.push(h2);
    }
    if (ctaText && ctaUrl) {
      const a = document2.createElement("a");
      a.href = ctaUrl;
      a.textContent = ctaText;
      contentCell.push(a);
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-offer", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/frescopa-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "div.experiencefragment.header",
        "div.experiencefragment.footer",
        ".cmp-page__toastmessagehide",
        "noscript",
        "link",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/frescopa-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const doc = element.ownerDocument || document;
      const sections = [...template.sections].reverse();
      for (const section of sections) {
        if (section.id === template.sections[0].id) continue;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
          } catch (e) {
          }
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        const hr = doc.createElement("hr");
        sectionEl.before(hr);
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-quiz": parse,
    "columns-banner": parse2,
    "columns-finder": parse3,
    "cards-product": parse4,
    "hero-offer": parse5
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for the site landing page",
    urls: [
      "https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html"
    ],
    blocks: [
      {
        name: "hero-quiz",
        instances: ["div.teaser:has(#teaser-9faac08052)"]
      },
      {
        name: "columns-banner",
        instances: ["div.frescopa-banner"]
      },
      {
        name: "columns-finder",
        instances: ["div.location-finder"]
      },
      {
        name: "cards-product",
        instances: ["div.container.responsivegrid.flexcolummns"]
      },
      {
        name: "hero-offer",
        instances: ["div.contentfragment.cfoffer"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero / Coffee Quiz Teaser",
        selector: "div.teaser:has(#teaser-9faac08052)",
        style: null,
        blocks: ["hero-quiz"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Subscription Banner",
        selector: "div.frescopa-banner",
        style: null,
        blocks: ["columns-banner"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Location Finder",
        selector: "div.location-finder",
        style: null,
        blocks: ["columns-finder"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Product Cards",
        selector: "div.container.responsivegrid.flexcolummns",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Offer / Promo Banner",
        selector: "div.contentfragment.cfoffer",
        style: null,
        blocks: ["hero-offer"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        try {
          const elements = document2.querySelectorAll(selector);
          elements.forEach((element) => {
            pageBlocks.push({
              name: blockDef.name,
              selector,
              element
            });
          });
        } catch (e) {
          console.warn(`Invalid selector for block "${blockDef.name}": ${selector}`);
        }
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
