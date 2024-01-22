<script lang="ts">
    export let project: any
  </script>
  
  <a
    href={`https://github.com/${project.github}`}
    class="bg-white dark:bg-black/50 mx-auto px-4 py-3 pixel-corners w-full no-default-link"
  >
    <h1 class="text-xl font-bold">{project.name}</h1>
  </a>