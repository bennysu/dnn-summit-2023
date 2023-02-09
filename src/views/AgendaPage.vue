<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Agenda</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="">Agenda</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container mx-auto max-w-screen-sm px-5 pb-10 pt-5">
        <div v-if="loading">
          <SessionDetailsSkeleton
            v-for="n in 7"
            :key="n"
          ></SessionDetailsSkeleton>
        </div>
        <div v-else class="grid gap-y-4">
          <!-- filter buttons-->

          <div class="no-scrollbar -mx-5 flex gap-3 overflow-auto py-2 px-5">

            <button type="button" v-for="track in ALL_TRACKS" :key="track" @click="setTrack(track)"
              :class="[selectedTrack === track ? 'bg-primary text-white' : 'bg-white text-gray-800', 'flex-none whitespace-nowrap rounded-xl border px-3 py-1 text-sm font-bold shadow-sm']"
            >
              {{track}}
            </button>
          </div>

          <!-- single card-->
          <div
            v-for="session in filteredSessions"
            @click="() => router.push('/session/' + session.id)"
            :key="session.id"
            class="i-card grid transform-gpu cursor-pointer gap-y-2 rounded-xl bg-white p-5 transition-transform duration-75 ease-in-out will-change-transform active:scale-95 dark:bg-stone-800"
          >
            <div class="flex justify-between items-center">
              <div class="flex -space-x-1">
                <img
                  v-for="speaker in session.speakers"
                  :key="speaker.id"
                  class="inline-block h-12 w-12 rounded-full ring-2 ring-white dark:ring-stone-800"
                  :src="speaker.profileURL"
                  :alt="speaker.firstName + ' ' + speaker.lastName"
                />
              </div>
              <div class="p-2" @click.stop="favoriteSession(session)">
                <ion-icon
                  class="text-2xl"
                  color="primary"
                  :icon="session.saved ? bookmark : bookmarkOutline"
                />
              </div>
            </div>
            
            <p class="mb-0 text-xl font-bold leading-tight">
              {{ session.title }}
            </p>
            <div class="grid gap-1">
              <p
                v-for="speaker in session.speakers"
                :key="speaker.id"
                class="text-sm font-medium text-gray-600 dark:text-white dark:text-opacity-75"
              >
                <span>{{ speaker.firstName }} {{ speaker.lastName }}</span>
                <span v-if="speaker.jobTitle" class="hidden"
                  >, {{ speaker.jobTitle }}
                </span>
                <span v-if="speaker.company">, {{ speaker.company }}</span>
              </p>

              <p class="my-2">
                <span
                  v-if="session.track"
                  class="inline-flex -translate-x-7 rounded-xl bg-primary py-2 pl-7 pr-7 text-xs font-medium uppercase text-white shadow"
                >
                  {{ session.track }}</span
                >
              </p>

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
          <!-- end single card-->

          <!-- drawer modal -->
          <ion-modal ref="modal" :is-open="isOpen" :initial-breakpoint="0.20" :breakpoints="[0, 0.20, 0.5]" @willDismiss="drawerDismiss()">
            <ion-content class="ion-padding">
              <ion-list class="pt-6">
                <ion-item @click="saveSession()">
                  <ion-icon :icon="bookmarkOutline" slot="start" />
                  <ion-label>
                    <h2>Save to My Schedule</h2>
                  </ion-label>
                </ion-item>
                <ion-item @click="shareSession()">
                  <ion-icon :icon="shareSocialOutline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Share with...</h2>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-modal>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher, IonRefresherContent,
  IonIcon,
  IonModal,
  IonItem,
  IonList,
  IonLabel,
  toastController,
} from "@ionic/vue";
import {
  bookmarkOutline,
  shareSocialOutline,
  bookmark,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { allSessions, fetchSessions } from "@/data/useSession";
import SessionDetailsSkeleton from "@/components/SessionDetailsSkeleton.vue";

export default defineComponent({
  name: "AgendaPage",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonTitle,
    IonRefresher, IonRefresherContent,

    IonIcon,
    SessionDetailsSkeleton,
    IonModal,
    IonItem,
    IonList,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const selectedTrack = ref('All')
    const ALL_TRACKS = ref<string[]>([])

    const loading = ref(true);
    fetchSessions().then(() => {
      loading.value = false;
      const uniqueEntries = ['All', ...new Set(allSessions.value.map(s => s.track))]
      uniqueEntries.sort()
      ALL_TRACKS.value = uniqueEntries
      console.log('ALL_TRACKS', ALL_TRACKS.value)
    });

    const setTrack = (track:string) =>{
      selectedTrack.value = track
    }

    const filteredSessions = computed(() => {
      if (selectedTrack.value === 'All')
      {
        return allSessions.value
      }
      else
      {
        return allSessions.value.filter((s) => {return s.track === selectedTrack.value})
      }
    })

    const handleRefresh = (event: any) => {
      loading.value = true;
      fetchSessions().then(() => {
        loading.value = false;
        event.target.complete()
      });
    };

    const selectedSession = ref()
    const isOpen = ref(false)
    const favoriteSession = async (session: any) => {
      if (session.saved)
      {
        session.saved = false;
        (await toastController.create({
        message: 'Session removed from schedule',
        duration: 1500,
        })).present();
      }
      else
      {
        isOpen.value = true
        selectedSession.value = session
      }
    }

    const drawerDismiss = () => {
      isOpen.value = false
    }

    const saveSession = async () => {
      drawerDismiss();

      const session = selectedSession.value
      session.saved = true;

      (await toastController.create({
        message: 'Session saved',
        duration: 1500,
      })).present();
    }

    const shareSession = async () => {
      drawerDismiss();

      (await toastController.create({
        message: 'Session link copied',
        duration: 1500,
      })).present();
    }

    return {
      ALL_TRACKS,
      router,
      loading,
      filteredSessions,
      setTrack,
      selectedTrack,
      handleRefresh,


      bookmark,
      shareSocialOutline,
      bookmarkOutline,

      isOpen,
      drawerDismiss,
      favoriteSession,

      saveSession,
      shareSession,
    };
  },
});
</script>
