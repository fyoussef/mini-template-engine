import { expect, test } from "vitest";
import { TemplateEngine } from "../TemplateEngine";

test("TemplateEngine with simple data", () => {
  const templateEngine = new TemplateEngine();
  const input = {
    name: "Jhon",
    age: 23,
  };
  const template = templateEngine
    .setTemplate(
      "<p>Hello my name is {{ this.name }} and my age is {{ this.age }}</p>"
    )
    .parse(input);

  expect(template).contain(input.name);
  expect(template).contain(input.age);
});

test("TemplateEngine with if statement", () => {
  const templateEngine = new TemplateEngine();
  const input = {
    name: "Jhon",
    person: { age: 23, nice: true, greet: "nice to meet you" },
  };
  const template = templateEngine
    .setTemplate(
      `
        <p>Hello my name is {{ this.name }} and my age is {{ this.person.age }}</p>
        {{ if (this.person.nice) { }}
          <p>{{ this.person.greet }}</p>
        {{  }  }}
      `
    )
    .parse(input);

  expect(template).contain(input.name);
  expect(template).contain(input.person.age);
  expect(template).contain(input.person.greet);
});
