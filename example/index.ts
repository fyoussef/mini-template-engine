import { TemplateEngine } from "../src/TemplateEngine";

const templateEngine = new TemplateEngine();
const template = templateEngine
  .setTemplate(
    `
    <p>Hello my name is {{ this.name }} and my age is {{ this.person.age }}</p>
    {{ if (this.person.nice) { }}
      <p>{{ this.person.greet }}</p>
    {{  }  }}
  `
  )
  .parse({
    name: "Gustavo",
    person: { age: 23, nice: true, greet: "nice to meet you" },
  });

console.log("template", template);
