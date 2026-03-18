/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-offer. Base: hero.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: div.contentfragment.cfoffer
 *
 * Hero block table structure (from block library):
 *   Row 1: Background image (single cell)
 *   Row 2: Title + Subheading + CTA (single cell with all content)
 *
 * Source DOM: Content fragment with .cmp-contentfragment__elements (dl)
 *   containing fields: headline, pretitle, detail, callToAction, ctaUrl, heroImage.
 *   Each field is a div.cmp-contentfragment__element--{fieldName} with dt/dd.
 */
export default function parse(element, { document }) {
  // Helper to extract content fragment field values
  const getFieldValue = (fieldName) => {
    const el = element.querySelector(
      `.cmp-contentfragment__element--${fieldName} dd`,
    );
    return el ? el.textContent.trim() : '';
  };

  const headline = getFieldValue('headline');
  const pretitle = getFieldValue('pretitle');
  const detail = getFieldValue('detail');
  const ctaText = getFieldValue('callToAction');
  const ctaUrl = getFieldValue('ctaUrl');
  const heroImagePath = getFieldValue('heroImage');

  const cells = [];

  // Row 1: Background image from content fragment heroImage field
  if (heroImagePath) {
    const img = document.createElement('img');
    img.src = heroImagePath;
    cells.push([img]);
  }

  // Row 2: All content in a single cell (pretitle + detail + heading + CTA)
  const contentCell = [];

  if (pretitle) {
    const p = document.createElement('p');
    p.textContent = pretitle;
    contentCell.push(p);
  }

  if (detail) {
    const p = document.createElement('p');
    p.textContent = detail;
    contentCell.push(p);
  }

  if (headline) {
    const h2 = document.createElement('h2');
    h2.textContent = headline;
    contentCell.push(h2);
  }

  if (ctaText && ctaUrl) {
    const a = document.createElement('a');
    a.href = ctaUrl;
    a.textContent = ctaText;
    contentCell.push(a);
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-offer', cells });
  element.replaceWith(block);
}
