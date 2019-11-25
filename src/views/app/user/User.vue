<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title>
        <v-btn
          icon
          @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        ค้นหา
      </v-card-title>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="3">
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      outlined dense
                      required></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="3">
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      outlined dense
                      required></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="3">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      outlined dense
                      required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="footer-form">
                    <v-btn
                      class="ma-2"
                      outlined
                      color="indigo"><v-icon>mdi-close</v-icon> ล้าง</v-btn>
                    <v-btn
                      class="ma-2"
                      color="primary"><v-icon>mdi-magnify</v-icon> ค้นหา</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
      sort-by="calories"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar
          flat
          color="white">
          <v-toolbar-title>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  v-on="on">
                  ตัวเลือก <v-icon small>mdi-settings-outline</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="false;">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="createItem">New Item</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style lang="sass">

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { simpleService } from '@/api/SimpleService'

@Component({
  name: 'User'
})
export default class User extends Vue {
  admins: Array<any>;
  show: boolean = true;
  valid: boolean = false;
  firstname: string = '';
  lastname: string = '';
  nameRules: Array<any> = [
    (v: any) => !!v || 'Name is required',
    (v: any) => v.length <= 10 || 'Name must be less than 10 characters'
  ];
  email: string = '';
  emailRules: Array<any> = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /.+@.+/.test(v) || 'E-mail must be valid'
  ];

  dialog: boolean = false;
  selected: Array<any> = [];
  headers: Array<any> = [
    {
      text: 'Dessert (100g serving)',
      align: 'left',
      sortable: false,
      value: 'name'
    },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Actions', value: 'action', sortable: false }
  ];
  desserts: Array<any> = [];
  editedIndex: any = -1;
  editedItem: any = {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0
  };
  defaultItem: any = {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0
  };

  items:Array<any> = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' }
  ]

  constructor() {
    super()

    this.desserts = []
    this.admins = [['Management', 'people_outline'], ['Settings', 'settings']]
  }

  get formTitle() {
    return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  }

  async initialize() {
    simpleService.getDessertList().then(res => {
      console.log('desserts: ', res.data)
      this.desserts = res.data
    })
  }

  editItem(item: any) {
    this.$router.push({
      name: 'user-detail',
      query: item
    })
  }

  createItem() {
    this.$router.push({ name: 'user-detail', query: {} })
  }

  deleteItem(item: any) {
    // const index = this.desserts.indexOf(item)
    confirm('Are you sure you want to delete this item?') &&
      simpleService.deleteDessert(item.id).then(res => {
        this.initialize()
      })
  }

  close() {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }, 300)
  }

  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedItem)
    } else {
      this.desserts.push(this.editedItem)
    }
    this.close()
  }

  async created() {
    console.log('created...')
    this.initialize()
  }

  @Watch('dialog')
  onDialogChange(newVal: any, oldval: any) {
    newVal || this.close()
  }
}
</script>
