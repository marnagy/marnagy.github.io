let headers = null
let resp = null

const app = Vue.createApp({
    data() {
        return {
            url: 'http://192.168.2.23:5000',
            token: '',
            title: 'Simple Notes App',
            username: '',
            password: '',
        }
    },
    methods: {
        build_ui(){
            const login_form = document.getElementById('login_form')
            login_form.style.display = 'none'
        },
        async login() {
            const method = 'POST'
            //const url = 'https://simplenotes-app.herokuapp.com/login'
            const login_url = this.url + '/api/login'
            const json = {'username': this.username, 'password': this.password}
            
            const response = await fetch(login_url, {
                method: method,
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })

            const resp_json = await response.json()
            this.token = resp_json.access_token

            this.build_ui()
        },
        async hello(){
            const response = await fetch(this.url + '/auth/test')
            const json = await response.json()
            console.log(json)
        },
        async check_login(){
            const response = await fetch(this.url + '/auth/test',{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authentication': 'JWT ' + this.token
                }
            })
            const json = await response.json()
            console.log(json)
        },
    },
});

app.mount('#app')