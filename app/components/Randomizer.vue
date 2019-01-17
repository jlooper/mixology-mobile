<template>
  <ScrollView>
    <GridLayout rows="auto,auto,auto" style="height:100%" verticalAlignment="top">
      <Label class="page-title" row="0" text="Shake to Create a Cocktail!"/>
      <Button class="page-title" row="1" text="Activate the Shaker" @tap="startAccelerometer()"/>
      <GridLayout class="card" row="2">
        <Label :text="selectedCocktail" textWrap="true"/>
      </GridLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
import cocktails from "~/assets/created-cocktails.json";
import {
  startAccelerometerUpdates,
  AccelerometerData
} from "nativescript-accelerometer";
let accelerometerListening = false;

export default {
  data() {
    return {
      selectedCocktail: "",
      cocktailObject: {},
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
      if (accelerometer && accelerometerListening) {
        accelerometer.stopAccelerometerUpdates();
      }
      accelerometer.startAccelerometerUpdates(
        data => {
          accelerometerListening = true;
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
        console.log("shook");
        this.selectCocktail();
      } else {
        console.log("no shake");
      }
    },
    selectCocktail() {
      this.selectedCocktail = "";
      this.cocktailObject = {};
      let randomCocktail = Math.floor(Math.random() * 500 + 0);
      this.cocktailObject = cocktails[randomCocktail];
      this.selectedCocktail = JSON.stringify(this.cocktailObject.cocktail);
      accelerometer.stopAccelerometerUpdates();
    }
  }
};
</script>