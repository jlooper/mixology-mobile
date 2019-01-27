<template>
  <ScrollView>
    <GridLayout rows="auto,auto,auto" style="height:100%" verticalAlignment="top">
      <Label class="page-title" row="0" text="Shake to Create a Cocktail!"/>
      <GridLayout class="card" row="1">
        <ListView
          for="item in selectedCocktail"
          separatorColor="transparent"
          backgroundColor="transparent"
        >
          <v-template>
            <Label class="recipeLabel" textWrap="true" :text="item"/>
          </v-template>
        </ListView>
      </GridLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
import cocktailGroup from "~/assets/created-cocktails.json";
import * as accelerometer from "nativescript-accelerometer";
import * as audio from "nativescript-audio";

const player = new audio.TNSPlayer();

export default {
  data() {
    return {
      playerOptions: {
        audioFile: "~/assets/shake.m4a",
        loop: false
      },
      selectedCocktail: [],
      cocktailObject: {},
      cocktailGroup: cocktailGroup,
      accelerometerListening: false,
      accelerometerValues: {
        x: null,
        y: null,
        z: null
      },
      lastUpdate: 0,
      timeDiff: 0,
      lastShake: 0
    };
  },
  methods: {
    startAccelerometer: function() {
      if (accelerometer && this.accelerometerListening) {
        accelerometer.stopAccelerometerUpdates();
      }
      accelerometer.startAccelerometerUpdates(
        data => {
          this.accelerometerListening = true;
          this.accelerometerValues = data;
          if (data) {
            this.detectShake();
          }
        },
        {
          sensorDelay: "normal"
        }
      );
    },
    detectShake() {
      //a shake is when x goes from negative to positive
      var d = new Date();
      var n = d.getTime();
      var now = n;
      var lastX = 0;
      var lastY = 0;
      var lastZ = 0;
      var interval = 0;
      var lastUpdateLeft = 0;
      var lastUpdateRight = 0;
      if (this.accelerometerValues.x < -0.5) {
        lastUpdateLeft = now;
      } else if (this.accelerometerValues.x > 0.5) {
        lastUpdateRight = now;
      }
      var update = lastUpdateLeft - lastUpdateRight;

      if (update > 0) {
        player
          .playFromFile(this.playerOptions)
          .then(function(res) {
            console.log(res);
          })
          .catch(function(err) {
            console.log("something went wrong...", err);
          });
        let randomCocktail = Math.floor(Math.random() * 260 + 0);
        this.selectCocktail(randomCocktail);
      }
    },
    selectCocktail(randomCocktail) {
      if (this.accelerometerListening) {
        let cocktailObject = this.cocktailGroup[randomCocktail];
        this.parseCocktail(cocktailObject);
      }
    },
    parseCocktail(cocktailObject) {
      let newCocktail = JSON.stringify(cocktailObject.cocktail);
      this.selectedCocktail = [];
      let t = newCocktail.split(",");
      for (var i = 0; i < t.length; i++) {
        console.log(t[i]);
        this.selectedCocktail.push(t[i].replace('"', ""));
      }
      this.accelerometerListening = false;
    }
  },
  created() {
      this.startAccelerometer();
  }
};
</script>

<style>
.recipeLabel {
  font-size: 25;
  font-family: Quicksand;
  margin: 10;
  padding: 5;
}
</style>