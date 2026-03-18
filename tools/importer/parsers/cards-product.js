/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product. Base: cards.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: div.container.responsivegrid.flexcolummns
 *
 * Cards block table structure (from block library):
 *   Each row: [image cell, text cell]
 *   Text cell contains: Title (heading) + Description + CTA
 *
 * Source DOM: Container with multiple .teaser children, each with
 *   .cmp-teaser__image img, .cmp-teaser__title (h3 with link),
 *   .cmp-teaser__description, .cmp-teaser__action-link
 */
export default function parse(element, { document }) {
  const teasers = element.querySelectorAll('.teaser');
  const cells = [];

  teasers.forEach((teaser) => {
    // Image cell
    const img = teaser.querySelector('.cmp-teaser__image img, .cmp-image img');

    // Text content cell
    const heading = teaser.querySelector('.cmp-teaser__title, h3');
    const description = teaser.querySelector('.cmp-teaser__description');
    const ctaLinks = Array.from(teaser.querySelectorAll('.cmp-teaser__action-link'));

    const col1 = [];
    if (img) col1.push(img);

    const col2 = [];
    if (heading) col2.push(heading);
    if (description) col2.push(description);
    col2.push(...ctaLinks);

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
