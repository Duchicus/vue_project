<script>
import { mapActions } from 'vuex';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            formData: {
                name: '',
                userName: '',
                email: '',
                password: '',
                dateOfBirth: ''
            }
        };
    },
    methods: {
        ...mapActions('user', ['fetchRegister']),
        async onSubmit() {
            const newFormData = new FormData();
            newFormData.set('name', this.formData.name);
            newFormData.set('userName', this.formData.userName);
            newFormData.set('email', this.formData.email);
            newFormData.set('password', this.formData.password);
            newFormData.set('dateOfBirth', this.formData.dateOfBirth);

            const profilePic = this.$refs.profilePic.files[0];
            if (profilePic) newFormData.set('image', profilePic);

            try {
                await this.fetchRegister(newFormData);
                notification.success({ message: 'Registration successful!' });
                // this.$router.push('/login');
            } catch (error) {
                console.error(error);
                notification.error({ message: 'Registration failed!' });
            }
        }
    }
};
</script>

<template>
    <form class="form" @submit.prevent="onSubmit">
        <p class="title">Register</p>
        <p class="message">Signup now and get full access to our app.</p>
            <label>
                <input required placeholder="Insert your name" type="text" class="input" v-model="formData.name" />
            </label>
            <label>
                <input required placeholder="Insert your username" type="text" class="input"
                    v-model="formData.userName" />
            </label>
        <label>
            <input required placeholder="Insert your email" type="email" class="input" v-model="formData.email" />
        </label>
        <label>
            <input required type="date" class="input" v-model="formData.dateOfBirth" />
        </label>
        <label>
            <input type="file" class="input" ref="profilePic" />
        </label>
        <label>
            <input required placeholder="Insert your password" type="password" class="input"
                v-model="formData.password" />
        </label>
        <button class="submit" type="submit">Submit</button>
        <p class="signin">Already have an account? <router-link to="/login">Signin</router-link></p>
    </form>
</template>

<style scoped>
.form {
    background: #f7f7f7;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
}

.message {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.flex {
    display: flex;
    justify-content: space-between;
}

.flex label {
    width: 48%;
}

label {
    display: block;
    margin-bottom: 15px;
}

.input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
    transition: border-color 0.3s;
}

.input:focus {
    border-color: #007bff;
    outline: none;
}

.submit {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

.submit:hover {
    background: #0056b3;
}

.signin {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}

.signin router-link {
    color: #007bff;
    text-decoration: none;
}

.signin router-link:hover {
    text-decoration: underline;
}
</style>