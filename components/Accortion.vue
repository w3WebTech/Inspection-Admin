<template>
    <div class="w-full max-w-md mx-auto">
      <div class="bg-white shadow-lg rounded-lg my-5">
      
        <div v-for="(item, index) in items" :key="index" class="border-b">
          <button
            @click="toggle(index)"
            class="flex justify-between items-center w-full p-4 text-left focus:outline-none"
          >
            <span class="text-sm font-semibold">{{ item.title }}</span>
            <svg
              :class="{'rotate-180': isOpen(index)}"
              class="w-6 h-6 transform transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v8m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </button>
          <div v-show="isOpen(index)" class="p-4">
            <div class="bg-white shadow-lg rounded-lg ">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-900">Field</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-900">Details</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Question ID</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ item.questionId }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Question</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ item.question }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Message</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ item.message }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Date</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ item.date }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Time</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ item.Time }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Status</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ item.qstatus }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-sm font-medium text-gray-900">Image</td>
            <td class="px-4 py-2 text-sm text-gray-600">
                <div v-if="item.image && item.image !== ''">
                    <img  :src="item.image" alt="Question Image" class="w-32 h-32 object-cover" />
                </div>
                <div v-else>No Image Available</div>


</td>

          </tr>
        </tbody>
      </table>
    </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  
  const props = defineProps({
    questions: {
      type: Array,
      required: true,
    },
  });
  
  const openIndex = ref(null);
  
debugger
  const items = props.questions.map((question) => ({
    title: question.question, // Use the question text as the title
    questionId: question.questionId, // Store questionId for display
    question: question.question, // Store question text for display
    message: question.message || "No Message",
    date:question.data,
    Time:question.time,
    qstatus:question.qStatus,
    image:question.Image || "No Image" // Store message for display
  }));
  
  const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index;
  };
  
  const isOpen = (index) => {
    return openIndex.value === index;
  };
  </script>
  
  <style scoped>
  .rotate-180 {
    transform: rotate(180deg);
  }
  </style>