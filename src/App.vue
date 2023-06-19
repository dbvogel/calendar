<template>
  <div class="calendar">
    <div class="header"></div>
    <div class="days">
      <div v-for="(week, index) in calendarWeeks" :key="index" class="week">
        <DayComponent
          v-for="day in week"
          :key="day.date"
          :date="day.date"
          :isSelected="day.isSelected"
          :isStartDate="day.isStartDate"
          :isEndDate="day.isEndDate"
          @toggleSelection="toggleDaySelection(day)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DayComponent from './components/DayComponent.vue'

export default defineComponent({
  components: {
    DayComponent
  },
  data() {
    return {
      calendarWeeks: []
    }
  },
  created() {
    this.generateCalendarWeeks()
  },
  methods: {
    generateCalendarWeeks() {
      const startDate = new Date(2023, 5, 1)
      const endDate = new Date(2023, 5, 30)
      const weeks = []
      let currentDate = new Date(startDate)
      currentDate.setDate(1)

      while (currentDate <= endDate) {
        const week = []
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentDate)
          week.push({
            date: date.toISOString().slice(0, 10),
            isSelected: false,
            isStartDate: false,
            isEndDate: false
          })
          currentDate.setDate(currentDate.getDate() + 1)
        }
        weeks.push(week)
      }

      this.calendarWeeks = weeks
    },
    toggleDaySelection(day) {
      if (day.isSelected) {
        this.clearSelection()
      } else {
        const selectedRange = this.calendarWeeks.flat().filter(d => d.isSelected || d.isStartDate || d.isEndDate)
        const lastSelectedDay = selectedRange[selectedRange.length - 1]

        if (lastSelectedDay && lastSelectedDay.isStartDate) {
          const clickedDate = new Date(day.date)
          const lastSelectedDate = new Date(lastSelectedDay.date)

          if (clickedDate > lastSelectedDate) {
            this.markRange(lastSelectedDate, clickedDate)
          } else {
            this.clearSelection()
            day.isStartDate = true
          }
        } else {
          day.isStartDate = true
        }

        day.isSelected = true
      }

      this.printSelectedRange()
    },
    markRange(startDate, endDate) {
      this.clearSelection()

      const start = new Date(startDate)
      const end = new Date(endDate)

      this.calendarWeeks.forEach(week => {
        week.forEach(day => {
          const currentDay = new Date(day.date)

          if (currentDay >= start && currentDay <= end) {
            day.isSelected = true

            if (currentDay.getTime() === start.getTime()) {
              day.isStartDate = true
            }

            if (currentDay.getTime() === end.getTime()) {
              day.isEndDate = true
            }
          }
        })
      })
    },
    clearSelection() {
      this.calendarWeeks.forEach(week => {
        week.forEach(day => {
          day.isSelected = false
          day.isStartDate = false
          day.isEndDate = false
        })
      })
    },
    printSelectedRange() {
      const selectedRange = this.calendarWeeks
        .flat()
        .filter(day => day.isSelected)
        .map(day => day.date)

      if (selectedRange.length >= 2) {
        const start = selectedRange[0]
        const end = selectedRange[selectedRange.length - 1]
        console.log('Ausgewählter Zeitraum:', start, 'bis', end)
      }
    }
  }
})
</script>

<style scoped>
.calendar {
  /* ... */
}

.week {
  display: flex;
  flex-wrap: wrap;
}
</style>
