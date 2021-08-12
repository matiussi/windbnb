module.exports = {
   css: {
     loaderOptions: {
       scss: {
         prependData: `
           @import "@/styles/core/_colors.scss";
           @import "@/styles/core/_fonts.scss";
           @import "@/styles/core/_mixins.scss";
         `
       }
     }
   }
 }