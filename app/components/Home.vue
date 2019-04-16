<template>
  <Page class="page" actionBarHidden="true">
    <GridLayout rows="auto, *, auto" columns="*">
      <Image src="~/assets/images/logo.png" width="200" row="0" col="0"/>

      <!-- main components all on top of each other, since only 1 will be visible at any given time -->
      <component
        v-for="component in componentsArray"
        v-show="component === currentComponent"
        :key="component"
        :is="component"
        row="1"
        col="0"
      />

      <GridLayout row="2" col="0" rows="*" columns="*,*,*">
        <!-- Bottom navigation -->
        <StackLayout row="0" col="0" :class="navigationButtonClasses('Designer')">
          <Image @tap="currentComponent = 'Designer'" src="~/assets/images/icon-1.png" height="30"/>
        </StackLayout>

        <!--<StackLayout row="0" col="1" :class="navigationButtonClasses('Identifier')">
          <Image
            @tap="currentComponent = 'Identifier'"
            src="~/assets/images/icon-2.png"
            height="30"
          />
        </StackLayout>-->

        <StackLayout row="0" col="1" :class="navigationButtonClasses('Creator')">
          <Image @tap="currentComponent = 'Creator'" src="~/assets/images/icon-3.png" height="30"/>
        </StackLayout>

        <StackLayout row="0" col="2" :class="navigationButtonClasses('Randomizer')">
          <Image
            @tap="currentComponent = 'Randomizer'"
            src="~/assets/images/icon-4.png"
            height="30"
          />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Designer from "../components/Designer";
//import Identifier from "../components/Identifier";
import Creator from "../components/Creator";
import Randomizer from "../components/Randomizer";

export default {
  data() {
    return {
      currentComponent: "Designer",
      componentsArray: ["Designer", "Creator", "Randomizer"]
    };
  },
  computed: {
    navigationButtonClasses() {
      return component => ({
        "nav-btn": true,
        purple: component === this.currentComponent
      });
    }
  },

  components: {
    Designer,
    //Identifier,
    Creator,
    Randomizer
  }
};
</script>

<style>
</style>
