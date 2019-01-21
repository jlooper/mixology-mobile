<template>
  <ScrollView>
    <GridLayout rows="auto,auto" verticalAlignment="top">
      <Label class="page-title" row="0" text="What's in my bar?"/>

      <GridLayout row="1" class="card" columns="*,*" rows="*,*,*">
        <StackLayout
          orientation="vertical"
          class="bottle"
          col="0"
          row="0"
          @tap="showDetailPageModally('gin')"
        >
          <Image src="~/assets/images/gin.png"/>
          <Label text="Gin"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          class="bottle"
          col="1"
          row="0"
          @tap="showDetailPageModally('bourbon')"
        >
          <Image src="~/assets/images/bourbon.png"/>
          <Label text="Bourbon"/>
        </StackLayout>

        <StackLayout
          orientation="vertical"
          class="bottle"
          col="0"
          row="1"
          @tap="showDetailPageModally('brandy')"
        >
          <Image src="~/assets/images/brandy.png"/>
          <Label text="Brandy"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          class="bottle"
          col="1"
          row="1"
          @tap="showDetailPageModally('scotch')"
        >
          <Image src="~/assets/images/scotch.png"/>
          <Label text="Scotch"/>
        </StackLayout>

        <StackLayout
          orientation="vertical"
          class="bottle"
          col="0"
          row="2"
          @tap="showDetailPageModally('vodka')"
        >
          <Image src="~/assets/images/vodka.png"/>
          <Label text="Vodka"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          class="bottle"
          col="1"
          row="2"
          @tap="showDetailPageModally('cognac')"
        >
          <Image src="~/assets/images/cognac.png"/>
          <Label text="Cognac"/>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
const Detail = {
  props: ["ingredients"],
  template: `
            <ModalStack class="modal-container">
                <GridLayout class="modal-card modal" rows="auto,auto" verticalAlignment="middle"  style="height:60%">
                    <Button row="0" @tap="$modal.close" class="fa close" text="x" horizontalAlignment="right" />
                    <StackLayout row="1" ref="meaningContainer" style="height:90%">                  
                        <ListView
                            for="item in ingredients"
                            separatorColor="transparent"
                            backgroundColor="transparent"
                             style="height:80%"
                          >
                            <v-template>
                              <Label class="recipeLabel" textWrap="true" :text="item"/>
                            </v-template>
                          </ListView>
                        <Button class="recipe-button" text="Find me a Recipe"/>
                    </StackLayout>
                </GridLayout>
            </ModalStack>
      `
};
export default {
  data() {
    return {
      detailPage: Detail,
      ingredients: []
    };
  },
  methods: {
    showDetailPageModally(item) {
      this.ingredients.push(item);
      this.$showModal(Detail, {
        props: {
          ingredients: this.ingredients
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
.recipe-button {
  color: white;
  font-size: 30;
  background-color: #220f55;
  margin: 10 20 10;
  border-radius: 5;
  font-family: Quicksand;
}
</style>
