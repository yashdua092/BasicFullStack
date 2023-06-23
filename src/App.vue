// colon specifies reference variable.
// frameworks make it easier to communicate and connect to HTML, instead of using document object, HtML is integrated with javascript and makes it easier to communicate with.
// vue transforms Html to its own code(template syntax, under compiles template to highly optimized javascript code).
// v-model, automatically updates the template whenever the model(data) changes and upcates the model whenever the template changes.(2 way binding)
// hence edit and update funciions not required.
// instead of using document object to change the display from block to none and viceversa, we can use v-show
// document shouldnt be used in vue.
// if to use data variable inside methods, need to use -> this, tells inside this vue component.


<template>
    <div id="experiment">
        <div v-show="!isEditMode">
            <h1 >User Profile</h1>
            <img :src="img">

            <span>Name: </span><B id="name">{{ name }}</B>
            <hr/>

            <span>Email: </span><B id="email">{{ email }}</B>
            <hr/>

            <span>Interests: </span><B id="interests">{{ interests }}</B>
            <hr/>

            <button @click="handleEditProfile">Edit Profile</button>
        </div>

        <div v-show="isEditMode">
            <h1 >User Profile</h1>
            <img :src="img">

            <span>Name: </span>
            <!-- <input type="text" id="input-name" :placeholder="name">   -->
            <input type="text" id="input-name" v-model="name">
            <hr/>

            <span>Email: </span>
            <input type="text" id="input-email" v-model="email">
            <hr/>

            <span>Interests: </span>
            <input type="text" id="input-interests" v-model="interests">
            <hr/>

            <button @click="handleUpdateProfile">Update Profile</button>
        </div>
    </div>
</template>

<script>
// since image imported in script, only accessible in script only, so used data function to be used by html code
    import image from "./profile(1).webp"
    export default {
        name: "App",
        data() {
            return {
                img: image,
                name: "",
                email: "",
                interests: "",
                isEditMode: false
            }
        },

        async created() {
            // gets executed automatically when the comonent instance is created.
            const userData = await this.fetchUserProfile() //basically calling a method that is in this compnent, not a global method
            // userdata will be an object conatining name, email and interests.
            this.name = userData.name
            this.email = userData.email
            this.interests = userData.interests
        },

        methods: {
            handleEditProfile() {
            // can be done using one line
                // var name = document.getElementById("name").textContent
                // var inputName = document.getElementById("input-name")
                // inputName.value = name

                // var email = document.getElementById("email").textContent
                // var inputEmail = document.getElementById("input-email")
                // inputEmail.value = email

                // var interets = document.getElementById("interests").textContent
                // var inputInterests = document.getElementById("input-interests")
                // inputInterests.value = interets

                // document.getElementById("edit-view").style.display = "block"
                // document.getElementById("display-view").style.display = "none"
                this.isEditMode = true

            },

            async handleUpdateProfile() {
                // var updatedName = document.getElementById("input-name").value
                // var name = document.getElementById("name")
                // name.textContent = updatedName

                // var updatedEmail = document.getElementById("input-email").value
                // var email = document.getElementById("email")
                // email.textContent = updatedEmail

                // var updatedInterests = document.getElementById("input-interests").value
                // var interests = document.getElementById("interests")
                // interests.textContent = updatedInterests

                // document.getElementById("edit-view").style.display = "none"
                // document.getElementById("display-view").style.display = "block"
                const payload = {
                    name: this.name,
                    email: this.email,
                    interests: this.interests
                    // as these are always updated using v-model
                }
                const resJson = await this.updateUserProfile(payload)
                console.log(resJson)

                this.isEditMode = false 

            },

            async fetchUserProfile() {
                const res = await fetch('get-profile', {
                    method: "GET",
                    // can skip the headers here as default accept is json
                    // and since we are not sending any data so content type also not required.
                })
                return await res.json()
            },

            async updateUserProfile(payload) {
                const res = await fetch("update-profile", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                return await res.json()
            }

        }
    }
</script>

<style>
    h1 {
        font-size: 40px;
    }

    img {
        width: 320px;
        height: 300px;
        display: block;
        margin-bottom: 40px;
    }

    div {
        width: 80%;
        margin: auto;
    }

    input {
        padding: 5px;
        font-size: 15px;
        width: 150px;
    }

    hr {
        width: 400px;
        margin: 20px 0; 
    }

    button {
        width: 160px;
        font-size: 15px;
        height: 45px;
        border-radius: 5px;
        margin-top: 15px;
    }

    button:hover {
        cursor: pointer;
    }

    /* #edit-view {
        display: none;
    } */

    #experiment {
        width: 30%;
        margin: auto;
        background: rgb(255, 255, 139);
        border-radius: 10px;
        padding-bottom: 10px;
    }

</style>