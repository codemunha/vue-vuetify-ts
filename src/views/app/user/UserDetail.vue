<template>
  <div>
    <div style="margin-bottom: 10px;">
      <v-btn text small @click="back"><v-icon>mdi-keyboard-backspace</v-icon> ย้อนกลับ</v-btn>
    </div>
    <v-card class="mx-auto">
      <v-card-title>
        {{ $t("message.detail") }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4">
                <v-text-field
                  label="Name"
                  v-model="model.name"
                  :rules="rules"
                  outlined
                  dense
                  required></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4">
                <v-text-field
                  label="Calories"
                  v-model="model.calories"
                  :rules="rules"
                  outlined
                  dense
                  required></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4">
                <v-text-field
                  label="Fat"
                  v-model="model.fat"
                  :rules="rules"
                  outlined
                  dense
                  required></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4">
                <v-text-field
                  label="Carbs"
                  v-model="model.carbs"
                  :rules="rules"
                  outlined
                  dense
                  required></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4">
                <v-text-field
                  label="Protein"
                  v-model="model.protein"
                  :rules="rules"
                  outlined
                  dense
                  required></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="footer-form">
                <v-btn
                  class="ma-2"
                  @click="save"
                  color="primary">
                  <v-icon>mdi-check-box-outline</v-icon> {{ $t("message.save") }}
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  @click="reset"
                  color="indigo">
                  <v-icon>mdi-close</v-icon> {{ $t("message.clear") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <ModalConfirm :dialog="_dialog" @ok="handleSave" @close="handleClose"/>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { SimpleService } from '@/api'

@Component({
  name: 'User'
})
export default class UserDetail extends Vue {
  model: any;
  dialog: boolean = false;
  valid: boolean = true;
  rules: Array<any> = [(v: any) => !!v || 'Field is required'];
  constructor() {
    super()
    this.model = {}
  }

  $refs: any = {
    el: HTMLFormElement
  };

  created() {
    let item = this.$route.query
    let id = Number(item.id) || 0

    if (id != 0) {
      SimpleService.getDessert(id).then(res => {
        this.model = res
      })
    }
  }

  save() {
    if (this.$refs.form.validate()) {
      this.dialog = !this.dialog
      // this.snackbar = true
    }
  }

  back() {
    this.$router.push({ name: 'user' })
  }

  get _dialog() {
    return this.dialog
  }

  set _dialog(value: boolean) {
    this.dialog = value
  }

  handleSave(value: boolean) {
    this.dialog = value
    if (this.model.id == undefined) {
      SimpleService
        .saveDessert(this.model)
        .then(res => {
          console.log(res)
          this.$router.push({
            name: 'user'
          })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.$router.push({
        name: 'user'
      })
    }
  }

  handleClose(value: boolean) {
    this.dialog = value
  }

  reset() {
    this.$refs.form.reset()
    this.$refs.form.resetValidation()
  }
}
</script>