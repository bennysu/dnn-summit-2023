<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Swag</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="">Swag</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container mx-auto max-w-screen-sm px-5 pb-10 pt-5">
        <h2 class="max-w-prose text-xl font-bold">
          DNN Summit 2023 Swag is here!
        </h2>

        <div class="mt-5 rounded-xl bg-white dark:bg-stone-800">
          <img src="/assets/swag-header.jpg" alt="Swag" class="w-full rounded-t-xl" />
          <div class="prose p-5 dark:prose-invert">
            <h2>
              Register now to receive your swag bag before the conference
              starts.
            </h2>
            <p>
              The first 200 attendees to register will receive a swag bag with a
              DNN Summit 2023 t-shirt, custom pins, and much more.
            </p>
            <p>Quantities are limited. Register today to secure yours!</p>
            <p><strong>Sorry! The swag giveaway is now over.</strong></p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
</script>
