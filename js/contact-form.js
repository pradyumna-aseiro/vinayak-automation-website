document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var messages = document.getElementById('form-messages');
  var submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone_number: document.getElementById('phone_number').value.trim(),
      product_name: document.getElementById('website').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    if (messages) {
      messages.className = '';
      messages.textContent = 'Sending your message...';
    }
    if (submitButton) submitButton.disabled = true;

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok, body: body };
        });
      })
      .then(function (result) {
        if (messages) {
          if (result.ok) {
            messages.className = 'success';
            messages.textContent = 'Thank you! Your message has been sent. We will get back to you shortly.';
            form.reset();
          } else {
            messages.className = 'error';
            messages.textContent = (result.body && result.body.error) || 'Something went wrong. Please try again.';
          }
        }
      })
      .catch(function () {
        if (messages) {
          messages.className = 'error';
          messages.textContent = 'Something went wrong. Please check your connection and try again.';
        }
      })
      .finally(function () {
        if (submitButton) submitButton.disabled = false;
      });
  });
});
