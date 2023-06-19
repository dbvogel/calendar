<template>
    <div
      class="day"
      :class="{ selected: isSelected, 'start-date': isStartDate, 'end-date': isEndDate, 'blocked': isBlocked }"
      @click="handleClick"
    >
      <h2>{{ formattedDate }}</h2>
      <ul>
        <li v-for="event in events" :key="event.id">
          <span>{{ event.title }}</span>
          <span>{{ event.time }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props: {
      date: {
        type: String,
        required: true
      },
      isSelected: {
        type: Boolean,
        required: true
      },
      isStartDate: {
        type: Boolean,
        required: true
      },
      isEndDate: {
        type: Boolean,
        required: true
      },
      isBlocked: {
        type: Boolean,
        required: true
      }

    },
    computed: {
      formattedDate() {
        return this.date
      },
      events() {
        return [
          { id: 1, title: 'Meeting', time: '09:00' },
          { id: 2, title: 'Mittagessen', time: '12:30' },
          { id: 3, title: 'Präsentation', time: '15:00' }
        ]
      }
    },
    methods: {
      handleClick() {
        this.$emit('toggleSelection')
      }
    }
  })
  </script>
  
  <style scoped>
  .day {
    /* ... */
  }
  
  .day.selected {
    background-color: red;
  }
  
  .day.start-date {
    /* ... */
  }
  
  .day.end-date {
    /* ... */
  }

  .day.blocked {
    background-color: purple;
  }
  </style>
  