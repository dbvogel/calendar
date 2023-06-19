<template>
  <div class="calendar">
    <div class="header"></div>
    <div class="days">
      <DayComponent
        v-for="day in calendarDays"
        :key="day.date"
        :date="day.date"
        :isSelected="day.isSelected"
        :isStartDate="day.isStartDate"
        :isEndDate="day.isEndDate"
        :isBlocked="day.isBlocked"
        @toggleSelection="toggleDaySelection(day)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { fetchMonths } from './assets/js/mockApi';
import DayComponent from './components/DayComponent.vue';

export default defineComponent({
  components: {
    DayComponent
  },
  data() {
    return {
      calendarDays: []
    };
  },
  created() {
    this.fetchMonthData();
  },
  methods: {
    async fetchMonthData() {
      try {
        const monthData = await fetchMonths();
        this.calendarDays = monthData;
      } catch (error) {
        console.error('Fehler beim Abrufen der Monatsdaten:', error);
        // Weitere Fehlerbehandlung, z.B. Fehlermeldung anzeigen
      }
    },

    toggleDaySelection(day) {
      if (day.isSelected) {
        this.clearSelection();
      } else {
        const selectedRange = this.calendarDays.filter(d => d.isSelected || d.isStartDate || d.isEndDate);
        const lastSelectedDay = selectedRange[selectedRange.length - 1];

        if (lastSelectedDay && lastSelectedDay.isStartDate) {
          const clickedDate = new Date(day.date);
          const lastSelectedDate = new Date(lastSelectedDay.date);

          if (clickedDate > lastSelectedDate) {
            this.markRange(lastSelectedDate, clickedDate);
          } else {
            this.clearSelection();
            day.isStartDate = true;
          }
        } else {
          day.isStartDate = true;
        }

        day.isSelected = true;
      }

      this.printSelectedRange();
      this.checkBlockedDays();
    },

    markRange(startDate, endDate) {
      this.clearSelection();

      const start = new Date(startDate);
      const end = new Date(endDate);

      this.calendarDays.forEach(day => {
        const currentDate = new Date(day.date);

        if (currentDate >= start && currentDate <= end) {
          day.isSelected = true;

          if (currentDate.getTime() === start.getTime()) {
            day.isStartDate = true;
          }

          if (currentDate.getTime() === end.getTime()) {
            day.isEndDate = true;
          }
        }
      });
    },

    clearSelection() {
      this.calendarDays.forEach(day => {
        day.isSelected = false;
        day.isStartDate = false;
        day.isEndDate = false;
      });
    },

    printSelectedRange() {
      const selectedRange = this.calendarDays
        .filter(day => day.isSelected)
        .map(day => day.date);

      if (selectedRange.length >= 2) {
        const start = selectedRange[0];
        const end = selectedRange[selectedRange.length - 1];
        console.log('Ausgewählter Zeitraum:', start, 'bis', end);
      }
    },

    checkBlockedDays() {
      const selectedRange = this.calendarDays.filter(day => day.isSelected || day.isStartDate || day.isEndDate);
      const blockedDays = selectedRange.filter(day => day.isBlocked);

      if (blockedDays.length > 0) {
        console.log('Auswahl nicht möglich. Blockierte Tage im Zeitraum vorhanden.');
        this.clearSelection();
      }
    }
  }
});
</script>

<style scoped>
.calendar {
  display: flex;
 
}

.days {
  display: flex;
  flex-wrap: wrap;
}
</style>
