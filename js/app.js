const source = document.getElementById("source");
const layout = document.getElementById("layout");
const checklist = document.getElementById("checklist");
const renderBtn = document.getElementById("renderBtn");
const clearChecksBtn = document.getElementById("clearChecksBtn");
const toggleInputBtn = document.getElementById("toggleInputBtn");

const STORAGE_KEYS = {
  source: "mdChecklist.source",
  checks: "mdChecklist.checks",
  inputHidden: "mdChecklist.inputHidden",
  saved: "mdChecklist.saved",
  drawerOpen: "mdChecklist.drawerOpen"
};

const DEFAULT_MARKDOWN = source.value.trim();
let checkState = loadJson(STORAGE_KEYS.checks, {});
let inputHidden = false;

if (!checkState || typeof checkState !== "object" || Array.isArray(checkState)) {
  checkState = {};
}

const savedSource = loadText(STORAGE_KEYS.source);
source.value = savedSource !== null ? savedSource : DEFAULT_MARKDOWN;

/* ── Storage helpers ── */

function loadText(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function saveText(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures (private mode/quota).
  }
}

function loadJson(key, fallback) {
  const raw = loadText(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  saveText(key, JSON.stringify(value));
}

function loadBool(key, fallback) {
  const raw = loadText(key);
  if (raw === null) return fallback;
  return raw === "1";
}

/* ── Utilities ── */

function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }
  return (hash >>> 0).toString(36);
}

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return text.replace(/[&<>"']/g, (ch) => map[ch]);
}

/* ── Markdown parsing ── */

function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let currentList = [];

  function flushList() {
    if (currentList.length) {
      blocks.push({ type: "list", items: currentList });
      currentList = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, "  ");

    const headingMatch = line.match(/^\s*(#{1,6})\s+(.+?)\s*$/);
    if (headingMatch) {
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2]
      });
      continue;
    }

    const itemMatch = line.match(/^(\s*)(?:[-+*]|\d+\.)\s+(.+?)\s*$/);
    if (itemMatch) {
      const indent = itemMatch[1].length;
      let text = itemMatch[2];
      let checked = false;
      const checkboxMatch = text.match(/^\[( |x|X)\]\s+(.+)$/);
      if (checkboxMatch) {
        checked = checkboxMatch[1].toLowerCase() === "x";
        text = checkboxMatch[2];
      }
      currentList.push({ indent, text, checked });
      continue;
    }

    if (!line.trim()) {
      flushList();
      continue;
    }

    flushList();
    blocks.push({ type: "paragraph", text: line.trim() });
  }

  flushList();
  return blocks;
}

/* ── Tree building and rendering ── */

function buildList(items) {
  const root = [];
  const stack = [{ indent: -1, children: root }];

  for (const item of items) {
    while (stack.length > 1 && item.indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const node = {
      text: item.text,
      checked: item.checked,
      children: []
    };
    stack[stack.length - 1].children.push(node);
    stack.push({ indent: item.indent, children: node.children });
  }

  return root;
}

function renderTree(nodes, path, validIds) {
  if (!nodes.length) return "";
  const parts = ["<ul>"];

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const nodePath = path.concat(i + 1);
    const taskId = `task-${nodePath.join("-")}-${hashText(node.text)}`;
    validIds.add(taskId);
    const checked =
      Object.prototype.hasOwnProperty.call(checkState, taskId) ? checkState[taskId] : node.checked;

    parts.push("<li>");
    parts.push(
      `<label class="task"><input type="checkbox" data-task-id="${taskId}"${checked ? " checked" : ""}><span>${escapeHtml(node.text)}</span></label>`
    );
    parts.push(renderTree(node.children, nodePath, validIds));
    parts.push("</li>");
  }

  parts.push("</ul>");
  return parts.join("");
}

function renderChecklist() {
  const blocks = parseMarkdown(source.value);
  const html = [];
  const validIds = new Set();

  for (const block of blocks) {
    if (block.type === "heading") {
      html.push(`<h${block.level}>${escapeHtml(block.text)}</h${block.level}>`);
      continue;
    }

    if (block.type === "list") {
      html.push(renderTree(buildList(block.items), [], validIds));
      continue;
    }

    html.push(`<p>${escapeHtml(block.text)}</p>`);
  }

  checklist.innerHTML = html.join("") || "<p>No checklist items found.</p>";

  let pruned = false;
  for (const key of Object.keys(checkState)) {
    if (!validIds.has(key)) {
      delete checkState[key];
      pruned = true;
    }
  }
  if (pruned) {
    saveJson(STORAGE_KEYS.checks, checkState);
  }
}

function clearChecks() {
  checklist.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
    if (cb.dataset.taskId) {
      checkState[cb.dataset.taskId] = false;
    }
  });
  saveJson(STORAGE_KEYS.checks, checkState);
}

function setInputHidden(hidden, persist = true) {
  inputHidden = hidden;
  layout.classList.toggle("input-hidden", hidden);
  toggleInputBtn.textContent = hidden ? "Show Input" : "Hide Input";
  if (persist) {
    saveText(STORAGE_KEYS.inputHidden, hidden ? "1" : "0");
  }
}

/* ── Core event listeners ── */

renderBtn.addEventListener("click", () => {
  saveText(STORAGE_KEYS.source, source.value);
  renderChecklist();
  setInputHidden(true);
});
clearChecksBtn.addEventListener("click", clearChecks);
toggleInputBtn.addEventListener("click", () => {
  setInputHidden(!inputHidden);
});
source.addEventListener("input", () => {
  saveText(STORAGE_KEYS.source, source.value);
  renderChecklist();
});
checklist.addEventListener("change", (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.type === "checkbox" && target.dataset.taskId) {
    checkState[target.dataset.taskId] = target.checked;
    saveJson(STORAGE_KEYS.checks, checkState);
  }
});

/* ── Saved Checklists ── */

const savedDrawer = document.getElementById("savedDrawer");
const savedToggle = document.getElementById("savedToggle");
const savedLabel = document.getElementById("savedLabel");
const savedList = document.getElementById("savedList");
const saveBtn = document.getElementById("saveBtn");
const MAX_SAVED = 10;

function getSaved() {
  const arr = loadJson(STORAGE_KEYS.saved, []);
  return Array.isArray(arr) ? arr : [];
}

function putSaved(arr) {
  saveJson(STORAGE_KEYS.saved, arr);
}

function extractTitle(md) {
  const m = md.match(/^#\s+(.+)/m);
  return m ? m[1].trim() : "Untitled";
}

function relativeTime(ts) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return min + " min ago";
  const hr = Math.floor(min / 60);
  if (hr < 24) return hr + "h ago";
  const days = Math.floor(hr / 24);
  if (days === 1) return "yesterday";
  if (days < 30) return days + "d ago";
  return new Date(ts).toLocaleDateString();
}

function renderSavedList() {
  const items = getSaved();
  savedDrawer.style.display = items.length ? "" : "none";
  savedLabel.textContent = "Saved (" + items.length + ")";
  savedList.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.className = "saved-item";
    li.innerHTML =
      '<span class="saved-item-title">' + escapeHtml(item.title) + "</span>" +
      '<span class="saved-item-date">' + relativeTime(item.savedAt) + "</span>" +
      '<button class="saved-item-delete" type="button" title="Delete">&times;</button>';
    li.querySelector(".saved-item-title").addEventListener("click", () => {
      source.value = item.content;
      saveText(STORAGE_KEYS.source, source.value);
      checkState = (item.checks && typeof item.checks === "object") ? Object.assign({}, item.checks) : {};
      saveJson(STORAGE_KEYS.checks, checkState);
      renderChecklist();
    });
    li.querySelector(".saved-item-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      const updated = getSaved().filter((s) => s.id !== item.id);
      putSaved(updated);
      renderSavedList();
    });
    savedList.appendChild(li);
  }
}

saveBtn.addEventListener("click", () => {
  const content = source.value.trim();
  if (!content) return;
  let items = getSaved();
  const dupeIdx = items.findIndex((s) => s.content.trim() === content);
  if (dupeIdx !== -1) {
    items[dupeIdx].savedAt = Date.now();
    items[dupeIdx].title = extractTitle(content);
    items[dupeIdx].checks = Object.assign({}, checkState);
    const moved = items.splice(dupeIdx, 1)[0];
    items.unshift(moved);
  } else {
    items.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: extractTitle(content),
      content: content,
      checks: Object.assign({}, checkState),
      savedAt: Date.now()
    });
    if (items.length > MAX_SAVED) items = items.slice(0, MAX_SAVED);
  }
  putSaved(items);
  renderSavedList();
  // Brief visual feedback
  saveBtn.textContent = "Saved!";
  setTimeout(() => { saveBtn.textContent = "Save"; }, 800);
});

let drawerOpen = loadBool(STORAGE_KEYS.drawerOpen, false);
savedToggle.addEventListener("click", () => {
  drawerOpen = !drawerOpen;
  savedList.style.display = drawerOpen ? "" : "none";
  savedToggle.classList.toggle("open", drawerOpen);
  saveText(STORAGE_KEYS.drawerOpen, drawerOpen ? "1" : "0");
});
// Restore drawer state
if (drawerOpen) {
  savedList.style.display = "";
  savedToggle.classList.add("open");
}
renderSavedList();
