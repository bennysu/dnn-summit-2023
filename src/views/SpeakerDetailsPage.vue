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
      <div
        v-if="loading"
        class="container mx-auto max-w-screen-sm px-5 pt-10 pb-10"
      >
        <SessionDetailsSkeleton
          v-for="n in 5"
          :key="n"
        ></SessionDetailsSkeleton>
      </div>
      <section v-else>
        <div
          v-if="invalidURL"
          class="container mx-auto max-w-screen-sm px-5 pt-10 pb-10"
        >
          <h1>Sorry!</h1>
          <p>We couldn't find what you are looking for</p>
        </div>
        <div v-else class="container mx-auto pb-10 sm:max-w-[500px]">
          <!-- single speaker -->
          <div class="relative aspect-square w-full">
            <div
              class="absolute inset-x-0 bottom-0 z-20 p-5 text-white dark:text-white"
            >
              <p class="text-xl font-bold">
                {{ speaker.firstName }} {{ speaker.lastName }}
              </p>
              <p v-if="speaker.jobTitle">{{ speaker.jobTitle }}</p>
            </div>

            <p
              class="absolute top-0 left-0 z-50 px-5 py-5 text-sm font-bold leading-tight text-white"
              v-if="speaker.company"
            >
              {{ speaker.company }}
            </p>

            <div
              class="absolute inset-x-0 top-0 z-10 block h-20 w-full overflow-hidden bg-gradient-to-b from-gray-800 to-transparent opacity-30"
            ></div>

            <div
              class="absolute inset-x-0 bottom-0 z-10 block h-24 w-full overflow-hidden bg-gradient-to-t from-gray-700 to-transparent opacity-50"
            ></div>

            <img
              :src="speaker.profileURL"
              :alt="speaker.firstName + ' ' + speaker.lastName"
              class="relative z-0 h-full w-full overflow-hidden object-cover object-center"
            />
          </div>

          <div class="container mx-auto max-w-screen-sm px-5 pt-5 pb-5">
            <h1 class="mb-3 text-xl font-bold">
              About {{ speaker.firstName }}
            </h1>

            <div class="prose dark:prose-invert" v-html="speaker.bio"></div>

            <!-- speaker's session -->
            <div class="mt-5">
              <h2 class="mb-3 text-xl font-bold">I'm Presenting</h2>

              <!-- meta details -->
              <div>
                <div class="rounded-xl bg-white dark:bg-stone-800">
                  <div
                    class="divide-y divide-solid divide-slate-300 dark:divide-stone-700"
                  >
                    <div v-for="session in speaker.sessions" :key="session.id">
                      <div
                        @click="() => router.push('/session/' + session.id)"
                        class="block overflow-hidden text-ellipsis whitespace-nowrap py-2 px-5 text-base leading-normal text-primary no-underline"
                        >{{session.title}}</div
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mt-5"
              v-if="
                speaker.faceBookHandle ||
                speaker.linkedInHandle ||
                speaker.twitterHandle
              "
            >
              <h2 class="mb-3 text-xl font-bold">
                Connect with {{ speaker.firstName }}
              </h2>

              <div class="inline-flex gap-x-3">
                <a
                  v-if="speaker.faceBookHandle"
                  :href="speaker.faceBookHandle"
                  target="_blank"
                  class="inline-flex h-16 w-20 cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-200 text-center text-sm dark:bg-stone-800"
                  ><ion-icon
                    class="text-xl"
                    color="primary"
                    :icon="logoFacebook"
                  />
                  Facebook</a
                >

                <a
                  v-if="speaker.linkedInHandle"
                  :href="speaker.linkedInHandle"
                  target="_blank"
                  class="inline-flex h-16 w-20 cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-200 text-center text-sm dark:bg-stone-800"
                >
                  <ion-icon
                    class="text-xl"
                    color="primary"
                    :icon="logoLinkedin"
                  />
                  LinkedIn</a
                >

                <a
                  v-if="speaker.twitterHandle"
                  :href="speaker.twitterHandle"
                  target="_blank"
                  class="inline-flex h-16 w-20 cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-200 text-center text-sm dark:bg-stone-800"
                >
                  <ion-icon
                    class="text-xl"
                    color="primary"
                    :icon="logoTwitter"
                  />
                  Twitter</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent, IonBackButton, IonIcon, IonToolbar, IonButtons, IonHeader, } from "@ionic/vue";
import { useRouter } from "vue-router";
import SessionDetailsSkeleton from "@/components/SessionDetailsSkeleton.vue";
import { getSpeaker } from "@/data/useSpeaker";
import {
  closeCircle,
  logoFacebook,
  logoTwitter,
  logoLinkedin,
} from "ionicons/icons";

export default defineComponent({
  name: "SpeakerDetailsPage",
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonPage,
    IonBackButton,
    IonIcon,
    SessionDetailsSkeleton,
  },
  setup() {
    const router = useRouter();
    const invalidURL = ref(false);
    const loading = ref(true);
    const speaker = ref();

    const route = router.currentRoute.value;
    const targetID = route.params["id"];

    getSpeaker(targetID).then((record) => {
      invalidURL.value = !record;
      if (record) {
        speaker.value = record;
      }
      loading.value = false;
    });

    return {
      router,
      loading,
      closeCircle,
      logoFacebook,
      logoLinkedin,
      logoTwitter,
      speaker,
      invalidURL,
    };
  },
});
</script>

<style>
.safe-padding-top {
  padding-top: env(safe-area-inset-top);
}
</style>
