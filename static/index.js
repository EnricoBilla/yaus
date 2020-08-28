var app = new Vue({
    el: '#app',
    data: {
        id: '',
        redirect: '',
      },
      methods: {
        addRedirect: async function () {
            const response = await fetch('/api/urls', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id,
                    redirect: this.redirect,
                }),
              });
        }
      }
  })