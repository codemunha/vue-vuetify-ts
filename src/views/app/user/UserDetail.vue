<template>
  <div>
    {{ this.$route.query }}
    <v-card class="mx-auto">
      <v-card-title>
        รายละเอียด
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
                  <v-icon>mdi-check-box-outline</v-icon> บันทึก
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  @click="reset"
                  color="indigo">
                  <v-icon>mdi-close</v-icon> ล้าง
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
import { simpleService } from '@/api/SimpleService'
import ModalConfirm from '@/components/ModalConfirm.vue'

@Component({
  name: 'User',
  components: {
    ModalConfirm
  }
})
export default class UserDetail extends Vue {
  model: any;
  dialog: boolean = false;
  valid: boolean = true;
  rules: Array<any> = [(v: any) => !!v || 'Field is required'];
  created() {
    this.model = this.$route.query
  }

  $refs: any = {
    el: HTMLFormElement
  };

  save() {
    this.dialog = !this.dialog
  }

  get _dialog() {
    return this.dialog
  }

  set _dialog(value: boolean) {
    this.dialog = value
  }

  handleSave(value: boolean) {
    console.log('value : ', value)
    this.dialog = value
  }

  handleClose(value: boolean) {
    console.log('value : ', value)
    this.dialog = value
  }

  update() {
    console.log(this.model)
    if (this.model.id == undefined) {
      simpleService
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

  validate() {
    if (this.$refs.form.validate()) {
      // this.snackbar = true
    }
  }
  reset() {
    this.$refs.form.reset()
    this.$refs.form.resetValidation()
  }
}
</script>