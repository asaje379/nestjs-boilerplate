const errorDiv = document.getElementById('__dp_error');
const passwordInput = document.getElementById('__dp_password');
const cPasswordInput = document.getElementById('__dp_c_password');
const submitButton = document.getElementById('__dp_submit');
const form = document.getElementById('__dp_form');

const [id] = location.href.split('/').reverse();
console.log(id);

submitButton.disabled = true;

cPasswordInput.addEventListener('input', () => {
  if (passwordInput.value) {
    if (passwordInput.value === cPasswordInput.value) {
      errorDiv.innerHTML = '';
      submitButton.disabled = false;
      return;
    }

    errorDiv.innerHTML = 'Les mots de passe ne correspondent pas';
    submitButton.disabled = true;
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const result = await axios.post('/auth/set-password', {
    id,
    password: passwordInput.value,
  });

  console.log(result);

  if (result.data) {
    alert('Mot de passe défini avec succès');
    location.replace('https://google.bj');
  }
});
