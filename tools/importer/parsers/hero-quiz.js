/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-quiz. Base: hero.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: div.teaser:has(#teaser-9faac08052)
 *
 * Hero block table structure (from block library):
 *   Row 1: Background image (single cell)
 *   Row 2: Title + Subheading + CTA (single cell with all content)
 *
 * Source DOM: .cmp-teaser with .cmp-teaser__image img, .cmp-teaser__pretitle,
 *   .cmp-teaser__title (h3), .cmp-teaser__action-link
 */
export default function parse(element, { document }) {
  // Extract background image from teaser image area
  const img = element.querySelector('.cmp-teaser__image img, .cmp-image img');

  // Extract text content
  const pretitle = element.querySelector('.cmp-teaser__pretitle');
  const heading = element.querySelector('.cmp-teaser__title, h1, h2, h3');
  const ctaLinks = Array.from(element.querySelectorAll('.cmp-teaser__action-link'));

  const cells = [];

  // Row 1: Background image (single cell)
  if (img) {
    cells.push([img]);
  }

  // Row 2: All content in a single cell (pretitle + heading + CTA)
  const contentCell = [];
  if (pretitle) contentCell.push(pretitle);
  if (heading) contentCell.push(heading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-quiz', cells });
  element.replaceWith(block);
}
