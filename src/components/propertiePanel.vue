<template>
  <v-col>
    <v-list-item class="ma-0 pa-0">
      <v-list-item-content>
        <v-list-item-title class="black100t">Properties</v-list-item-title>
      </v-list-item-content>
    </v-list-item >

    <v-list-item class="ma-0 pa-0">
      <v-list-item-content class="ma-0 pa-0">
        <v-list-item-title class="black200t " >
            <v-row class="pa-0 ma-0 justify-center">
                <v-col class="ma-0 mt-3 pa-0" cols="4">
                    <label for="" >
                        Label:
                    </label>  
                </v-col>
                <v-col class="ma-0 pa-0" cols="8">
                    <v-text-field @mouseover="tooltip='The name of the Server User Ex: root '" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t" value="" color="#ffffff" flat dense solo  ></v-text-field>
                </v-col>
            </v-row>    
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item class="ma-0 pa-0">
      <v-list-item-content class="ma-0 pa-0">
        <v-list-item-title class="black200t">
            <v-row class="pa-0 ma-0 justify-center">
                <v-col class="ma-0 mt-3 pa-0" cols="4">
                    <label for="" >
                        Type:
                    </label>  
                </v-col>
                <v-col class="ma-0 pa-0" cols="8">
                    <v-text-field disabled @mouseover="tooltip='The name of the Server User Ex: root '" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t" value="" color="#ffffff" flat dense solo  ></v-text-field>
                </v-col>
            </v-row>    
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

   <v-card elevation="0" class="black600 ">
      <v-card-text class="pa-0 ma-0">
    
        <p class="black100t ma-0 pa-0 green100t mb-2"> <v-icon class="green100t ml-2 mt-2 mr-2">mdi-view-list-outline</v-icon>Value List</p>
         <v-divider></v-divider>
        <div class=" black100t">
            <v-col class="ma-0 pa-0">
                <v-row v-for="data in values" :key="data.label" class=" justify-space-between"> 
                     <p class="mt-2"> <v-icon class="black200t  ml-5 mr-2">mdi-dots-vertical-circle</v-icon> {{data.label}}: {{data.type}}</p>
                     <v-btn color="error"  small text fab class="mr-5"> <v-icon>mdi-minus-circle</v-icon></v-btn>
                </v-row>
              <!--   <v-row class=" justify-space-between"> 
                     <p class="mt-2"> <v-icon class="black200t  ml-5 mr-2">mdi-dots-vertical-circle</v-icon> Filipe: String</p>
                     <v-btn color="error"  small text fab class="mr-5"> <v-icon>mdi-minus-circle</v-icon></v-btn>
                </v-row> -->
                
                
            </v-col>
        </div>
    </v-card-text>
    <v-divider></v-divider>
 <v-hover v-slot="{ hover }"  disabled  >
   <v-card 
   :elevation="hover ? 12 : 2"
    class="mx-auto black400 ml-2 mr-2"
          min-height="35"
          max-width="350"
          
   >
   <p class="ma-2 black200t">Drop your variables here</p>
       
   </v-card>

  </v-hover>
    <v-card-actions>
        <v-btn color="success" text>Remove all</v-btn>
    </v-card-actions>
   </v-card>
   
  </v-col>
</template>

<script>
export default {

    props: {
        values:{
            Type:Array,
        }
    }

}
</script>

<style>

</style>