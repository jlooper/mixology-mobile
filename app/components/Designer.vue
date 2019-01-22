<template>
  <ScrollView>
    <GridLayout rows="auto,auto" verticalAlignment="top">
      <Label class="page-title" row="0" text="What's in my bar?"/>

      <GridLayout row="1" class="card" columns="*,*" rows="*,*,*">
        <StackLayout
          class="bottle"
          orientation="vertical"
          col="0"
          row="0"
          @tap="setIngredient('Gin')"
        >
          <Image src="~/assets/images/gin.png"/>
          <Label text="Gin"/>
        </StackLayout>
        <StackLayout
          class="bottle"
          orientation="vertical"
          col="1"
          row="0"
          @tap="setIngredient('Bourbon')"
        >
          <Image src="~/assets/images/bourbon.png"/>
          <Label text="Bourbon"/>
        </StackLayout>

        <StackLayout
          orientation="vertical"
          class="bottle"
          col="0"
          row="1"
          @tap="setIngredient('Brandy')"
        >
          <Image src="~/assets/images/brandy.png"/>
          <Label text="Brandy"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          class="bottle"
          col="1"
          row="1"
          @tap="setIngredient('Scotch')"
        >
          <Image src="~/assets/images/scotch.png"/>
          <Label text="Scotch"/>
        </StackLayout>

        <StackLayout
          orientation="vertical"
          class="bottle"
          col="0"
          row="2"
          @tap="setIngredient('Vodka')"
        >
          <Image src="~/assets/images/vodka.png"/>
          <Label text="Vodka"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          ref="cognac"
          class="bottle"
          col="1"
          row="2"
          @tap="setIngredient('Cognac')"
        >
          <Image src="~/assets/images/cognac.png"/>
          <Label text="Cognac"/>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>

import {mapState, mapActions, mapGetters} from 'vuex';

const IngredientList = {
  props: ["recipe"],
  template: `
            <ModalStack class="modal-container">
                <GridLayout class="modal-card modal" rows="auto,auto" verticalAlignment="middle"  style="height:60%">
                    <Button row="0" @tap="$modal.close" class="fa close" text="x" horizontalAlignment="right" />
                    <Label row="1" :text="recipe.name"/>
                </GridLayout>
            </ModalStack>
      `,
};
export default {
  data() {
    return {
      ingredientListPage: IngredientList,
    };
  },
  computed: {
    ...mapState(['recipe']),
    ...mapGetters(['recipe'])
  },
  methods: {  
    ...mapActions(['fetchRecipe']),
    
    setIngredient(item){
      this.fetchRecipe(item)

      this.$showModal(IngredientList, {
        props: {
          recipe: recipe
        }
      });
    }
  }
};
</script>

<style>
.bottle {
  background-color: #16011f;
  border-radius: 50;
  height: 200;
  margin: 10;
  color: white;
  text-align: center;
}
.highlighted {
  background-color: #220f55;
}
.recipe-button {
  color: white;
  font-size: 30;
  background-color: #220f55;
  margin: 10 20 10;
  border-radius: 5;
  font-family: Quicksand;
}
</style>
