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
        <div v-else class="container mx-auto max-w-screen-sm px-5 pt-10 pb-10">
          <div class="flex items-center justify-center -space-x-1">
            <img
              v-for="speaker in session.speakers"
              :key="speaker.id"
              @click="() => router.push('/speaker/' + speaker.id)"
              class="inline-block h-24 w-24 rounded-full ring-2 ring-gray-100 dark:ring-stone-900"
              :src="speaker.profileURL"
              :alt="speaker.firstName + ' ' + speaker.lastName"
            />
          </div>

          <h1 class="text-center text-2xl font-bold leading-tight">
            {{ session.title }}
          </h1>

          <div class="space-y-2">
            <p
              v-for="speaker in session.speakers"
              :key="speaker.id"
              class="text-center text-sm font-medium text-gray-600 dark:text-white dark:text-opacity-75"
            >
              {{ speaker.firstName }} {{ speaker.lastName
              }}<span v-if="speaker.jobTitle">, {{ speaker.jobTitle }}, </span>
              <span v-if="speaker.company">{{ speaker.company }}</span>
            </p>
          </div>

          <div class="mt-7 grid gap-y-5">
            <!-- about this talk -->
            <div>
              <h2 class="mb-3 text-lg font-bold">About this talk</h2>
              <div class="rounded-xl bg-white dark:bg-stone-800">
                <div
                  class="divide-y divide-solid divide-slate-300 dark:divide-stone-700"
                >
                  <div
                    class="prose px-5 py-7 dark:prose-invert"
                    v-html="session.description"
                  ></div>
                </div>
              </div>
            </div>

            <!-- meta details -->
            <div>
              <h2 class="mb-3 text-lg font-bold">More Details</h2>
              <div class="rounded-xl bg-white dark:bg-stone-800">
                <div
                  class="divide-y divide-solid divide-slate-300 dark:divide-stone-700"
                >
                  <!-- meta details -->

                  <div
                    v-if="session.level"
                    class="prose px-5 py-2 dark:prose-invert"
                  >
                    <span class="inline-block w-[50px] font-bold">Level:</span>
                    {{ session.level }}
                  </div>
                  <div
                    v-if="session.track"
                    class="prose px-5 py-2 dark:prose-invert"
                  >
                    <span class="inline-block w-[50px] font-bold">Track:</span>
                    {{ session.track }}
                  </div>
                  <div
                    v-if="session.room"
                    class="prose hidden px-5 py-2 dark:prose-invert"
                  >
                    <span class="inline-block w-[50px] font-bold">Room:</span>
                    {{ session.room }}
                  </div>
                </div>
              </div>
            </div>

            <!-- when -->
            <div>
              <h2 class="mb-3 text-lg font-bold">When</h2>
              <div class="rounded-xl bg-white py-2 px-5 dark:bg-stone-800">
                <time>
                  <span class="block font-bold">{{
                    $format.moment(session.scheduledAt, "dddd, MMMM Do")
                  }}</span>

                  <span
                    class="text-sm text-gray-600 dark:text-white dark:text-opacity-75"
                  >
                    {{ $format.momentEST(session.scheduledAt, "LT") }} EST
                  </span>
                </time>
              </div>
            </div>

            <!-- Watch -->
            <div class="w-full overflow-hidden">
              <h2 class="mb-3 text-lg font-bold">Watch</h2>
              <div class="rounded-xl bg-white dark:bg-stone-800">
                <div
                  class="divide-y divide-solid divide-slate-300 dark:divide-stone-700"
                >
                  <div class="">
                    <a
                      href="#"
                      class="block overflow-hidden text-ellipsis whitespace-nowrap py-2 px-5 text-base leading-normal no-underline"
                      >Watch live at hopin.com/events/dnnsummit2023/{{
                        session.sessionName
                      }}</a
                    >
                  </div>
                  <div>
                    <button
                      type="button"
                      role="button"
                      class="block py-2 px-5 text-base leading-normal"
                    >
                      Remind Me
                    </button>
                  </div>
                </div>
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import SessionDetailsSkeleton from "@/components/SessionDetailsSkeleton.vue";
import { getSession } from "@/data/useSession";

export default defineComponent({
  name: "SessionDetailsPage",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton,
    SessionDetailsSkeleton,
  },
  setup() {
    const router = useRouter();
    const invalidURL = ref(false);
    const loading = ref(true);
    const session = ref();

    const route = router.currentRoute.value;
    const targetID = route.params["id"];

    getSession(targetID).then((record) => {
      invalidURL.value = !record;
      if (record) {
        session.value = record;
      }
      loading.value = false;
    });

    return {
      router,
      loading,
      session,
      invalidURL,
    };
  },
});
</script>
