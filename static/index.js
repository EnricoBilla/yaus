var app = new Vue({
    el: '#app',
    data: {
        id: '',
        redirect: '',
        valid_url: true,
        can_submit: false,
        message: '',
        is_error: false,
    },
    methods: {
        addRedirect: async function () {
            var self = this;
            fetch('/api/urls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        id: this.id,
                        redirect: this.redirect,
                }),
            })
            .then(response => response.json())
            .then((response_json) => {
                if (response_json.status === 200 && !!response_json.id) {
                    short_url = `${window.location.origin}/${response_json.id}`
                    if (!!navigator.clipboard) {
                        navigator.clipboard.writeText(short_url)
                        .then(() => {})
                        .catch(() => console.log("Unable to copy to clipboard"));
                    }
                    self.message = `Successfully created a short URL, available here (<a href=${short_url}>${short_url}</a>)`;
                    self.is_error = false;
                } else {
                    self.message = "Unable to create a short URL :(";
                    self.is_error = true;
                }
            });
        },
    },
    watch: {
        redirect: function(val, oldVal) {
            // url regex
            var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            this.valid_url = (val === '' || !!pattern.test(val));
            this.can_submit = !!pattern.test(val);
        }
    }
})