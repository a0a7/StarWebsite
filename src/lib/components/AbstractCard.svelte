<script lang="ts">
    import svelteTilt from 'vanilla-tilt-svelte';
</script>
  
<div 
class="relative bg-glassomorphism md:w-[30rem] flex-1 p-4 mt-7 overflow-x-visible transition-transform" use:svelteTilt={{ 
    max: 15,
    perspective: 1500,
    scale: 1.05,
    speed: 500,
    glare: true, // @ts-expect-error: it exists
    "max-glare": 0.3,
    "glare-prerender": false,
    gyroscope: true,
  }}
>
  <div class="absolute right-0 top-0 bottom-0 z-0">
    <slot name="image" />
  </div>

  <h2 class="text-l md:text-xl text-bold text-fuchsia-50 font-varela z-10">
    <slot name="title" />
  </h2>
  <p class="text-sm text-fuchsia-50 font-varela opacity-85 z-10">
    <slot name="date"/>
  </p>
  <slot name="end" />
</div>

<style>
  * {
    cursor: default;
}
</style>