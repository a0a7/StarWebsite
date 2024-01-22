<script lang="ts">
    import { parse } from 'yaml'
    import fs from 'fs'
    
    let projects

    if (import.meta.env.SSR) {
        const projectsFile = fs.readFileSync('./static/projects.yml', 'utf8')
        projects = parse(projectsFile)
        console.log(projects)
    }
</script>