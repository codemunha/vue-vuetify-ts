<template>
  <div>
    <v-row justify="center">
      <v-dialog :persistent="true"
                v-model="_dialog"
                max-width="290">
        <v-card>
          <v-card-title class="headline">{{ _title }}</v-card-title>

          <v-card-text>
            {{ _description }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="gray darken-1"
              text
              @click="close">
              Cancel
            </v-btn>

            <v-btn
              color="blue darken-1"
              text
              @click="ok">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { simpleService } from '@/api/SimpleService'

@Component({
  name: 'ModalConfirm'
})
export default class ModalConfirm extends Vue {
  @Prop() dialog!: boolean
  @Prop() title!: string
  @Prop() description!: string
  @Prop() type!: string

  get _dialog() {
    return this.dialog
  }

  set _dialog(value: any) {
    this.dialog = value
  }

  get _title() {
    let title: string

    switch (this.type) {
    case 'update':
      title = 'Update'
      break
    case 'delete':
      title = 'Delete'
      break
    case 'cancel':
      title = 'Cancel'
      break
    default:
      title = 'Save'
      break
    }

    return this.title || title
  }

  get _description() {
    let description: string

    switch (this.type) {
    case 'update':
      description = 'Are your sure you want to update ?'
      break
    case 'delete':
      description = 'Are your sure you want to delete ?'
      break
    case 'cancel':
      description = 'Are your sure you want to cancel ?'
      break
    default:
      description = 'Are your sure you want to save ?'
      break
    }

    return this.description || description
  }

  ok() {
    this.$emit('ok', false)
  }

  close() {
    this.$emit('close', false)
  }
}

</script>