/**
 * Accessible Modal Dialog System
 * Site 4: Demo notices for fictional features & external integrations
 */

let lastActiveElement = null;

export function openDemoModal({ title, message, badge = 'DSCG Demonstration Notice' }) {
  const dialog = document.getElementById('demo-modal');
  if (!dialog) return;

  lastActiveElement = document.activeElement;

  const titleEl = dialog.querySelector('.demo-dialog-title');
  const textEl = dialog.querySelector('.demo-dialog-text');
  const badgeEl = dialog.querySelector('.demo-dialog-badge');

  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = message;
  if (badgeEl) badgeEl.textContent = badge;

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }

  const closeBtn = dialog.querySelector('.demo-dialog-close') || dialog.querySelector('.demo-dialog-dismiss');
  if (closeBtn) closeBtn.focus();
}

export function closeDemoModal() {
  const dialog = document.getElementById('demo-modal');
  if (!dialog) return;

  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }

  if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
    lastActiveElement.focus();
  }
}

export function initModals() {
  const dialog = document.getElementById('demo-modal');
  if (!dialog) return;

  const closeBtn = dialog.querySelector('.demo-dialog-close');
  const dismissBtn = dialog.querySelector('.demo-dialog-dismiss');

  if (closeBtn) closeBtn.addEventListener('click', closeDemoModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeDemoModal);

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeDemoModal();
    }
  });

  // Close on Escape key if not handled natively
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDemoModal();
    }
  });

  // Global delegation for demo trigger buttons
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-demo-action]');
    if (!target) return;

    e.preventDefault();
    const action = target.getAttribute('data-demo-action');

    switch (action) {
      case 'book-hotel': {
        const hotelName = target.getAttribute('data-hotel-name') || 'the selected hotel';
        openDemoModal({
          title: `Accommodation Demonstration · ${hotelName}`,
          badge: 'Fictional Hotel Block Demo',
          message: `Demonstration of accommodation booking for ${hotelName}. In a commissioned DSCG client deployment, this button routes directly to your approved hotel room block reservation portal or concierge coordinator.`
        });
        break;
      }
      case 'hotel-directions': {
        const hotelName = target.getAttribute('data-hotel-name') || 'the estate';
        openDemoModal({
          title: `Arrival & Map Notice · ${hotelName}`,
          badge: 'Fictional Navigation Demo',
          message: `Map and GPS routing demonstration for ${hotelName}. On a live client deployment, this opens interactive Google Maps or Apple Maps coordinates specifically configured for your wedding venue.`
        });
        break;
      }
      case 'registry-contribute': {
        const fundName = target.getAttribute('data-fund-name') || 'Gift Fund';
        openDemoModal({
          title: `Registry Demonstration · ${fundName}`,
          badge: 'Fictional Registry Demo',
          message: `Demonstration of registry gift selection for the ${fundName}. On a live client website, this connects securely to your preferred verified registry platform (e.g. Zola, Honeyfund, Target, Crate & Barrel, or custom cash funds). No financial transactions are accepted in this sales demo.`
        });
        break;
      }
      case 'contact-coordinator': {
        openDemoModal({
          title: 'Guest Concierge & Coordination',
          badge: 'Fictional Coordination Contact',
          message: 'Guest coordination contact demonstration. On a commissioned client website, this control opens a direct line to your designated wedding coordinator or destination concierge via verified email, phone, or WhatsApp channel.'
        });
        break;
      }
      case 'qr-photo-upload': {
        openDemoModal({
          title: 'Guest Photo Collection & QR Upload',
          badge: 'Optional ★★★ Enhancement Preview',
          message: 'Guest photo collection demonstration. On a live client website, guests can scan an on-site QR code or click this button to upload celebration photos directly into a shared, private gallery. Uploading is disabled in this fictional sales demonstration.'
        });
        break;
      }
      case 'livestream-preview': {
        openDemoModal({
          title: 'Ceremony Livestream Integration',
          badge: 'Optional ★★★ Enhancement Preview',
          message: 'Private ceremony livestream demonstration. For destination weddings with loved ones abroad, DSCG can configure private password-protected broadcast streaming (YouTube Unlisted, Vimeo Enterprise, or Zoom Events). Broadcasts are simulated in this sales demo.'
        });
        break;
      }
      default:
        break;
    }
  });
}
