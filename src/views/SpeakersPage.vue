<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Speakers</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="">Speakers</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        class="container mx-auto px-5 pb-10 pt-5 sm:max-w-[375px] md:max-w-screen-sm"
      >
        <div class="grid gap-y-5 sm:grid-cols-2 sm:gap-5">
          <!-- single speaker -->

          <div
            v-for="speaker in allSpeakers"
            @click="() => router.push('/speaker/' + speaker.id)"
            :key="speaker.id"
            class="relative aspect-square w-full transform-gpu cursor-pointer transition-transform duration-75 ease-in-out will-change-transform active:scale-95"
          >
            <div
              class="absolute top-0 left-0 z-20 rounded-tl-xl px-5 py-3 font-bold leading-tight text-white dark:text-white"
            >
              {{ speaker.company }}
            </div>
            <div
              class="absolute inset-x-0 bottom-0 z-20 p-5 text-white dark:text-white"
            >
              <p class="text-xl font-bold">
                {{ speaker.firstName }} {{ speaker.lastName }}
              </p>
              <p>{{ speaker.jobTitle }}</p>
            </div>

            <div
              class="absolute inset-x-0 top-0 z-10 block h-20 w-full overflow-hidden rounded-t-xl bg-gradient-to-b from-gray-800 to-transparent opacity-30"
            ></div>

            <div
              class="absolute inset-x-0 bottom-0 z-10 block h-24 w-full overflow-hidden rounded-b-xl bg-gradient-to-t from-gray-700 to-transparent opacity-50"
            ></div>

            <img
              :src="speaker.profileURL"
              :alt="speaker.firstName + ' ' + speaker.lastName"
              class="relative z-0 h-full w-full overflow-hidden rounded-xl object-cover object-center"
            />
          </div>

          <!-- single speaker -->
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { allSpeakers, fetchSpeakers } from "@/data/useSpeaker";

export default defineComponent({
  name: "SpeakersPage",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    const router = useRouter();

    const loading = ref(true);
    fetchSpeakers().then(() => {
      loading.value = false;
    });

    return {
      router,
      allSpeakers,
    };
  },
});
</script>
