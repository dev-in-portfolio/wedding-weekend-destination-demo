/**
 * Optional Enhancement Previews & Interactive Features
 * Site 4: FAQ Accordions, Digital Guestbook Demo, and Multilingual Preview
 */

export function initEnhancements() {
  // 1. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');
    if (!questionBtn || !answerEl) return;

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';
      questionBtn.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        answerEl.setAttribute('hidden', '');
      } else {
        answerEl.removeAttribute('hidden');
      }
    });
  });

  // 2. Interactive Digital Guestbook Preview (Front-end only, zero persistence)
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookList = document.getElementById('guestbook-entries');
  const guestbookNotice = document.getElementById('guestbook-status');

  if (guestbookForm && guestbookList) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('guestbook-author');
      const messageInput = document.getElementById('guestbook-message');
      const author = authorInput ? authorInput.value.trim() : 'Guest';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!message) return;

      const card = document.createElement('div');
      card.className = 'guestbook-card';
      card.innerHTML = `
        <p class="guestbook-card-message">"${escapeHtml(message)}"</p>
        <div class="guestbook-card-meta">
          <span class="guestbook-card-author">${escapeHtml(author)}</span>
          <span class="guestbook-card-date">Just now (Session Preview)</span>
        </div>
      `;

      guestbookList.prepend(card);
      guestbookForm.reset();

      if (guestbookNotice) {
        guestbookNotice.textContent = 'Note displayed in local session preview. No data was submitted or stored because this is a fictional DSCG sales demonstration.';
        guestbookNotice.removeAttribute('hidden');
        setTimeout(() => {
          guestbookNotice.setAttribute('hidden', '');
        }, 6000);
      }
    });
  }

  // 3. Multilingual Content Preview (EN / ES)
  const langButtons = document.querySelectorAll('[data-lang-toggle]');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-toggle');
      langButtons.forEach(b => {
        const isActive = b.getAttribute('data-lang-toggle') === targetLang;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      const translatableElements = document.querySelectorAll('[data-lang-en][data-lang-es]');
      translatableElements.forEach(el => {
        const text = el.getAttribute(`data-lang-${targetLang}`);
        if (text) el.textContent = text;
      });
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
