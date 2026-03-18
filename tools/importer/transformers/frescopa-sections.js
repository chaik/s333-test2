/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: frescopa sections.
 * Adds section breaks (<hr>) between content sections.
 * Sections from page-templates.json (5 sections).
 * Selectors from captured DOM at https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const template = payload && payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const doc = element.ownerDocument || document;

    // Process sections in reverse order to avoid DOM position shifts
    const sections = [...template.sections].reverse();

    for (const section of sections) {
      // Skip first section (no <hr> before it)
      if (section.id === template.sections[0].id) continue;

      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;

      for (const sel of selectors) {
        try {
          sectionEl = element.querySelector(sel);
        } catch (e) {
          // Skip invalid selectors
        }
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Insert <hr> before this section to create section break
      const hr = doc.createElement('hr');
      sectionEl.before(hr);
    }
  }
}
