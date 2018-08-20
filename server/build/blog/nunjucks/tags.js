module.exports = {
  example(args, content) {
    return `<div class="bd-example" >${content}</div><div><pre><code class="${args}">${html2Escape(
      content
    )}</code></pre></div>`;
  },
  capture(args, content) {
    return `<div class="bd-example" >${content}</div><div><pre><code class="${args}">${html2Escape(
      content
    )}</code></pre></div>`;
  },
  callout(args, content) {
    return `<div class="bd-callout bd-callout-${args}">${html2Escape(content)}</div>`;
  },
};

// function
function html2Escape(sHtml) {
  return sHtml.replace(/[<>&"]/g, c => {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
  });
}
