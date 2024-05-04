export class TemplateEngine {
  private template: string;
  private readonly placeholder = /{{.*?}}/g;
  private readonly statements =
    /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
  private code = "const result = [];";

  setTemplate(template: string) {
    this.template = template.trim();
    let match: RegExpExecArray | null;
    let cursor = 0;
    while ((match = this.placeholder.exec(this.template))) {
      const property = match[0].replace("{{", "").replace("}}", "").trim();
      const newPlaceholder = property.trim();
      this.template = this.template.replace(match[0], newPlaceholder);
      this.addCode(this.template.slice(cursor, match.index));
      this.addCode(newPlaceholder, true);
      cursor = match.index + newPlaceholder.length;
    }
    this.addCode(this.template.substring(cursor, this.template.length));
    this.code = this.returnCode();
    return this;
  }

  parse(data: any) {
    return new Function(this.code.replace(/(\r\n|\n|\r)/gm, "")).apply(data);
  }

  private addCode(line: string, isJsCode = false) {
    if (isJsCode) {
      this.code += this.isStatement(line)
        ? line + ""
        : "result.push(" + line + ");";
    } else {
      this.code += 'result.push("' + line.replace(/"/g, '\\\\"') + '");';
    }
  }

  private isStatement(line: string) {
    return line.match(this.statements);
  }

  private returnCode() {
    this.code += 'return result.join("");';
    return this.code;
  }
}
