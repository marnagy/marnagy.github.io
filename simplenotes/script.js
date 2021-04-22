const app = Vue.createApp({
    data() {
        return {
            //url: 'https://simplenotes-app.herokuapp.com',
            url: 'http://192.168.2.23:5000',
            token: '',

            title: 'Simple Notes App',
            username: 'test',
            password: 'password',
            notes: []
        }
    },
    methods: {
        async build_ui(){
            const login_form = document.getElementById('login_form')
            login_form.style.display = 'none'

            this.load_notes()
        },
        async load_notes(){
            console.log('Token: ' + this.token);
            const response = await fetch(this.url + '/api/notes', {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + this.token
                }
            })

            const json = await response.json()
            this.notes = json.notes

            const notes_div = document.getElementById('notes_div')
            // remove choldren
            while (notes_div.lastChild){
                notes_div.removeChild(notes_div.lastChild)
            }

            this.notes.forEach(note => {
                const note_div = document.createElement('div')

                note_div.setAttribute('class', 'note_div')
                //note_div.style.clear = 'both'

                //add title
                const note_title = document.createElement('span')
                note_title.innerHTML = note.title
                note_title.display = 'inline-block'
                //note_title.style.float = 'left'
                //note_title.setAttribute('text-align', 'left')

                //add datetime
                const note_datetime = document.createElement('span')
                const date = new Date(note.last_update)
                note_datetime.display = 'inline-block'
                note_datetime.style.float = 'right'
                note_datetime.innerHTML = date.toLocaleTimeString() + ' ' + date.toLocaleDateString()
                //note_datetime.setAttribute('text-align', 'right')

                note_div.appendChild(note_title)
                note_div.appendChild(note_datetime)

                notes_div.appendChild(note_div)
            });
        },
        async login() {
            const method = 'POST'
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

            localStorage.token = this.token

            this.build_ui()
        },
        async hello(){
            const response = await fetch(this.url + '/auth/test')
            const json = await response.json()
            const val = json['Authenticated'] ? 'is' : 'is not'
            alert('The user ' + val + ' authenticated')
        },
        async check_login(){
            console.log('Token: ' + this.token);
            const response = await fetch(this.url + '/auth/test',{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + this.token
                }
            })
            const json = await response.json()
            console.log(json)
        },
    },
});

app.mount('#app')