<template>
  <GridLayout rows="auto,auto" verticalAlignment="top">
    <Label class="page-title" row="0" text="Scan a Label!"/>

    <Image
      :src="light"
      row="0"
      class="nav-btn"
      width="20"
      @tap="toggleTorch()"
      horizontalAlignment="right"
    />

    <GridLayout row="1" class="card" rows="2/3*,*">
      <MLKitTextRecognition
        width="75%"
        height="75%"
        class="card"
        row="0"
        verticalAlignment="top"
        :torchOn="torchOn"
        @scanResult="onTextRecognitionResult($event)"
      ></MLKitTextRecognition>

      <StackLayout class="swing" row="0" col="0" width="75%">
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.1)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.2)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.3)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.4)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.5)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.6)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.7)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.8)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 0.9)"
        />
        <Label
          height="1"
          marginBottom="1"
          borderBottomWidth="1"
          bordercolor="rgba(138, 43, 226, 1)"
        />
      </StackLayout>

      <ListView
        :items="blocks"
        separatorColor="transparent"
        row="1"
        col="0"
        style="margin-top:30"
        backgroundColor="transparent"
      >
        <v-template>
          <Label class="result-button" textWrap="true" :text="item.text" col="1" row="3" @tap="getRecipe(item.text)"/>
        </v-template>
      </ListView>
    </GridLayout>
  </GridLayout>
</template>

<script>
import {mapActions, mapState} from 'vuex';

import {
  MLKitRecognizeTextResult,
  MLKitRecognizeTextResultBlock
} from "nativescript-plugin-firebase/mlkit/textrecognition";

export default {
  data() {
    return {
      blocks: {},
      torchOn: false,
      light: "~/assets/images/lightbulb-off.png"
    };
  },
  computed: {
    ...mapState(['recipes']),
  },
  methods: {
    ...mapActions(['fetchRecipe']),
    toggleTorch() {
      if (!this.torchOn) {
        this.torchOn = true;
        this.light = "~/assets/images/lightbulb-on.png";
      } else {
        this.torchOn = false;
        this.light = "~/assets/images/lightbulb-off.png";
      }
    },
    getRecipe(text) {
      this.fetchRecipe(text).then( result => {
        //this.$refs.recipesbtn.nativeView.visibility = "visible";
      })
    },
    onTextRecognitionResult(scanResult) {
      const MLKitRecognizeTextResult = scanResult.value;
      this.blocks = MLKitRecognizeTextResult.blocks;
    }
  }
};
</script>

<style>
.result-button {
  padding: 10;
  margin: 10;
  color: white;
  background-color: rgb(138, 43, 226);
  border-radius: 5;
}

.swing {
  animation-name: swingAnimation;
  animation-duration: 6s;
  animation-iteration-count: 10;
  animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
}

@keyframes swingAnimation {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 300);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
