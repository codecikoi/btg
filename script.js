const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    menu.classList.toggle('nav__menu--open');
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('nav__menu--open'));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const contactForm = document.querySelector('#contact-form');
const contactNotice = document.querySelector('#contact-form-notice');

if (contactForm && contactNotice) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    contactNotice.hidden = true;
    contactNotice.className = 'contacts__notice';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      contactForm.reset();
      contactNotice.textContent = 'Excellent, we will contact you soon.';
      contactNotice.classList.add('is-success');
      contactNotice.hidden = false;
    } catch (error) {
      contactNotice.textContent = 'Something went wrong. Please try again.';
      contactNotice.classList.add('is-error');
      contactNotice.hidden = false;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send message';
      }
    }
  });
}
