<script lang="ts">
    import svelteTilt from 'vanilla-tilt-svelte';
</script>
  
<div 
  class="bg-glassomorphism md:w-[30rem] flex-1 p-4 mt-7 overflow-x-visible transition-transform" 
  use:svelteTilt={{
    max: 15,
    perspective: 1500,
    scale: 1.05,
    speed: 500,
    glare: true,
    "max-glare": 0.3,
    "glare-prerender": false,
    gyroscope: true,
  }}
>
  <h2 class="text-l md:text-xl text-bold text-fuchsia-50 font-varela">
    <slot name="title" />
  </h2>
  <p class="text-sm text-fuchsia-50 font-varela opacity-85">
    <slot name="date"/>
  </p>
  <slot name="end" />
</div>