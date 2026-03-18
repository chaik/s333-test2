/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-finder. Base: columns.
 * Source: https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 * Selector: div.location-finder
 *
 * Columns block table structure (from block library):
 *   Row 1: [col1 content, col2 content] - side by side
 *
 * Source DOM: .cmp-location-finder with .cmp-location-finder__panel
 *   containing .cmp-location-finder__title (h2) and .cmp-location-finder__label (p),
 *   and .cmp-location-finder__map with map placeholder text.
 *   Interactive elements (input, button, overlays) are not authorable in EDS.
 */
export default function parse(element, { document }) {
  // Column 1: Search panel text content
  const heading = element.querySelector('.cmp-location-finder__title, h2');
  const label = element.querySelector('.cmp-location-finder__label');

  const col1 = [];
  if (heading) col1.push(heading);
  if (label) col1.push(label);

  // Column 2: Map placeholder
  const mapPlaceholder = document.createElement('p');
  mapPlaceholder.textContent = 'Map View';
  const col2 = [mapPlaceholder];

  const cells = [[col1, col2]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-finder', cells });
  element.replaceWith(block);
}
