<template>
  <ScrollView>
    <GridLayout rows="auto,auto,auto" style="height:100%" verticalAlignment="top">
      <Label class="page-title" row="0" text="Bottoms Up!"/>
      <Button class="pic-button" row="1" text="Take a Pic" @tap="takePicture()"/>
      <StackLayout class="card" row="2">
        <Image :src="pictureFromCamera"></Image>
      </StackLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
import {mapActions, mapState} from 'vuex';

import * as camera from "nativescript-camera";
import { ImageSource } from "tns-core-modules/image-source";

export default {
  data() {
    return {
      pictureFromCamera: null
    };
  },
  methods: {
    takePicture() {
      camera
        .takePicture({ width: 300, height: 300, keepAspectRatio: true })
        .then(imageAsset => {
          new ImageSource().fromAsset(imageAsset).then(imageSource => {
            this.pictureFromCamera = imageSource;
            // give the user some time to to see the picture
            setTimeout(() => this.queryMLKit(imageSource), 500);
          });
        });
    },
    queryMLKit(imageSrc) {
      console.log(imageSrc);
      this.$firebase.mlkit.custommodel
        .useCustomModel({
          image: imageSrc,
          localModelFile: "~/assets/models/retrained_graph.tflite",
          labelsFile: "~/assets/models/retrained_labels.txt",
          maxResults: 5,
          modelInput: [
            {
              shape: [1, 224, 224, 3],
              type: "QUANT"
            }
          ]
        }) // others // the only currently supported type of model
        .then(result => {
          alert(JSON.stringify(result.result));
        })
        .catch(errorMessage => {
          alert("ML Kit error: " + errorMessage);
        })
        .catch(err => {
          console.log("Error -> " + err.message);
        });
    }
  }
};
</script>

<style>
.pic-button {
  color: white;
  font-size: 30;
  background-color: #220f55;
  margin: 10 20 10;
  font-family: Quicksand;
}
</style>
