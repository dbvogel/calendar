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
        required: false
      },
      isStartDate: {
        type: Boolean,
        required: false
      },
      isEndDate: {
        type: Boolean,
        required: false
      },
      isBlocked: {
        type: Boolean,
        required: false
      }

    },
    computed: {
      formattedDate() {
        return this.date
      },
      events() {
        return [
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
    min-width:300px;
    border: 1px solid black;
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
  