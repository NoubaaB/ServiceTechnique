<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Section" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf015;" />
      <Label class="page__content-placeholder" :text="message" />
      <ListView for="section in $store.state.sections" @itemTap="onItemTap">
        <v-template>
          <Label :text="section.name" />
        </v-template>
      </ListView>
      <Button
        text="Add Section"
        @tap="addSection"
        style="color: white"
        background="#2196F3"
      />
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { SelectedPageService } from "../shared/selected-page-service";
import Sqlite from "nativescript-sqlite";

export default {
  data() {
    return {
      open: "",
      section: {
        id: 0,
        name: "",
        module_id: null,
      },
    };
  },
  mounted: async function () {
    const db = await Sqlite("MyTable");
    this.open = db.isOpen() ? "Yes" : "No";
    SelectedPageService.getInstance().updateSelectedPage("Section");
  },
  computed: {
    message() {
      return "<!-- testament--> " + Sqlite.exists("MyTable");
    },
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onItemTap(event) {
      console.log(event.index);
      console.log(event.item);
    },
    addSection: function () {
      this.section.id++;
      this.section.name = `test-${Math.random()}`;
      this.$store.dispatch("addSection", this.section);
      alert({
        title: "Section Added",
        message: `Section ID ${this.section.id} , Section name ${this.section.name}`,
        okButtonText: "Ok",
      }).then(() => {
        console.log("Alert dialog closed");
      });
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>