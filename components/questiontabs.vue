<template>
    <div class="mt-1 px-5">
        <h4 class="text-gray-500 font-semibold">Questions</h4>
      <!-- Dropdown for Mobile -->
      <div class="grid grid-cols-1 sm:hidden ">
        <select
          aria-label="Select a tab"
          class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          @change="handleTabChange"
        >
          <option v-for="tab in tabs" :key="tab.name" :value="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
        <ChevronDownIcon
          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          aria-hidden="true"
        />
      </div>
  
      <!-- Desktop Tabs Navigation -->
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.href"
              :class="[
                tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
              ]"
              :aria-current="tab.current ? 'page' : undefined"
              @click.prevent="setCurrentTab(tab)"
            >
              {{ tab.name }}
            </a>
          </nav>
        </div>
      </div>
  
      <!-- Tab Content Section -->
      <div class="mt-4">
        <div v-if="tabs[0].current">
          <Accordion :value="null">
            <AccordionPanel v-for="(question, index) in chunkedQuestions[0]" :key="index" :value="index">
              <AccordionHeader>{{ question.question }}</AccordionHeader>
              <AccordionContent >
                <div class="text-sm text-gray-500 font-semibold">
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Question Id:</span>
        <span>{{ question.questionId }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Answer:</span>
        <span>{{ question.message }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Date:</span>
        <span>{{ question.data }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Time:</span>
        <span>{{ question.time }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">RAppId:</span>
        <span>{{ question.AppSessionId }}</span>
    </div>
</div>

              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
        <div v-if="tabs[1].current">
          <Accordion :value="null">
            <AccordionPanel v-for="(question, index) in chunkedQuestions[1]" :key="index" :value="index">
              <AccordionHeader class="truncate">{{ question.question }}</AccordionHeader>
              <AccordionContent class="text-sm">
                <div class="text-sm text-gray-500 font-semibold">
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Question Id:</span>
        <span>{{ question.questionId }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Answer:</span>
        <span>{{ question.message }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Date:</span>
        <span>{{ question.data }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Time:</span>
        <span>{{ question.time }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">RAppId:</span>
        <span>{{ question.AppSessionId }}</span>
    </div>
</div>

              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
        <div v-if="tabs[2].current">
          <Accordion :value="null">
            <AccordionPanel v-for="(question, index) in chunkedQuestions[2]" :key="index" :value="index">
              <AccordionHeader>{{ question.question }}</AccordionHeader>
              <AccordionContent class="text-sm">
                <div class="text-sm text-gray-500 font-semibold">
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Question Id:</span>
        <span>{{ question.questionId }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Answer:</span>
        <span>{{ question.message }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Date:</span>
        <span>{{ question.data }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">Time:</span>
        <span>{{ question.time }}</span>
    </div>
    <div class="flex justify-start space-x-4 mb-2">
        <span class="text-gray-400 font-medium">RAppId:</span>
        <span>{{ question.AppSessionId }}</span>
    </div>
</div>

              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
      <div class="fixed bottom-0 w-full bg-white p-4">
  <div class="flex justify-spacearound gap-4">
    <Button label="Approve" severity="secondary" variant="outlined" />
    <Button label="Reject" severity="secondary" variant="outlined" />
  </div>
</div>

    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { ChevronDownIcon } from '@heroicons/vue/16/solid';
  
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';
  
  // Props for the questions data
  const props = defineProps({
    questions: Array,
  });
  
  const tabs = ref([
    { name: '1 to 11 questions', href: '#1to11', current: true },
    { name: '12 to 22 questions', href: '#12to22', current: false },
    { name: '23 to 33 questions', href: '#23to33', current: false },
  ]);
  
  // Split the questions into chunks of 11
  const chunkedQuestions = computed(() => {
    const chunkSize = 11;
    const chunks = [];
    for (let i = 0; i < props.questions.length; i += chunkSize) {
      chunks.push(props.questions.slice(i, i + chunkSize));
    }
    return chunks;
  });
  
  // Set the current tab
  const setCurrentTab = (selectedTab) => {
    tabs.value.forEach(tab => {
      tab.current = tab.name === selectedTab.name;
    });
    window.location.hash = selectedTab.href;
  };
  
  // Handle the tab change from the dropdown (mobile)
  const handleTabChange = (event) => {
    const selectedTabName = event.target.value;
    const selectedTab = tabs.value.find(tab => tab.name === selectedTabName);
    if (selectedTab) {
      setCurrentTab(selectedTab);
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  