<template>
  <ScrollView>
    <GridLayout rows="auto,auto,auto,auto,auto" verticalAlignment="top">
      <Label class="page-title" row="0" text="Bottoms Up!"/>
      <Button class="pic-button" row="1" text="Take a Pic" @tap="takePicture()"/>
      <StackLayout class="card" row="2">
        <Image :src="pictureFromCamera"></Image>
      </StackLayout>
      <ListView row="3"
        :items="ingredients"
        separatorColor="transparent"
        style="margin-top:10"
        class="score-card"
      >
        <v-template>
          <Label class="label" textWrap="true" :text="item.text+' - '+Math.round(item.confidence*100)+'%'"/>
        </v-template>
      </ListView>
      <Button v-show="ingredients.length" class="pic-button" row="4" text="Find a Recipe" @tap="findRecipe()"/>
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
      pictureFromCamera: null,
      ingredients: []
    };
  },
  methods: {
    takePicture() {
      camera
        .takePicture({ width: 300, height: 300, keepAspectRatio: true })
        .then(imageAsset => {
          new ImageSource().fromAsset(imageAsset).then(imageSource => {
            this.pictureFromCamera = imageSource;
            setTimeout(() => this.queryMLKit(imageSource), 500);
          });
        });
    },
    queryMLKit(imageSrc) {
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
        }) 
        .then(result => {
          console.log(result.result)
            for (var i=0; i<result.result.length; i++){
              this.ingredients.push(result.result[i]);
            }
            console.log(JSON.stringify(this.ingredients))
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
.score-card {
  padding: 10;
	margin: 0 20 5 20;
	color: white;
	background-color: rgb(138, 43, 226);
  border-radius: 5;
  font-family: Quicksand;
  font-size: 25;
}
.label {
  padding: 5;
}
</style>
