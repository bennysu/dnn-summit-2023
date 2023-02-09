<template>
  <ion-page>
    <ion-header class="ion-no-border" :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="invalidURL" class="container mx-auto max-w-screen-sm px-5 pt-10 pb-10">
        <h1>Sorry!</h1>
        <p>We couldn't find what you are looking for</p>
      </div>
      <div v-else class="container mx-auto max-w-screen-sm px-5 pt-10 pb-10">
        <!-- single sponsor -->
          <div
            class="relative aspect-square w-full">
            <div
              class="bg- absolute top-0 left-0 z-20 rounded-tl-xl px-5 py-3 font-bold text-white dark:text-white"
            >
              {{sponsor.name}}
            </div>
            <div
              class="absolute inset-x-0 bottom-0 z-20 p-5 text-white dark:text-white"
            >
              <p class="text-xl font-bold">{{sponsor.name}}</p>
            </div>

            <div
              class="absolute inset-x-0 bottom-0 z-10 block h-28 w-full overflow-hidden rounded-b-xl bg-gradient-to-t from-black to-transparent"
            ></div>

            <img
              :src="sponsor.logoURL"
              :alt="sponsor.name"
              class="relative z-0 h-full w-full overflow-hidden rounded-xl object-cover object-center"
            />
          </div>

          <!-- single sponsor -->

          <h1>rest of the sponsor details here</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonBackButton, } from '@ionic/vue';
import { useRouter } from 'vue-router';
import dataService from "@/services/dataService";

export default  defineComponent({
  name: 'SponsorDetailsPage',
  components: { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, },
  setup() {
    const router = useRouter();
    const invalidURL = ref(false)

    const route = router.currentRoute.value;
    const targetID = +route.params["id"]
    const record = dataService.sponsor.get(targetID)
    invalidURL.value = !record

    return {
      sponsor: record,
      invalidURL,
    };
  }
});
</script>
