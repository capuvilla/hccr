<template>
  <q-page padding>
    <div>
      <p class="top-text">Digite seus dados</p>
    </div>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <div>
        <q-input
          color="black"
          bg-color="white"
          outlined
          bottom-slots
          dense
          v-model="fullname"
          label="Nome completo"
        ></q-input>
        <q-input
          color="black"
          bg-color="white"
          outlined
          bottom-slots
          dense
          v-model="cpf"
          label="CPF"
        ></q-input>
        <q-input
          color="black"
          bg-color="white"
          outlined
          bottom-slots
          dense
          v-model="phone"
          label="Telefone"
        ></q-input>
        <q-input
          color="black"
          bg-color="white"
          outlined
          bottom-slots
          dense
          v-model="password"
          label="Senha"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          color="black"
          bg-color="white"
          outlined
          dense
          v-model="confirmPassword"
          label="Confirme sua senha"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div>
        <q-btn
          class="glossy full-width"
          rounded
          color="deep-orange"
          label="ENTRAR"
          type="submit"
        />
        <br />
        <br />
      </div>
    </form>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
