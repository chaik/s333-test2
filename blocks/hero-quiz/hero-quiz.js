export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  // Decorate standalone CTA links as buttons
  block.querySelectorAll('p a[href]').forEach((a) => {
    const p = a.closest('p');
    if (p && p.childNodes.length === 1) {
      p.className = 'button-wrapper';
      a.className = 'button primary';
    }
  });
}
