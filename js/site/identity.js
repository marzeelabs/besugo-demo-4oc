netlifyIdentity.on('init', (user) => {
  if (!user) {
    netlifyIdentity.on('login', () => {
      window.location = '/admin/';
    });
  }
});
