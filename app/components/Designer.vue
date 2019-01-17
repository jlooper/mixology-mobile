<template>
  <ScrollView>
    <GridLayout rows="auto,auto" verticalAlignment="top">
      <Label class="page-title" row="0" text="What's in my bar?"/>

      <GridLayout row="1" class="card" columns="*,*" rows="*,*,*">
        <StackLayout orientation="vertical" class="bottle" col="0" row="0">
          <Image src="~/assets/images/gin.png"/>
          <Label text="Gin"/>
        </StackLayout>
        <StackLayout orientation="vertical" class="bottle" col="1" row="0">
          <Image src="~/assets/images/bourbon.png"/>
          <Label text="Bourbon"/>
        </StackLayout>

        <StackLayout orientation="vertical" class="bottle" col="0" row="1">
          <Image src="~/assets/images/brandy.png"/>
          <Label text="Brandy"/>
        </StackLayout>
        <StackLayout orientation="vertical" class="bottle" col="1" row="1">
          <Image src="~/assets/images/scotch.png"/>
          <Label text="Scotch"/>
        </StackLayout>

        <StackLayout orientation="vertical" class="bottle" col="0" row="2">
          <Image src="~/assets/images/vodka.png"/>
          <Label text="Vodka"/>
        </StackLayout>
        <StackLayout orientation="vertical" class="bottle" col="1" row="2">
          <Image src="~/assets/images/cognac.png"/>
          <Label text="Cognac"/>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
export default {};
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

</style>
