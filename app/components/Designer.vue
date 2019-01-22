<template>

<ScrollView>
  
    <GridLayout rows="auto,auto,auto" verticalAlignment="top">
      
      <Label class="page-title" row="0" text="What's in my bar?"/>
      <Button row="1" style="visibility:collapsed" ref="recipesbtn" class="recipe-card" text="View Recipes" @tap="showRecipes(recipes)"/>    
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
  props: ["recipes"],
  template: `
            <ModalStack class="modal-container">
                <GridLayout class="modal-card modal" rows="auto,auto" verticalAlignment="middle"  style="height:60%">
                    <Button row="0" @tap="$modal.close" class="fa close" text="x" horizontalAlignment="right" />
                     <ListView
                        :items="recipes"
                        separatorColor="transparent"
                        row="1"
                        backgroundColor="transparent"
                        height="100%"
                      >
                        <v-template>
                          <StackLayout class="recipe-card">
                            <Label :text="item.name" textWrap="true" style="font-size:30;padding-bottom:5" />
                            <Label textWrap="true" :text="item.ingredient1"/> 
                            <Label textWrap="true" v-show="item.ingredient2!=' '" :text="item.ingredient2"/> 
                            <Label textWrap="true" v-show="item.ingredient3!=' '" :text="item.ingredient3"/> 
                            <Label textWrap="true" v-show="item.ingredient4!=' '" :text="item.ingredient4"/> 
                            <Label textWrap="true" v-show="item.ingredient5!=' '" :text="item.ingredient5"/> 
                            <Label textWrap="true" v-show="item.ingredient6!=' '" :text="item.ingredient6"/> 
                            <Label textWrap="true" style="padding-top:5" :text="item.instructions"/>
                          </StackLayout>
                        </v-template>
                      </ListView>
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
      this.fetchRecipe(item).then( result => {
        this.$refs.recipesbtn.nativeView.visibility = "visible";
      })
    },
    showRecipes(recipes){
      console.log(recipes)
      this.$showModal(RecipeModal, {
        props: {
          recipes: recipes
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
  font-family: Quicksand;
}
.highlighted {
  background-color: #220f55;
}
.recipe-card {
  color: white;
  background-color: #220f55;
  margin: 10 20 10;
  border-radius: 5;
  font-family: Quicksand;
}
</style>
