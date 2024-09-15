const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/onx-button.cases-Dwdw5j31.js","assets/index-DLT8aWvb.js","assets/component-C9nIFekV.js"])))=>i.map(i=>d[i]);
true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (true && deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};

"use strict";

// packages/playwright-ct-core/src/injected/importRegistry.ts
function isImportRef(value) {
  return typeof value === "object" && value && value.__pw_type === "importRef";
}
var ImportRegistry = class {
  constructor() {
    this._registry = /* @__PURE__ */ new Map();
  }
  initialize(components) {
    for (const [name, value] of Object.entries(components))
      this._registry.set(name, value);
  }
  async resolveImportRef(importRef) {
    const importFunction = this._registry.get(importRef.id);
    if (!importFunction)
      throw new Error(`Unregistered component: ${importRef.id}. Following components are registered: ${[...this._registry.keys()]}`);
    let importedObject = await importFunction();
    if (!importedObject)
      throw new Error(`Could not resolve component: ${importRef.id}.`);
    if (importRef.property) {
      importedObject = importedObject[importRef.property];
      if (!importedObject)
        throw new Error(`Could not instantiate component: ${importRef.id}.${importRef.property}.`);
    }
    return importedObject;
  }
};

// packages/playwright-ct-core/src/injected/serializers.ts
function isFunctionRef(value) {
  return value && typeof value === "object" && value.__pw_type === "function";
}
async function unwrapObject(value) {
  return transformObjectAsync(value, async (v) => {
    if (isFunctionRef(v)) {
      const result = (...args) => {
        window.__ctDispatchFunction(v.ordinal, args);
      };
      return { result };
    }
    if (isImportRef(v))
      return { result: await window.__pwRegistry.resolveImportRef(v) };
  });
}
function transformObject(value, mapping) {
  const result = mapping(value);
  if (result)
    return result.result;
  if (value === null || typeof value !== "object")
    return value;
  if (value instanceof Date || value instanceof RegExp || value instanceof URL)
    return value;
  if (Array.isArray(value)) {
    const result3 = [];
    for (const item of value)
      result3.push(transformObject(item, mapping));
    return result3;
  }
  const result2 = {};
  for (const [key, prop] of Object.entries(value))
    result2[key] = transformObject(prop, mapping);
  return result2;
}
async function transformObjectAsync(value, mapping) {
  const result = await mapping(value);
  if (result)
    return result.result;
  if (value === null || typeof value !== "object")
    return value;
  if (value instanceof Date || value instanceof RegExp || value instanceof URL)
    return value;
  if (Array.isArray(value)) {
    const result3 = [];
    for (const item of value)
      result3.push(await transformObjectAsync(item, mapping));
    return result3;
  }
  const result2 = {};
  for (const [key, prop] of Object.entries(value))
    result2[key] = await transformObjectAsync(prop, mapping);
  return result2;
}

// packages/playwright-ct-core/src/injected/index.ts
window.__pwRegistry = new ImportRegistry();
window.__pwUnwrapObject = unwrapObject;
window.__pwTransformObject = transformObject;

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check
// This file is injected into the registry as text, no dependencies are allowed.

/** @typedef {import('@playwright/experimental-ct-core/types/component').ObjectComponent} ObjectComponent */
/** @typedef {new (...args: any[]) => HTMLElement} FrameworkComponent */

const __pwListeners = new Map();

/**
 * @param {HTMLElement} webComponent
 */
function __pwUpdateProps(webComponent, props = {}) {
  for (const [key, value] of Object.entries(props))
    webComponent[key] = value;
}

/**
 * @param {HTMLElement} webComponent
 */
function __pwRemoveEvents(webComponent, events = {}) {
  for (const [key] of Object.entries(events)) {
    webComponent.removeEventListener(key, __pwListeners.get(key));
    __pwListeners.delete(key);
  }
}

/**
 * @param {HTMLElement} webComponent
 */
function __pwUpdateEvents(webComponent, events = {}) {
  for (const [key, listener] of Object.entries(events)) {
    const fn = event => listener(/** @type {CustomEvent} */ (event).detail);
    webComponent.addEventListener(key, fn);
    __pwListeners.set(key, fn);
  }
}

/**
 * @param {HTMLElement} webComponent
 */
function __pwUpdateSlots(webComponent, slots = {}) {
  for (const [key, value] of Object.entries(slots)) {
    let slotElements;
    if (typeof value !== 'object')
      slotElements = [__pwCreateSlot(value)];

    if (Array.isArray(value))
      slotElements = value.map(__pwCreateSlot);

    if (!slotElements)
      throw new Error(`Invalid slot with name: \`${key}\` supplied to \`mount()\``);

    for (const slotElement of slotElements) {
      if (!slotElement)
        throw new Error(`Invalid slot with name: \`${key}\` supplied to \`mount()\``);

      if (key === 'default') {
        webComponent.appendChild(slotElement);
        continue;
      }

      if (slotElement.nodeName === '#text') {
        throw new Error(
          `Invalid slot with name: \`${key}\` supplied to \`mount()\`, expected \`HTMLElement\` but received \`TextNode\`.`
        );
      }

      slotElement.slot = key;
      webComponent.appendChild(slotElement);
    }
  }
}

/**
 * @param {any} value
 * @return {?HTMLElement}
 */
function __pwCreateSlot(value) {
  return /** @type {?HTMLElement} */ (
    document
      .createRange()
      .createContextualFragment(value)
      .firstChild
  );
}

/**
 * @param {ObjectComponent} component
 */
function __pwCreateComponent(component) {
  const webComponent = new component.type();
  __pwUpdateProps(webComponent, component.props);
  __pwUpdateSlots(webComponent, component.slots);
  __pwUpdateEvents(webComponent, component.on);
  return webComponent;
}

window.playwrightMount = async (component, rootElement, hooksConfig) => {
  if (component.__pw_type === 'jsx')
    throw new Error('JSX mount notation is not supported');

  const webComponent = __pwCreateComponent(component);

  for (const hook of window['__pw_hooks_before_mount'] || [])
    await hook({ hooksConfig });

  rootElement.appendChild(webComponent);

  for (const hook of window['__pw_hooks_after_mount'] || [])
    await hook({ hooksConfig });
};

window.playwrightUpdate = async (rootElement, component) => {
  if (component.__pw_type === 'jsx')
    throw new Error('JSX mount notation is not supported');

  const webComponent = /** @type {?HTMLElement} */ (rootElement.firstChild);
  if (!webComponent)
    throw new Error('Component was not mounted');

  __pwUpdateProps(webComponent, component.props);
  __pwUpdateSlots(webComponent, component.slots);
  __pwRemoveEvents(webComponent, component.on);
  __pwUpdateEvents(webComponent, component.on);
};

window.playwrightUnmount = async (rootElement) => {
  rootElement.replaceChildren();
};

const c__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm = () => __vitePreload(() => import('./onx-button.cases-Dwdw5j31.js'),true?__vite__mapDeps([0,1,2]):void 0).then((mod) => mod.GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm);
const c__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm = () => __vitePreload(() => import('./onx-button.cases-Dwdw5j31.js'),true?__vite__mapDeps([0,1,2]):void 0).then((mod) => mod.GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm);
const c__Users_sfree_software_projects_onx_components_lib_src_components_onx_button_component = () => __vitePreload(() => import('./component-C9nIFekV.js'),true?[]:void 0).then((mod) => mod.default);
const C__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm = () => __vitePreload(() => import('./onx-button.cases-Dwdw5j31.js'),true?__vite__mapDeps([0,1,2]):void 0).then((mod) => mod.GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm);
const C__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm = () => __vitePreload(() => import('./onx-button.cases-Dwdw5j31.js'),true?__vite__mapDeps([0,1,2]):void 0).then((mod) => mod.GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm);
const C__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button___components_onx_button_component = () => __vitePreload(() => import('./component-C9nIFekV.js'),true?[]:void 0).then((mod) => mod.default);
const c__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button___components_onx_button_component = () => __vitePreload(() => import('./component-C9nIFekV.js'),true?[]:void 0).then((mod) => mod.default);
const c__Users_sfree_software_projects_onx_components_lib_src_components_onx_button = () => __vitePreload(() => import('./index-DLT8aWvb.js'),true?__vite__mapDeps([1,2]):void 0).then((mod) => mod.default);
__pwRegistry.initialize({ c__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm,
  c__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm,
  c__Users_sfree_software_projects_onx_components_lib_src_components_onx_button_component,
  C__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm,
  C__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button_onx_button_cases_GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm,
  C__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button___components_onx_button_component,
  c__Users_sfree_software_projects_onx_components_lib_tests_components_onx_button___components_onx_button_component,
  c__Users_sfree_software_projects_onx_components_lib_src_components_onx_button });
//# sourceMappingURL=index-bRN1i2xq.js.map
