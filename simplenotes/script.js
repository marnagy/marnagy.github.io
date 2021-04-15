let headers = null
let resp = null

const app = Vue.createApp({
    data() {
        return {
            title: 'Simple Notes App',
            username: 'test',
            password: 'password',
        }
    },
    methods: {
        async login() {
            const method = 'POST'
            const url = 'https://simplenotes-app.herokuapp.com/login'
            const json = {'username': this.username, 'password': this.password}

            console.log(json);
            
            const response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: JSON.stringify(json)
            })
            console.log(response)
            headers = response.headers
            const resp_json = await response.json()
            console.log(resp_json)
            // HOW DO I GET SESSIONID ??
        },
        async check_login(){
            const response = await fetch('https://simplenotes-app.herokuapp.com/login')
            const json = await response.json()
            console.log(json)
        },
    },
});

app.mount('#app')