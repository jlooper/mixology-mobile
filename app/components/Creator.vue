<template>
  <ScrollView>
    <GridLayout rows="auto,auto,auto" verticalAlignment="top" style="height:100%">
      <Label class="page-title" row="0" text="Bottoms Up!" />
      <Button
        ref="picbtn"
        class="recipe-card recipe-btn"
        row="1"
        text="Take a Pic"
        @tap="takePicture()"
      />
      <Button
        row="1"
        style="visibility:collapsed"
        ref="recipesbtn"
        class="recipe-card recipe-btn"
        text="Find a Recipe"
        @tap="showRecipes(recipes)"
      />
      <StackLayout class="card" row="2">
        <ListView :items="ingredients" separatorColor="transparent" class="score-card">
          <v-template>
            <StackLayout orientation="horizontal">
              <check-box
                fillColor="white"
                :checked="isChecked"
                @checkedChange="check($event.value,item.text);isChecked = $event.value"
              ></check-box>
              <Label
                class="ingredient-label"
                textWrap="true"
                :text="item.text+' - '+Math.round(item.confidence*100)+'%'"
              />
            </StackLayout>
          </v-template>
        </ListView>

        <Image :src="pictureFromCamera"></Image>
      </StackLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as camera from "nativescript-camera";
import { ImageSource } from "tns-core-modules/image-source";
import RecipeModal from "../components/Modal";

export default {
  data() {
    return {
      pictureFromCamera: null,
      ingredients: [],
      recipeIngredients: [],
      recipeModal: RecipeModal,
      isChecked: false
    };
  },
  components: {
    modalWindow: RecipeModal
  },
  computed: {
    ...mapState(["recipes"])
  },
  methods: {
    ...mapActions(["fetchRecipe"]),

    async setIngredient() {
      await this.fetchRecipe(this.recipeIngredients[0]).then(result => {
        this.$refs.recipesbtn.nativeView.visibility = "visible";
      });
    },
    check(checked, data) {
      this.recipeIngredients = [];
      let capIngredient =
        data.substring(0, 1).toUpperCase() + data.substring(1);
      if (checked) {
        this.recipeIngredients.push(capIngredient);
      } else {
        var index = this.recipeIngredients.indexOf(capIngredient);
        if (index !== -1) this.recipeIngredients.splice(index, 1);
      }
      this.setIngredient();
    },
    showRecipes(recipes) {
      this.$showModal(RecipeModal, {
        props: {
          recipes: recipes
        }
      });
    },
    takePicture() {
      this.ingredients = [];
      this.pictureFromCamera = null;
      camera
        .takePicture({ width: 224, height: 224, keepAspectRatio: true })
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
          localModelFile: "~/assets/models/graph.tflite",
          labelsFile: "~/assets/models/labels.txt",
          maxResults: 12,
          modelInput: [
            {
              shape: [1, 224, 224, 3],
              type: "QUANT"
            }
          ]
        })
        .then(result => {
          console.log(result.result);
          for (var i = 0; i < result.result.length; i++) {
            this.ingredients.push(result.result[i]);
          }
          //this.setIngredient(JSON.stringify(this.ingredients.text))
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
.score-card {
  margin: 5;
  color: white;
  border-radius: 5;
  font-family: Quicksand;
  font-size: 20;
}
.ingredient-label {
  padding: 5;
  margin-bottom: 5;
}
</style>
