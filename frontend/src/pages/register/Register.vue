<template>
  <q-page padding>
    <div>
      <p class='top-text text'>Digite seus dados</p>
    </div>
    <div class='container'>
      <form @submit.prevent.stop='onSubmit' @reset.prevent.stop='onReset' class='q-gutter-md form'>
        <div>
          <q-input
            color='black'
            bg-color='white'
            outlined
            bottom-slots
            dense
            v-model='fullname'
            label='Nome completo'
          ></q-input>
          <q-input
            color='black'
            bg-color='white'
            outlined
            bottom-slots
            dense
            v-model='cpf'
            label='CPF'
          ></q-input>
          <q-input
            color='black'
            bg-color='white'
            outlined
            bottom-slots
            dense
            v-model='phone'
            label='Telefone'
          ></q-input>
          <q-input
            color='black'
            bg-color='white'
            outlined
            bottom-slots
            dense
            v-model='password'
            label='Senha'
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class='cursor-pointer'
                @click='isPwd = !isPwd'
              />
            </template>
          </q-input>
          <q-input
            color='black'
            bg-color='white'
            outlined
            dense
            v-model='confirmPassword'
            label='Confirme sua senha'
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class='cursor-pointer'
                @click='isPwd = !isPwd'
              />
            </template>
          </q-input>
        </div>
        <br />
        <br />
        <div>
          <q-btn
            class='glossy full-width'
            color='deep-orange'
            label='CADASTRAR'
            type='submit'
          />
          <br />
          <br />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageRegister',
  data () {
    return {
      fullname: '',
      cpf: '',
      phone: '',
      password: '',
      confirmPassword: '',
      isPwd: true
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('/truck')
    }
  }
}
</script>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center
  }
  .top-text {
    position: absolute;
    left: 11.19%;
    right: 15.57%;
    top: 15.05%;
    bottom: 80.85%;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: #565656;
  }
  .form {
    width: 80%;
    margin-top: 200px;
  }
</style>
