const app = Vue.createApp({
    data() {
        return {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            gender: 'male',
            picture: 'https://randomuser.me/api/portraits/men/10.jpg',
        }
    },
    methods: {
        async getUser() {
            const res = await fetch('https://randomuser.me/api')
            const { results } = await res.json()
            const person = results[0]

            //console.log(person)
            this.firstName = person.name.first
            this.lastName = person.name.last
            this.email = person.email
            this.gender = person.gender
            this.picture = person.picture.large
        },
    },
});

app.mount('#app')