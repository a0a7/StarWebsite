import fs from 'fs';
import yaml from 'js-yaml';
import { load } from 'js-yaml';

const fileContents = fs.readFileSync('static/projects.yml', 'utf8');
let data: any = load(fileContents);
let entries = Object.entries(data);

entries.sort((a, b) => new Date((a[1] as any).end_date).getTime() - new Date((b[1] as any).end_date).getTime());

let sortedData: { [key: string]: any } = {};
for (let [key, value] of entries) {
    sortedData[key] = value;
}

console.log(sortedData);