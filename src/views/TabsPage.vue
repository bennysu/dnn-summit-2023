<template>
  <ion-page>
    <ion-tabs main color="primary">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="agendaTab" href="/tabs/agenda">
          <ion-icon :icon="calendar" />
          <ion-label>Agenda</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="speakersTab" href="/tabs/speakers">
          <ion-icon :icon="people" />
          <ion-label>Speakers</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="sponsorsTab" href="/tabs/sponsors">
          <ion-icon :icon="star" />
          <ion-label>Sponsors</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="swagTab" href="/tabs/swag">
          <ion-icon :icon="shirt" />
          <ion-label>Swag</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { calendar, people, star, shirt } from "ionicons/icons";
</script>
