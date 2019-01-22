<template>

<ScrollView>
  
    <GridLayout rows="auto,auto,auto" verticalAlignment="top">
      
      <Label class="page-title" row="0" text="What's in my bar?"/>

      <StackLayout row="1" v-if="recipes">
            <StackLayout class="recipe-card"
                v-for="item in recipes"
                    :key="item.id"
                  >
                <Label textWrap="true" :text="item.name" @tap="showRecipe(item)"/>
                
            </StackLayout>
      </StackLayout>
    
      
      
        <GridLayout row="2" class="card" columns="*,*" rows="*,*,*">
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
import {mapActions, mapState} from 'vuex';

const RecipeModal = {
  template: `
            <ModalStack class="modal-container">
                <GridLayout class="modal-card modal" rows="auto,auto" verticalAlignment="middle"  style="height:60%">
                    <Button row="0" @tap="$modal.close" class="fa close" text="x" horizontalAlignment="right" />
                    <Label row="1" :text="myRecipe.name"/>
                    <Label textWrap="true" :text="recipe.instructions"/>
                </GridLayout>
            </ModalStack>
      `,
};
export default {
  data() {
    return {
      recipeModal: RecipeModal,
    };
  },
  computed: {
    ...mapState(['recipes']),
  },
  methods: {  
    ...mapActions(['fetchRecipe']),
    
    setIngredient(item){
      this.fetchRecipe(item)
    },
    showRecipe(item){
      console.log(item)
      this.$showModal(RecipeModal, {
        props: {
          recipe: item
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
