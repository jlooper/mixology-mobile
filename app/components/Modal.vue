<template>  
  <ModalStack class="modal-container">
    <GridLayout
      class="modal-card modal"
      rows="auto,auto"
      verticalAlignment="middle"
      style="height:60%"
    >
      <Button row="0" @tap="$modal.close" class="fa close" text="x" horizontalAlignment="right"/>
      
      <Label style="text-align:center;font-weight:bold" row="1" v-show="recipes.length==0" text="Sorry, no recipes!" verticalAlignment="top"/>
      
      <ListView
        :items="recipes"
        separatorColor="transparent"
        row="1"
        backgroundColor="transparent"
        height="100%"
      >
        <v-template>
          <StackLayout class="recipe-card">
            <Label :text="item.name" textWrap="true" style="font-size:30;padding-bottom:5"/>
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
</template>

<script>
export default {
  props: ["recipes"],
  name: "RecipeModal"
}
</script>