/*
 * ETML Accessible — Formulaire (version APRÈS)
 * Validation accessible : résumé d'erreurs (role="alert"), aria-invalid +
 * aria-describedby par champ, focus déplacé vers le résumé puis vers le champ
 * cliqué, alternative textuelle au CAPTCHA, message de succès en aria-live.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-apres');
  if (!form) return;

  const summary = form.querySelector('.error-summary');
  const summaryList = summary.querySelector('ul');
  const success = form.querySelector('.success-message');

  const fields = [
    {
      input: document.getElementById('af-nom'),
      error: document.getElementById('af-nom-error'),
      label: 'Nom',
      validate: (v) => v.trim().length > 0,
      message: 'Merci de renseigner votre nom.',
    },
    {
      input: document.getElementById('af-email'),
      error: document.getElementById('af-email-error'),
      label: 'Adresse e-mail',
      validate: (v) => /.+@.+\..+/.test(v),
      message: 'Merci de saisir une adresse e-mail valide (ex. nom@exemple.ch).',
    },
    {
      input: document.getElementById('af-captcha'),
      error: document.getElementById('af-captcha-error'),
      label: 'Question anti-robot',
      validate: (v) => v.trim() === '7',
      message: 'La réponse est incorrecte. Combien font 3 + 4 ?',
    },
  ];

  function clearField(f) {
    f.input.removeAttribute('aria-invalid');
    f.error.hidden = true;
    f.error.textContent = '';
  }

  function setFieldError(f) {
    f.input.setAttribute('aria-invalid', 'true');
    f.error.hidden = false;
    f.error.textContent = '⚠ ' + f.message;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.hidden = true;
    summaryList.innerHTML = '';
    let firstInvalid = null;

    fields.forEach((f) => {
      clearField(f);
      if (!f.validate(f.input.value)) {
        setFieldError(f);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + f.input.id;
        a.textContent = f.message;
        a.addEventListener('click', (ev) => {
          ev.preventDefault();
          f.input.focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
        if (!firstInvalid) firstInvalid = summary;
      }
    });

    if (firstInvalid) {
      summary.hidden = false;
      summary.focus();
    } else {
      summary.hidden = true;
      form.reset();
      success.hidden = false;
      success.focus();
    }
  });
});
