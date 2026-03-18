/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-banner. Base: columns.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: div.frescopa-banner
 *
 * Columns block table structure (from block library):
 *   Row 1: [col1 content, col2 content] - side by side
 *
 * Source DOM: .cmp-frescopa-banner with .cmp-frescopa-banner__image img,
 *   .cmp-frescopa-banner__title (h2), .cmp-frescopa-banner__description,
 *   .cmp-frescopa-banner__cta (a)
 */
export default function parse(element, { document }) {
  // Column 1: Product image
  const img = element.querySelector('.cmp-frescopa-banner__image img');

  // Column 2: Text content
  const heading = element.querySelector('.cmp-frescopa-banner__title, h2');
  const description = element.querySelector('.cmp-frescopa-banner__description');
  const cta = element.querySelector('.cmp-frescopa-banner__cta, a[role="button"]');

  const col1 = [];
  if (img) col1.push(img);

  const col2 = [];
  if (heading) col2.push(heading);
  if (description) col2.push(description);
  if (cta) col2.push(cta);

  const cells = [[col1, col2]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-banner', cells });
  element.replaceWith(block);
}
