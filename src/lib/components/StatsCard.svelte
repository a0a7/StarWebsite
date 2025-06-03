<script lang="ts">
    import svelteTilt from 'vanilla-tilt-svelte';
    export let stats: any
</script>

<div 
  class="md:w-[30rem] p-4 my-4 overflow-x-visible rounded-2xl transition-transform" 
  use:svelteTilt={{ 
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
  <h2 class="text-xl text-bold text-fuchsia-50 font-varela">
    <img src={`img/icons/${stats.type.replace(/ /g, "_")}`} alt={`${stats.type} Icon`} class="w-5 linkicon inline">
    {stats.type} 
  </h2>
  {#each stats.achievement as achievement}
    <p class="text-sm text-fuchsia-50 font-varela opacity-85">
      {achievement.name}: {achievement.value}
    </p>
  {/each}
</div>