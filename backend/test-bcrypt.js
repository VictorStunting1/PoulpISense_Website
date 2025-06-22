const bcrypt = require('bcrypt');

const password = 'test';
let hash = '$2y$10$02KIiKMpu0YbGbFvHW5iveTM8y0flyCfyrPzTNCNZo.PnJ.qJsJ6K';

// Remplace $2y$ par $2a$ pour la compatibilité Node.js
hash = hash.replace(/^\$2y\$/, '$2a$');

bcrypt.compare(password, hash)
  .then(match => {
    console.log('Le mot de passe correspond au hash ?', match);
  })
  .catch(err => {
    console.error('Erreur bcrypt:', err);
  });