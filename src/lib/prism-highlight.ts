import Prism from "prismjs";
// Base languages first
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
// Extended languages
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

/**
 * 使用 Prism.js 高亮代码
 * @param code 源代码字符串
 * @param language 语言标识（如 "typescript", "css", "json", "bash"）
 * @returns 高亮后的 HTML 字符串
 */
export function highlightCode(code: string, language: string): string {
  const lang = language.replace(/^language-/, "");
  const grammar = Prism.languages[lang] || Prism.languages.typescript;
  return Prism.highlight(code.trim(), grammar, lang);
}
