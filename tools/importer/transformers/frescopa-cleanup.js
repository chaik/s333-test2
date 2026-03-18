/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: frescopa cleanup.
 * Removes non-authorable content from Frescopa AEM Sites pages.
 * Selectors from captured DOM at https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // No cookie banners or modals found in captured DOM
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header experience fragment (from captured DOM: div.experiencefragment.header)
    // Remove footer experience fragment (from captured DOM: div.experiencefragment.footer)
    // Remove toast message (from captured DOM: .cmp-page__toastmessagehide)
    // Remove safe elements not needed in import
    WebImporter.DOMUtils.remove(element, [
      'div.experiencefragment.header',
      'div.experiencefragment.footer',
      '.cmp-page__toastmessagehide',
      'noscript',
      'link',
      'iframe',
    ]);
  }
}
