<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Sponsors</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="">Sponsors</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container mx-auto max-w-screen-sm px-5 pb-10 pt-5">
        <div class="grid gap-y-5">
          <!-- sponsor group -->

          <div
            v-for="sponsorGroup in sponsorList"
            :key="sponsorGroup.id"
            class="grid"
          >
            <h2 class="text-xl font-bold">{{ sponsorGroup.group }}</h2>

            <div class="grid gap-4">
              <div v-for="sponsor in sponsorGroup.sponsor" :key="sponsor.id">
                <a
                  class="flex aspect-4/3 transform-gpu cursor-pointer items-center justify-center rounded-xl bg-white p-2 sm:p-10 transition-transform duration-75 ease-in-out will-change-transform active:scale-95"
                  :href="sponsor.website"
                  target="_blank"
                >
                  <img
                    :src="sponsor.logoURL"
                    :alt="sponsor.name"
                    class="max-w-[270px] flex-none"
                  />
                </a>
              </div>
            </div>
          </div>

          <!-- sponsor group -->
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import dataService from "@/services/dataService";

export default defineComponent({
  name: "SponsorsPage",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    const router = useRouter();

    return {
      router,
      sponsorList: dataService.sponsor.repo,
    };
  },
});
</script>
