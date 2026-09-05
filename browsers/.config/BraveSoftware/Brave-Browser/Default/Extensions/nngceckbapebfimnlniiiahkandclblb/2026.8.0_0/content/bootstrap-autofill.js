/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/autofill/services/dom-element-visibility.service.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DomElementVisibilityService {
    constructor(inlineMenuContentService) {
        this.inlineMenuContentService = inlineMenuContentService;
        this.cachedComputedStyle = null;
    }
    /**
     * Checks if an element is viewable. This is done by checking if the element is within the
     * viewport bounds, not hidden by CSS, and not hidden behind another element.
     * @param element
     */
    isElementViewable(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const elementBoundingClientRect = element.getBoundingClientRect();
            if (this.isElementOutsideViewportBounds(element, elementBoundingClientRect) ||
                this.isElementHiddenByCss(element)) {
                return false;
            }
            return this.formFieldIsNotHiddenBehindAnotherElement(element, elementBoundingClientRect);
        });
    }
    /**
     * Check if the target element is hidden using CSS. This is done by checking the opacity, display,
     * visibility, and clip-path CSS properties of the element. We also check the opacity of all
     * parent elements to ensure that the target element is not hidden by a parent element.
     * @param {HTMLElement} element
     * @returns {boolean}
     * @public
     */
    isElementHiddenByCss(element) {
        this.cachedComputedStyle = null;
        if (this.isElementInvisible(element) ||
            this.isElementNotDisplayed(element) ||
            this.isElementNotVisible(element) ||
            this.isElementClipped(element)) {
            return true;
        }
        let parentElement = element.parentElement;
        while (parentElement && parentElement !== element.ownerDocument.documentElement) {
            this.cachedComputedStyle = null;
            if (this.isElementInvisible(parentElement)) {
                return true;
            }
            parentElement = parentElement.parentElement;
        }
        return false;
    }
    /**
     * Gets the computed style of a given element, will only calculate the computed
     * style if the element's style has not been previously cached.
     * @param {HTMLElement} element
     * @param {string} styleProperty
     * @returns {string}
     * @private
     */
    getElementStyle(element, styleProperty) {
        if (!this.cachedComputedStyle) {
            this.cachedComputedStyle = (element.ownerDocument.defaultView || globalThis).getComputedStyle(element);
        }
        return this.cachedComputedStyle.getPropertyValue(styleProperty);
    }
    /**
     * Checks if the opacity of the target element is less than 0.1.
     * @param {HTMLElement} element
     * @returns {boolean}
     * @private
     */
    isElementInvisible(element) {
        return parseFloat(this.getElementStyle(element, "opacity")) < 0.1;
    }
    /**
     * Checks if the target element has a display property of none.
     * @param {HTMLElement} element
     * @returns {boolean}
     * @private
     */
    isElementNotDisplayed(element) {
        return this.getElementStyle(element, "display") === "none";
    }
    /**
     * Checks if the target element has a visibility property of hidden or collapse.
     * @param {HTMLElement} element
     * @returns {boolean}
     * @private
     */
    isElementNotVisible(element) {
        return new Set(["hidden", "collapse"]).has(this.getElementStyle(element, "visibility"));
    }
    /**
     * Checks if the target element has a clip-path property that hides the element.
     * @param {HTMLElement} element
     * @returns {boolean}
     * @private
     */
    isElementClipped(element) {
        return new Set([
            "inset(50%)",
            "inset(100%)",
            "circle(0)",
            "circle(0px)",
            "circle(0px at 50% 50%)",
            "polygon(0 0, 0 0, 0 0, 0 0)",
            "polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px)",
        ]).has(this.getElementStyle(element, "clipPath"));
    }
    /**
     * Checks if the target element is outside the viewport bounds. This is done by checking if the
     * element is too small or is overflowing the viewport bounds.
     * @param {HTMLElement} targetElement
     * @param {DOMRectReadOnly | null} targetElementBoundingClientRect
     * @returns {boolean}
     * @private
     */
    isElementOutsideViewportBounds(targetElement, targetElementBoundingClientRect = null) {
        const documentElement = targetElement.ownerDocument.documentElement;
        const documentElementWidth = documentElement.scrollWidth;
        const documentElementHeight = documentElement.scrollHeight;
        const elementBoundingClientRect = targetElementBoundingClientRect || targetElement.getBoundingClientRect();
        const elementTopOffset = elementBoundingClientRect.top - documentElement.clientTop;
        const elementLeftOffset = elementBoundingClientRect.left - documentElement.clientLeft;
        const isElementSizeInsufficient = elementBoundingClientRect.width < 10 || elementBoundingClientRect.height < 10;
        const isElementOverflowingLeftViewport = elementLeftOffset < 0;
        const isElementOverflowingRightViewport = elementLeftOffset + elementBoundingClientRect.width > documentElementWidth;
        const isElementOverflowingTopViewport = elementTopOffset < 0;
        const isElementOverflowingBottomViewport = elementTopOffset + elementBoundingClientRect.height > documentElementHeight;
        return (isElementSizeInsufficient ||
            isElementOverflowingLeftViewport ||
            isElementOverflowingRightViewport ||
            isElementOverflowingTopViewport ||
            isElementOverflowingBottomViewport);
    }
    /**
     * Checks if a passed FormField is not hidden behind another element. This is done by
     * checking if the element at the center point of the FormField is the FormField itself
     * or one of its labels.
     * @param {FormFieldElement} targetElement
     * @param {DOMRectReadOnly | null} targetElementBoundingClientRect
     * @returns {boolean}
     * @private
     */
    formFieldIsNotHiddenBehindAnotherElement(targetElement, targetElementBoundingClientRect = null) {
        var _a, _b;
        const elementBoundingClientRect = targetElementBoundingClientRect || targetElement.getBoundingClientRect();
        const elementRootNode = targetElement.getRootNode();
        const rootElement = elementRootNode instanceof ShadowRoot ? elementRootNode : targetElement.ownerDocument;
        const elementAtCenterPoint = rootElement.elementFromPoint(elementBoundingClientRect.left + elementBoundingClientRect.width / 2, elementBoundingClientRect.top + elementBoundingClientRect.height / 2);
        if (elementAtCenterPoint === targetElement) {
            return true;
        }
        if ((_a = this.inlineMenuContentService) === null || _a === void 0 ? void 0 : _a.isElementInlineMenu(elementAtCenterPoint)) {
            return true;
        }
        const targetElementLabelsSet = new Set(targetElement.labels);
        if (targetElementLabelsSet.has(elementAtCenterPoint)) {
            return true;
        }
        const closestParentLabel = (_b = elementAtCenterPoint === null || elementAtCenterPoint === void 0 ? void 0 : elementAtCenterPoint.parentElement) === null || _b === void 0 ? void 0 : _b.closest("label");
        return closestParentLabel ? targetElementLabelsSet.has(closestParentLabel) : false;
    }
}
/* harmony default export */ var dom_element_visibility_service = (DomElementVisibilityService);

;// ../../libs/common/src/autofill/constants/match-patterns.ts
const CardExpiryDateDelimiters = ["/", "-", ".", " "];
// `CardExpiryDateDelimiters` is not intended solely for regex consumption,
// so we need to format it here
const ExpiryDateDelimitersPattern = "\\" +
    CardExpiryDateDelimiters.join("\\")
        // replace space character with the regex whitespace character class
        .replace(" ", "s");
const MonthPattern = "(([1]{1}[0-2]{1})|(0?[1-9]{1}))";
// Because we're dealing with expiry dates, we assume the year will be in current or next century (as of 2024)
const ExpiryFullYearPattern = "2[0-1]{1}\\d{2}";
const DelimiterPatternExpression = new RegExp(`[${ExpiryDateDelimitersPattern}]`, "g");
const IrrelevantExpiryCharactersPatternExpression = new RegExp(
// "nor digits" to ensure numbers are removed from guidance pattern, which aren't covered by ^\w
`[^\\d${ExpiryDateDelimitersPattern}]`, "g");
const MonthPatternExpression = new RegExp(`^${MonthPattern}$`);
const ExpiryFullYearPatternExpression = new RegExp(`^${ExpiryFullYearPattern}$`);

;// ../../libs/common/src/autofill/constants/index.ts
const TYPE_CHECK = {
    FUNCTION: "function",
    NUMBER: "number",
    STRING: "string",
};
const EVENTS = {
    CHANGE: "change",
    INPUT: "input",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    KEYUP: "keyup",
    BLUR: "blur",
    CLICK: "click",
    FOCUS: "focus",
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout",
    SCROLL: "scroll",
    RESIZE: "resize",
    DOMCONTENTLOADED: "DOMContentLoaded",
    LOAD: "load",
    MESSAGE: "message",
    VISIBILITYCHANGE: "visibilitychange",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSEUP: "mouseup",
    MOUSEOUT: "mouseout",
    SUBMIT: "submit",
};
/**
 * HTML attributes observed by the MutationObserver for autofill form/field tracking.
 * If you need to observe a new attribute, add it here.
 */
const AUTOFILL_ATTRIBUTES = {
    ACTION: "action",
    ARIA_DESCRIBEDBY: "aria-describedby",
    ARIA_DISABLED: "aria-disabled",
    ARIA_HASPOPUP: "aria-haspopup",
    ARIA_HIDDEN: "aria-hidden",
    ARIA_LABEL: "aria-label",
    ARIA_LABELLEDBY: "aria-labelledby",
    AUTOCOMPLETE: "autocomplete",
    AUTOCOMPLETE_TYPE: "autocompletetype",
    X_AUTOCOMPLETE_TYPE: "x-autocompletetype",
    CHECKED: "checked",
    // CLASS intentionally omitted because it can cause a callback storm on dynamic pages.
    DATA_LABEL: "data-label",
    DATA_STRIPE: "data-stripe",
    DISABLED: "disabled",
    ID: "id",
    MAXLENGTH: "maxlength",
    METHOD: "method",
    NAME: "name",
    PLACEHOLDER: "placeholder",
    POPOVER: "popover",
    POPOVERTARGET: "popovertarget",
    POPOVERTARGETACTION: "popovertargetaction",
    READONLY: "readonly",
    REL: "rel",
    TABINDEX: "tabindex",
    TITLE: "title",
    TYPE: "type",
};
const ClearClipboardDelay = {
    Never: "never",
    TenSeconds: "tenSeconds",
    TwentySeconds: "twentySeconds",
    ThirtySeconds: "thirtySeconds",
    OneMinute: "oneMinute",
    TwoMinutes: "twoMinutes",
    FiveMinutes: "fiveMinutes",
};
/* Ids for context menu items and messaging events */
const AUTOFILL_CARD_ID = "autofill-card";
const AUTOFILL_ID = "autofill";
const SHOW_AUTOFILL_BUTTON = "show-autofill-button";
const AUTOFILL_IDENTITY_ID = "autofill-identity";
const AUTOFILL_TRIAGE_ID = "autofill-triage";
const COPY_IDENTIFIER_ID = "copy-identifier";
const COPY_PASSWORD_ID = "copy-password";
const COPY_USERNAME_ID = "copy-username";
const COPY_VERIFICATION_CODE_ID = "copy-totp";
const CREATE_CARD_ID = "create-card";
const CREATE_IDENTITY_ID = "create-identity";
const CREATE_LOGIN_ID = "create-login";
const GENERATE_PASSWORD_ID = "generate-password";
const NOOP_COMMAND_SUFFIX = "noop";
const ROOT_ID = "root";
const SEPARATOR_ID = "separator";
const UPDATE_PASSWORD = "update-password";
const NOTIFICATION_BAR_LIFESPAN_MS = 150000; // 150 seconds
const AUTOFILL_OVERLAY_HANDLE_REPOSITION = "autofill-overlay-handle-reposition-event";
const AUTOFILL_OVERLAY_HANDLE_SCROLL = "autofill-overlay-handle-scroll-event";
const UPDATE_PASSKEYS_HEADINGS_ON_SCROLL = "update-passkeys-headings-on-scroll";
const AUTOFILL_TRIGGER_FORM_FIELD_SUBMIT = "autofill-trigger-form-field-submit";
const AutofillOverlayVisibility = {
    Off: 0,
    OnButtonClick: 1,
    OnFieldFocus: 2,
};
const BrowserClientVendors = {
    Chrome: "Chrome",
    Firefox: "Firefox",
    Opera: "Opera",
    Edge: "Edge",
    Vivaldi: "Vivaldi",
    Unknown: "Unknown",
};
const BrowserShortcutsUris = {
    Chrome: "chrome://extensions/shortcuts",
    Firefox: "https://bitwarden.com/help/keyboard-shortcuts",
    Opera: "opera://extensions/shortcuts",
    Edge: "edge://extensions/shortcuts",
    Vivaldi: "vivaldi://extensions/shortcuts",
    Unknown: "https://bitwarden.com/help/keyboard-shortcuts",
};
const DisablePasswordManagerUris = {
    Chrome: "chrome://password-manager/settings",
    Firefox: "https://bitwarden.com/help/disable-browser-autofill/",
    Opera: "opera://settings/autofill",
    Edge: "edge://settings/autofill/passwords/settings",
    Vivaldi: "vivaldi://settings/autofill",
    Unknown: "https://bitwarden.com/help/disable-browser-autofill/",
};
const ExtensionCommand = {
    AutofillCommand: "autofill_cmd",
    AutofillCard: "autofill_card",
    AutofillIdentity: "autofill_identity",
    AutofillLogin: "autofill_login",
    OpenAutofillOverlay: "open_autofill_overlay",
    GeneratePassword: "generate_password",
    OpenPopup: "open_popup",
    LockVault: "lock_vault",
    NoopCommand: "noop",
};
const CLEAR_NOTIFICATION_LOGIN_DATA_DURATION = (/* unused pure expression or super */ null && (60 * 1000)); // 1 minute
const MAX_DEEP_QUERY_RECURSION_DEPTH = 4;
const DEEP_QUERY_SELECTOR_COMBINATOR = ">>>";
// this list is derived from the `attachShadow` candidate elements list
// https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
const SHADOW_ROOT_CANDIDATE_NODE_NAMES = Object.freeze(new Set([
    "ARTICLE",
    "ASIDE",
    "BLOCKQUOTE",
    "BODY",
    "DIV",
    "FOOTER",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HEADER",
    "MAIN",
    "NAV",
    "P",
    "SECTION",
    "SPAN",
]));
/**
 * Field keys for targeting rules. These MUST match the `fieldKey` enum in
 * the Forms Map schema.
 */
const AutofillTargetingRuleTypes = {
    // Authentication
    username: "username",
    password: "password",
    newPassword: "newPassword",
    oneTimeCode: "oneTimeCode",
    // Name
    fullName: "fullName",
    honorificPrefix: "honorificPrefix",
    firstName: "firstName",
    middleName: "middleName",
    lastName: "lastName",
    honorificSuffix: "honorificSuffix",
    // Contact
    email: "email",
    phone: "phone",
    phoneCountryCode: "phoneCountryCode",
    phoneAreaCode: "phoneAreaCode",
    phoneLocal: "phoneLocal",
    phoneExtension: "phoneExtension",
    organization: "organization",
    // Address
    streetAddress: "streetAddress",
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    addressLine3: "addressLine3",
    addressLevel1: "addressLevel1",
    addressLevel2: "addressLevel2",
    addressLevel3: "addressLevel3",
    addressLevel4: "addressLevel4",
    postalCode: "postalCode",
    country: "country",
    // Birthdate
    birthdate: "birthdate",
    birthdateDay: "birthdateDay",
    birthdateMonth: "birthdateMonth",
    birthdateYear: "birthdateYear",
    // Payment card
    cardholderName: "cardholderName",
    cardNumber: "cardNumber",
    cardExpirationDate: "cardExpirationDate",
    cardExpirationMonth: "cardExpirationMonth",
    cardExpirationYear: "cardExpirationYear",
    cardCvv: "cardCvv",
    cardType: "cardType",
    // Consent
    consentTerms: "consentTerms",
    consentPrivacy: "consentPrivacy",
    consentUser: "consentUser",
    // Search
    searchTerm: "searchTerm",
};
const FormPurposeCategories = {
    AccountCreation: "account-creation",
    AccountLogin: "account-login",
    AccountRecovery: "account-recovery",
    AccountUpdate: "account-update",
    Address: "address",
    Identity: "identity",
    PaymentCard: "payment-card",
    Search: "search",
    Signup: "signup",
};


;// ./src/autofill/content/performance.ts
// Hot-path instrumentation for autofill content scripts.
// See performance.md for usage and performance.design.md for design rationale.
const enabled = false;
const WATCH_BITS = enabled ? 10 : 0;
const WATCH_SIZE = 1 << WATCH_BITS;
const WATCH_MASK = WATCH_SIZE - 1;
const DEFAULT_METER_BITS = 8;
const namesCache = {};
let namesCacheSize = 0;
const NAMES_CACHE_WARN_THRESHOLD = 64;
const NAMES_SUFFIX = "autofill:bw";
function formatMark(name, mark) {
    return `${name}:${mark}:${NAMES_SUFFIX}`;
}
function resolveNames(name) {
    let names = namesCache[name];
    if (!names) {
        names = {
            measure: `${name}:${NAMES_SUFFIX}`,
            start: formatMark(name, "start"),
            end: formatMark(name, "end"),
            poison: formatMark(name, "poison"),
        };
        namesCache[name] = names;
        namesCacheSize++;
        if (namesCacheSize === NAMES_CACHE_WARN_THRESHOLD) {
            // eslint-disable-next-line no-console -- this is running in a content-script; `LogService` is unavailable
            console.warn(`[perf] ${NAMES_CACHE_WARN_THRESHOLD} unique measurement names registered. ` +
                "This cache is not bounded — ensure names are static, not dynamically generated.");
        }
    }
    return names;
}
const watchBuffer = new Array(WATCH_SIZE);
for (let i = 0; i < WATCH_SIZE; i++) {
    watchBuffer[i] = { name: "", start: 0, end: 0 };
}
let watchWriteHead = 0;
let watchReadHead = 0;
const meters = [];
let pendingFlush = false;
function scheduleFlush() {
    globalThis.setTimeout(flushBuffer, 0);
}
function recordWatch(name, start, end) {
    const slot = watchBuffer[watchWriteHead & WATCH_MASK];
    slot.name = name;
    slot.start = start;
    slot.end = end;
    watchWriteHead++;
    if (!pendingFlush) {
        pendingFlush = true;
        scheduleFlush();
    }
}
function flushBuffer() {
    let rescheduleNeeded = false;
    const watchWriteHeadAtStart = watchWriteHead;
    if (watchWriteHeadAtStart - watchReadHead > WATCH_SIZE) {
        watchReadHead = watchWriteHeadAtStart - WATCH_SIZE;
    }
    while (watchReadHead < watchWriteHeadAtStart) {
        const slot = watchBuffer[watchReadHead & WATCH_MASK];
        const names = resolveNames(slot.name);
        performance.mark(names.start, { startTime: slot.start });
        performance.mark(names.end, { startTime: slot.end });
        performance.measure(names.measure, names.start, names.end);
        watchReadHead++;
    }
    for (let i = 0; i < meters.length; i++) {
        const m = meters[i];
        const meterWriteHeadAtStart = m.getWriteHead();
        let meterReadHead = m.getReadHead();
        const meterSize = m.mask + 1;
        if (meterWriteHeadAtStart - meterReadHead > meterSize) {
            meterReadHead = meterWriteHeadAtStart - meterSize;
        }
        const markName = `${m.name}:meter:${NAMES_SUFFIX}`;
        const arity = m.keys.length;
        while (meterReadHead < meterWriteHeadAtStart) {
            const row = m.buffer[meterReadHead & m.mask];
            const at = row[0];
            if (arity === 0) {
                performance.mark(markName, { startTime: at });
            }
            else {
                const detail = {};
                for (let k = 0; k < arity; k++) {
                    detail[m.keys[k]] = row[k + 1];
                }
                performance.mark(markName, { startTime: at, detail });
            }
            meterReadHead++;
        }
        m.setReadHead(meterReadHead);
        if (m.getWriteHead() > meterWriteHeadAtStart) {
            rescheduleNeeded = true;
        }
    }
    pendingFlush = false;
    if (watchWriteHead > watchWriteHeadAtStart || rescheduleNeeded) {
        pendingFlush = true;
        scheduleFlush();
    }
}
/**
 * Wraps a function with timing instrumentation. The wrapper preserves the
 * function's return value, arguments, and `this` context. When disabled at
 * build time, the wrapper delegates directly to `fn` with no timestamps or
 * buffer writes.
 *
 * **Warning:** Only measures synchronous execution. If `fn` returns a Promise,
 * the recorded duration is the time to create the promise, not to resolve it.
 *
 * @param name - Label for the resulting performance measure entries.
 * @param fn - The function to instrument.
 * @returns A wrapper that instruments `fn` when enabled, or delegates directly when disabled.
 */
function stopwatch(name, fn) {
    return function (...args) {
        if (!enabled) {
            return fn.apply(this, args);
        }
        const start = performance.now();
        const result = fn.apply(this, args);
        recordWatch(name, start, performance.now());
        return result;
        // Best-effort type preservation: the wrapper's call signature matches T,
        // but any non-callable properties on T (e.g. a .cancel() method) are lost.
    };
}
/**
 * Executes `fn` and records its duration. Use for inline code blocks that don't
 * sit at a function boundary. When disabled, calls `fn()` directly with no overhead.
 *
 * **Warning:** Only measures synchronous execution. If `fn` returns a Promise,
 * the recorded duration is the time to create the promise, not to resolve it.
 *
 * @param name - Label for the resulting performance measure entry.
 * @param fn - The block to time.
 * @returns The return value of `fn`.
 */
function measure(name, fn) {
    if (!enabled) {
        return fn();
    }
    const start = performance.now();
    const result = fn();
    recordWatch(name, start, performance.now());
    return result;
}
const NOOP = () => { };
/**
 * Registers a meter and returns a function that records one point-in-time event
 * per call. Each call records `performance.now()` and zero or more positional
 * values typed `string | number | boolean`. The declared field names become the
 * keys of the `detail` object on the resulting `${name}:meter:autofill:bw` mark.
 *
 * When disabled at build time, returns a shared no-op and allocates no buffer.
 *
 * @param config - The meter name as a string, or `{ name, bits }` to override
 *   the per-meter buffer size. Buffer size is `1 << bits`. Defaults to 8.
 * @param keys - Field names; their order determines the positional argument order.
 * @returns A function that records one meter entry per call.
 */
function createMeter(config, ...keys) {
    var _a;
    if (!enabled) {
        return NOOP;
    }
    const name = typeof config === "string" ? config : config.name;
    const bits = typeof config === "string" ? DEFAULT_METER_BITS : ((_a = config.bits) !== null && _a !== void 0 ? _a : DEFAULT_METER_BITS);
    const size = 1 << bits;
    const mask = size - 1;
    const rowLength = 1 + keys.length;
    const buffer = new Array(size);
    for (let i = 0; i < size; i++) {
        buffer[i] = new Array(rowLength);
    }
    let writeHead = 0;
    let readHead = 0;
    meters.push({
        name,
        keys,
        buffer,
        mask,
        getWriteHead: () => writeHead,
        getReadHead: () => readHead,
        setReadHead: (v) => {
            readHead = v;
        },
    });
    return ((...values) => {
        const slot = buffer[writeHead & mask];
        slot[0] = performance.now();
        for (let i = 0; i < values.length; i++) {
            slot[i + 1] = values[i];
        }
        writeHead++;
        if (!pendingFlush) {
            pendingFlush = true;
            scheduleFlush();
        }
    });
}
/**
 * Marks a span measurement as poisoned by writing a `${name}:poison:autofill:bw`
 * mark to the Performance Timeline. Use when an unexpected error or external
 * factor has compromised the timing data. Consumers should check for poison
 * marks before trusting extracted measures.
 *
 * Applies only to spans (`stopwatch`/`measure`). Meter entries cannot be poisoned.
 *
 * When disabled at build time, this is a no-op.
 *
 * @param name - The span measurement name to poison.
 */
function poison(name) {
    if (!enabled) {
        return;
    }
    const names = resolveNames(name);
    performance.mark(names.poison);
}

;// ./src/autofill/enums/autofill-port.enum.ts
const AutofillPort = {
    InjectedScript: "autofill-injected-script-port",
};


;// ./src/autofill/utils/index.ts
var utils_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Generates a random string of characters.
 *
 * @param length - The length of the random string to generate.
 */
function generateRandomChars(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const randomChars = [];
    const randomBytes = new Uint8Array(length);
    globalThis.crypto.getRandomValues(randomBytes);
    for (let byteIndex = 0; byteIndex < randomBytes.length; byteIndex++) {
        const byte = randomBytes[byteIndex];
        randomChars.push(chars[byte % chars.length]);
    }
    return randomChars.join("");
}
/**
 * Polyfills the requestIdleCallback API with a setTimeout fallback.
 *
 * @param callback - The callback function to run when the browser is idle.
 * @param options - The options to pass to the requestIdleCallback function.
 */
function requestIdleCallbackPolyfill(callback, options) {
    if ("requestIdleCallback" in globalThis) {
        return globalThis.requestIdleCallback(() => callback(), options);
    }
    return globalThis.setTimeout(() => callback(), 1);
}
/**
 * Polyfills the cancelIdleCallback API with a clearTimeout fallback.
 *
 * @param id - The ID of the idle callback to cancel.
 */
function cancelIdleCallbackPolyfill(id) {
    if ("cancelIdleCallback" in globalThis) {
        return globalThis.cancelIdleCallback(id);
    }
    return globalThis.clearTimeout(id);
}
/**
 * Generates a random string of characters that formatted as a custom element name.
 */
function generateRandomCustomElementName() {
    const length = Math.floor(Math.random() * 5) + 8; // Between 8 and 12 characters
    const numHyphens = Math.min(Math.max(Math.floor(Math.random() * 4), 1), length - 1); // At least 1, maximum of 3 hyphens
    const hyphenIndices = [];
    while (hyphenIndices.length < numHyphens) {
        const index = Math.floor(Math.random() * (length - 1)) + 1;
        if (!hyphenIndices.includes(index)) {
            hyphenIndices.push(index);
        }
    }
    hyphenIndices.sort((a, b) => a - b);
    let randomString = "";
    let prevIndex = 0;
    for (let index = 0; index < hyphenIndices.length; index++) {
        const hyphenIndex = hyphenIndices[index];
        randomString = randomString + generateRandomChars(hyphenIndex - prevIndex) + "-";
        prevIndex = hyphenIndex;
    }
    randomString += generateRandomChars(length - prevIndex);
    return randomString;
}
/**
 * Builds a DOM element from an SVG string.
 *
 * @param svgString - The SVG string to build the DOM element from.
 * @param ariaHidden - Determines whether the SVG should be hidden from screen readers.
 */
function buildSvgDomElement(svgString, ariaHidden = true) {
    const domParser = new DOMParser();
    const svgDom = domParser.parseFromString(svgString, "image/svg+xml");
    const domElement = svgDom.documentElement;
    domElement.setAttribute("aria-hidden", `${ariaHidden}`);
    return domElement;
}
/**
 * Sends a message to the extension.
 *
 * @param command - The command to send.
 * @param options - The options to send with the command.
 */
function sendExtensionMessage(command_1) {
    return utils_awaiter(this, arguments, void 0, function* (command, options = {}) {
        if (typeof browser !== "undefined" &&
            typeof browser.runtime !== "undefined" &&
            typeof browser.runtime.sendMessage !== "undefined") {
            return browser.runtime.sendMessage(Object.assign({ command }, options));
        }
        return new Promise((resolve) => chrome.runtime.sendMessage(Object.assign({ command }, options), (response) => {
            if (chrome.runtime.lastError) {
                resolve(null);
            }
            resolve(response);
        }));
    });
}
/**
 * Sets CSS styles on an element.
 *
 * @param element - The element to set the styles on.
 * @param styles - The styles to set on the element.
 * @param priority - Determines whether the styles should be set as important.
 */
function setElementStyles(element, styles, priority) {
    if (!element || !styles || !Object.keys(styles).length) {
        return;
    }
    for (const styleProperty in styles) {
        const styleValue = styles[styleProperty];
        if (styleValue !== undefined) {
            element.style.setProperty(styleProperty.replace(/([a-z])([A-Z])/g, "$1-$2"), // Convert camelCase to kebab-case
            styleValue, priority ? "important" : undefined);
        }
    }
}
/**
 * Sets up a long-lived connection with the extension background
 * and triggers an onDisconnect event if the extension context
 * is invalidated.
 *
 * @param callback - Callback export function to run when the extension disconnects
 */
function setupExtensionDisconnectAction(callback) {
    const port = chrome.runtime.connect({ name: AutofillPort.InjectedScript });
    const onDisconnectCallback = (disconnectedPort) => {
        callback(disconnectedPort);
        port.onDisconnect.removeListener(onDisconnectCallback);
    };
    port.onDisconnect.addListener(onDisconnectCallback);
}
/**
 * Handles setup of the extension disconnect action for the autofill init class
 * in both instances where the overlay might or might not be initialized.
 *
 * @param windowContext - The global window context
 */
function setupAutofillInitDisconnectAction(windowContext) {
    const bitwardenAutofillInit = windowContext.bitwardenAutofillInit;
    if (!bitwardenAutofillInit) {
        return;
    }
    const onDisconnectCallback = () => {
        bitwardenAutofillInit.destroy();
        delete windowContext.bitwardenAutofillInit;
    };
    setupExtensionDisconnectAction(onDisconnectCallback);
}
/**
 * Identifies whether an element is a fillable form field.
 * This is determined by whether the element is a form field and not a span.
 *
 * @param formFieldElement - The form field element to check.
 */
function elementIsFillableFormField(formFieldElement) {
    return !elementIsSpanElement(formFieldElement);
}
/**
 * Identifies whether an element is an instance of a specific tag name.
 *
 * @param element - The element to check.
 * @param tagName -  The tag name to check against.
 */
function elementIsInstanceOf(element, tagName) {
    return nodeIsElement(element) && element.tagName.toLowerCase() === tagName;
}
/**
 * Identifies whether an element is a span element.
 *
 * @param element - The element to check.
 */
function elementIsSpanElement(element) {
    return elementIsInstanceOf(element, "span");
}
/**
 * Identifies whether an element is an input field.
 *
 * @param element - The element to check.
 */
function elementIsInputElement(element) {
    return elementIsInstanceOf(element, "input");
}
/**
 * Identifies whether an element is a select field.
 *
 * @param element - The element to check.
 */
function elementIsSelectElement(element) {
    return elementIsInstanceOf(element, "select");
}
/**
 * Identifies whether an element is a textarea field.
 *
 * @param element - The element to check.
 */
function elementIsTextAreaElement(element) {
    return elementIsInstanceOf(element, "textarea");
}
/**
 * Identifies whether an element is a form element.
 *
 * @param element - The element to check.
 */
function elementIsFormElement(element) {
    return elementIsInstanceOf(element, "form");
}
/**
 * Identifies whether an element is a label element.
 *
 * @param element - The element to check.
 */
function elementIsLabelElement(element) {
    return elementIsInstanceOf(element, "label");
}
/**
 * Identifies whether an element is a description details `dd` element.
 *
 * @param element - The element to check.
 */
function elementIsDescriptionDetailsElement(element) {
    return elementIsInstanceOf(element, "dd");
}
/**
 * Identifies whether an element is a description term `dt` element.
 *
 * @param element - The element to check.
 */
function elementIsDescriptionTermElement(element) {
    return elementIsInstanceOf(element, "dt");
}
/**
 * Identifies whether a node is an HTML element.
 *
 * @param node - The node to check.
 */
function nodeIsElement(node) {
    if (!node) {
        return false;
    }
    return (node === null || node === void 0 ? void 0 : node.nodeType) === Node.ELEMENT_NODE;
}
function elementIsTypeSubmitElement(element) {
    return getPropertyOrAttribute(element, "type") === "submit";
}
function elementIsButtonElement(element) {
    return (elementIsInstanceOf(element, "button") ||
        getPropertyOrAttribute(element, "type") === "button");
}
function elementIsAnchorElement(element) {
    return elementIsInstanceOf(element, "a");
}
/**
 * Returns a boolean representing the attribute value of an element.
 *
 * @param element
 * @param attributeName
 * @param checkString
 */
function getAttributeBoolean(element, attributeName, checkString = false) {
    if (checkString) {
        return getPropertyOrAttribute(element, attributeName) === "true";
    }
    return Boolean(getPropertyOrAttribute(element, attributeName));
}
/**
 * Checks if a form field element is currently readonly or disabled.
 *
 * @param formFieldElement - The form field element to evaluate.
 * @param autofillFieldData - Optional cached autofill metadata for readonly or disabled state.
 */
function isReadonlyOrDisabledFormFieldElement(formFieldElement, autofillFieldData) {
    const readOnlyByProperty = (elementIsInputElement(formFieldElement) || elementIsTextAreaElement(formFieldElement)) &&
        formFieldElement.readOnly;
    return (getAttributeBoolean(formFieldElement, AUTOFILL_ATTRIBUTES.DISABLED) ||
        readOnlyByProperty ||
        getAttributeBoolean(formFieldElement, "aria-readonly", true) ||
        (autofillFieldData === null || autofillFieldData === void 0 ? void 0 : autofillFieldData.readonly) === true ||
        (autofillFieldData === null || autofillFieldData === void 0 ? void 0 : autofillFieldData.disabled) === true);
}
/**
 * Get the value of a property or attribute from a FormFieldElement.
 *
 * @param element
 * @param attributeName
 */
function getPropertyOrAttribute(element, attributeName) {
    var _a;
    if (attributeName in element) {
        return (_a = element[attributeName]) !== null && _a !== void 0 ? _a : null;
    }
    return element.getAttribute(attributeName);
}
/**
 * Throttles a callback function to run at most once every `limit` milliseconds.
 *
 * @param callback - The callback function to throttle (must return void).
 * @param limit - The time in milliseconds to throttle the callback.
 */
function throttle(callback, limit) {
    let waitingDelay = false;
    return function (...args) {
        if (waitingDelay) {
            return;
        }
        callback.apply(this, args);
        waitingDelay = true;
        globalThis.setTimeout(() => (waitingDelay = false), limit);
    };
}
/**
 * Debounces a callback function to run after a delay of `delay` milliseconds.
 *
 * @param callback - The callback function to debounce.
 * @param delay - The time in milliseconds to debounce the callback.
 * @param immediate - Determines whether the callback should run immediately.
 */
function debounce(callback, delay, immediate) {
    let timeout = null;
    return function (...args) {
        const callImmediately = !!immediate && !timeout;
        if (timeout) {
            globalThis.clearTimeout(timeout);
        }
        timeout = globalThis.setTimeout(() => {
            timeout = null;
            if (!callImmediately) {
                callback.apply(this, args);
            }
        }, delay);
        if (callImmediately) {
            callback.apply(this, args);
        }
    };
}
/**
 * Generates the origin and subdomain match patterns for the URL.
 *
 * @param url - The URL of the tab
 */
function generateDomainMatchPatterns(url) {
    try {
        const extensionUrlPattern = /^(chrome|chrome-extension|moz-extension|safari-web-extension):\/\/\/?/;
        if (extensionUrlPattern.test(url)) {
            return [];
        }
        // Add protocol to URL if it is missing to allow for parsing the hostname correctly
        const urlPattern = /^(https?|file):\/\/\/?/;
        if (!urlPattern.test(url)) {
            url = `https://${url}`;
        }
        let protocolGlob = "*://";
        if (url.startsWith("file:///")) {
            protocolGlob = "*:///"; // File URLs require three slashes to be a valid match pattern
        }
        const parsedUrl = new URL(url);
        const originMatchPattern = `${protocolGlob}${parsedUrl.hostname}/*`;
        const splitHost = parsedUrl.hostname.split(".");
        const domain = splitHost.slice(-2).join(".");
        const subDomainMatchPattern = `${protocolGlob}*.${domain}/*`;
        return [originMatchPattern, subDomainMatchPattern];
    }
    catch (_a) {
        return [];
    }
}
/**
 * Determines if the status code of the web response is invalid. An invalid status code is
 * any status code that is not in the 200-299 range.
 *
 * @param statusCode - The status code of the web response
 */
function isInvalidResponseStatusCode(statusCode) {
    return statusCode < 200 || statusCode >= 300;
}
/**
 * Determines if the current context is within a sandboxed iframe.
 */
function currentlyInSandboxedIframe() {
    var _a, _b;
    if (String(self.origin).toLowerCase() === "null" || globalThis.location.hostname === "") {
        return true;
    }
    const sandbox = (_b = (_a = globalThis.frameElement) === null || _a === void 0 ? void 0 : _a.getAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, "sandbox");
    // No frameElement or sandbox attribute means not sandboxed
    if (sandbox === null || sandbox === undefined) {
        return false;
    }
    // An empty string means fully sandboxed
    if (sandbox === "") {
        return true;
    }
    const tokens = new Set(sandbox.toLowerCase().split(" "));
    return !["allow-scripts", "allow-same-origin"].every((token) => tokens.has(token));
}
/**
 * This object allows us to map a special character to a key name. The key name is used
 * in gathering the i18n translation of the written version of the special character.
 */
const specialCharacterToKeyMap = {
    " ": "spaceCharacterDescriptor",
    "~": "tildeCharacterDescriptor",
    "`": "backtickCharacterDescriptor",
    "!": "exclamationCharacterDescriptor",
    "@": "atSignCharacterDescriptor",
    "#": "hashSignCharacterDescriptor",
    $: "dollarSignCharacterDescriptor",
    "%": "percentSignCharacterDescriptor",
    "^": "caretCharacterDescriptor",
    "&": "ampersandCharacterDescriptor",
    "*": "asteriskCharacterDescriptor",
    "(": "parenLeftCharacterDescriptor",
    ")": "parenRightCharacterDescriptor",
    "-": "hyphenCharacterDescriptor",
    _: "underscoreCharacterDescriptor",
    "+": "plusCharacterDescriptor",
    "=": "equalsCharacterDescriptor",
    "{": "braceLeftCharacterDescriptor",
    "}": "braceRightCharacterDescriptor",
    "[": "bracketLeftCharacterDescriptor",
    "]": "bracketRightCharacterDescriptor",
    "|": "pipeCharacterDescriptor",
    "\\": "backSlashCharacterDescriptor",
    ":": "colonCharacterDescriptor",
    ";": "semicolonCharacterDescriptor",
    '"': "doubleQuoteCharacterDescriptor",
    "'": "singleQuoteCharacterDescriptor",
    "<": "lessThanCharacterDescriptor",
    ">": "greaterThanCharacterDescriptor",
    ",": "commaCharacterDescriptor",
    ".": "periodCharacterDescriptor",
    "?": "questionCharacterDescriptor",
    "/": "forwardSlashCharacterDescriptor",
};
/**
 * Determines if the current rect values are not all 0.
 */
function rectHasSize(rect) {
    if (rect.right > 0 && rect.left > 0 && rect.top > 0 && rect.bottom > 0) {
        return true;
    }
    return false;
}
/**
 * Checks if all the values corresponding to the specified keys in an object are null.
 * If no keys are specified, checks all keys in the object.
 *
 * @param obj - The object to check.
 * @param keys - An optional array of keys to check in the object. Defaults to all keys.
 * @returns Returns true if all values for the specified keys (or all keys if none are provided) are null; otherwise, false.
 */
function areKeyValuesNull(obj, keys) {
    const keysToCheck = keys && keys.length > 0 ? keys : Object.keys(obj);
    return keysToCheck.every((key) => obj[key] == null);
}
/**
 * Validates the shape of `subFrameData` and rejects any payload that carries a
 * `url`. This is the *receive*-side counterpart to the *send*-side
 * `SubFrameOffsetWindowMessageData` type: that type stops our own code from
 * constructing a leaky payload at compile time, but any frame can post arbitrary
 * data, so inbound messages must be validated at runtime before they are trusted.
 *
 * @param value - The untrusted `data` property of the window message event.
 */
function isSubFramePositioningMessageData(value) {
    if (typeof value !== "object" || value === null || !("subFrameData" in value)) {
        return false;
    }
    const { subFrameData } = value;
    if (typeof subFrameData !== "object" || subFrameData === null || "url" in subFrameData) {
        return false;
    }
    // Number.isFinite (not `typeof === "number"`) so NaN/Infinity are rejected: a
    // non-finite subFrameDepth would defeat the MAX_SUB_FRAME_DEPTH relay guard.
    const candidate = subFrameData;
    return (Number.isFinite(candidate.top) &&
        Number.isFinite(candidate.left) &&
        Number.isFinite(candidate.subFrameDepth) &&
        (candidate.frameId === undefined || Number.isFinite(candidate.frameId)) &&
        (candidate.parentFrameIds === undefined ||
            (Array.isArray(candidate.parentFrameIds) &&
                candidate.parentFrameIds.every((id) => Number.isFinite(id)))));
}

;// ./src/autofill/services/dom-query.service.ts
var dom_query_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class DomQueryService {
    constructor() {
        // Stale entries (roots whose hosts left the DOM) are harmless — querying them
        // returns an empty NodeList. Cleared on `resetObservedShadowRoots` (navigation).
        this.knownShadowRoots = new Set();
        this.isOwnedShadowHost = () => false;
        this.ignoredTreeWalkerNodes = new Set([
            "svg",
            "script",
            "noscript",
            "head",
            "style",
            "link",
            "meta",
            "title",
            "base",
            "img",
            "picture",
            "video",
            "audio",
            "object",
            "source",
            "track",
            "param",
            "map",
            "area",
        ]);
        /**
         * Queries the page for shadow DOM elements and updates the cached state.
         * Use this when you need to refresh the shadow DOM detection state.
         *
         * @returns True if the page contains any shadow DOM elements
         */
        this.updatePageContainsShadowDom = () => {
            this.pageContainsShadowDom = this.queryShadowRoots(globalThis.document.body, true).length > 0;
            return this.pageContainsShadowDom;
        };
        /**
         * Checks if any of the provided mutations occurred within shadow roots.
         * This is a lightweight check that doesn't query the DOM.
         * @param mutations - The mutation records to check
         * @returns True if any mutation occurred within a shadow root
         */
        this.checkMutationsInShadowRoots = (mutations) => {
            // Latch is a one-way ratchet (see `markShadowDomPresent`); false here means no
            // shadow root has been observed yet, so no mutation target can be inside one.
            if (!this.pageContainsShadowDom) {
                return false;
            }
            return mutations.some((mutation) => {
                const root = mutation.target.getRootNode();
                // Ignore our own injected shadow hosts — observing them churns on the menu's own styling.
                return root instanceof ShadowRoot && !this.isOwnedShadowHost(root.host);
            });
        };
        /** Identity predicate for the extension's own injected shadow hosts, excluded from scanning/observation. */
        this.setOwnedShadowHostPredicate = (predicate) => {
            this.isOwnedShadowHost = predicate;
        };
        /** @returns true if an unobserved root is reachable; flips the latch on first post-init() find. */
        this.checkForNewShadowRoots = (addedElements) => {
            const verdict = this.classifyShadowRootScan(addedElements);
            if (verdict.foundNewRoot && !this.pageContainsShadowDom) {
                this.markShadowDomPresent();
            }
            return verdict.foundNewRoot;
        };
        this.classifyShadowRootScan = (addedElements) => {
            const hasAddedElements = !!addedElements && addedElements.length > 0;
            // Batch present: scan even with latch false (shadow DOM may attach post-init).
            if (!this.pageContainsShadowDom && !hasAddedElements) {
                return { branch: "shortCircuit", foundNewRoot: false };
            }
            return hasAddedElements
                ? this.findNewShadowRootInBatch(addedElements)
                : this.findNewShadowRootInDocument();
        };
        this.findNewShadowRootInBatch = (elements) => {
            // Drop descendants of other batch elements — same subtree, re-walked.
            const roots = this.suppressDescendantsInBatch(elements);
            for (const el of roots) {
                if (this.scanForNewShadowRootInSubtree(el, 0)) {
                    return { branch: "narrow", foundNewRoot: true };
                }
            }
            return { branch: "narrow", foundNewRoot: false };
        };
        /** O(N²) over the batch — N is bounded upstream by `pendingMutationAddedElementsCap`. */
        this.suppressDescendantsInBatch = (elements) => {
            if (elements.length < 2) {
                return elements;
            }
            const roots = [];
            for (const candidate of elements) {
                let coveredByAnotherElement = false;
                for (const other of elements) {
                    if (other !== candidate && other.contains(candidate)) {
                        coveredByAnotherElement = true;
                        break;
                    }
                }
                if (!coveredByAnotherElement) {
                    roots.push(candidate);
                }
            }
            return roots;
        };
        this.findNewShadowRootInDocument = () => {
            let roots;
            try {
                roots = this.recursivelyQueryShadowRoots(globalThis.document.body);
            }
            catch (_a) {
                roots = this.queryShadowRoots(globalThis.document.body);
            }
            return {
                branch: "fullScan",
                foundNewRoot: roots.some((r) => !this.knownShadowRoots.has(r)),
            };
        };
        this.markShadowDomPresent = () => {
            this.pageContainsShadowDom = true;
        };
        /**
         * Resets the observed shadow roots tracking. This should be called when the mutation
         * observer is recreated or on significant lifecycle events (like navigation).
         */
        this.resetObservedShadowRoots = () => {
            this.knownShadowRoots.clear();
        };
        // `ShadowRoot.host` is non-nullable per spec; persists after host removal from document.
        this.purgeDetachedShadowRoots = () => {
            for (const root of this.knownShadowRoots) {
                if (!root.host.isConnected) {
                    this.knownShadowRoots.delete(root);
                }
            }
        };
        // No cycle guard — `attachShadow` throws on re-attach, `ShadowRoot.host` is
        // read-only. See https://dom.spec.whatwg.org/#dom-element-attachshadow.
        this.scanForNewShadowRootInSubtree = (subtree, depth) => {
            if (depth >= MAX_DEEP_QUERY_RECURSION_DEPTH) {
                return false;
            }
            // Host check — `querySelectorAll("*")` excludes the scope element.
            if (nodeIsElement(subtree)) {
                const root = this.getShadowRoot(subtree);
                if (root) {
                    if (!this.knownShadowRoots.has(root)) {
                        return true;
                    }
                    if (this.scanForNewShadowRootInSubtree(root, depth + 1)) {
                        return true;
                    }
                }
            }
            // querySelectorAll doesn't pierce shadow boundaries — recurse per boundary.
            for (const child of subtree.querySelectorAll("*")) {
                const childRoot = this.getShadowRoot(child);
                if (childRoot) {
                    if (!this.knownShadowRoots.has(childRoot)) {
                        return true;
                    }
                    if (this.scanForNewShadowRootInSubtree(childRoot, depth + 1)) {
                        return true;
                    }
                }
            }
            return false;
        };
        this.getShadowRoot = stopwatch("getShadowRoot", this.getShadowRoot);
        void this.init();
    }
    /**
     * Sets up a query that will trigger a deepQuery of the DOM, querying all elements that match the given query string.
     * If the deepQuery fails or reaches a max recursion depth, it will fall back to a treeWalker query.
     *
     * @param root - The root element to start the query from
     * @param queryString - The query string to match elements against
     * @param treeWalkerFilter - The filter callback to use for the treeWalker query
     * @param mutationObserver - The MutationObserver to use for observing shadow roots
     * @param forceDeepQueryAttempt - Whether to force a deep query attempt
     * @param ignoredTreeWalkerNodesOverride - An optional set of node names to ignore when using the treeWalker strategy
     */
    query(root, queryString, treeWalkerFilter, mutationObserver, forceDeepQueryAttempt, ignoredTreeWalkerNodesOverride) {
        const ignoredTreeWalkerNodes = ignoredTreeWalkerNodesOverride || this.ignoredTreeWalkerNodes;
        if (!forceDeepQueryAttempt) {
            return this.queryAllTreeWalkerNodes(root, treeWalkerFilter, ignoredTreeWalkerNodes, mutationObserver);
        }
        try {
            return this.deepQueryElements(root, queryString, mutationObserver);
        }
        catch (_a) {
            return this.queryAllTreeWalkerNodes(root, treeWalkerFilter, ignoredTreeWalkerNodes, mutationObserver);
        }
    }
    /**
     * Queries the DOM for elements based on the given selector string.
     * Supports the special `>>>` combinator to traverse iframe and shadow DOM
     * boundaries; each segment separated by `>>>` is queried within the context
     * produced by the previous segment. Boundary type is determined exclusively
     * by the resolved element type — iframe elements always use iframe traversal,
     * all other elements always use shadow DOM traversal, with no fallback between
     * the two. This enforces the contract expressed in the targeting rule.
     *
     * @param selector selector string, supports boundary-piercing with `>>>`
     * @returns The first matching element, or null if no match is found
     */
    queryDeepSelector(selector) {
        if (!selector) {
            return null;
        }
        const segments = selector.split(DEEP_QUERY_SELECTOR_COMBINATOR);
        let context = globalThis.document;
        for (let i = 0; i < segments.length; i++) {
            const segment = (segments[i] || "").trim();
            if (segment.length < 1) {
                return null;
            }
            const element = context.querySelector(segment);
            if (!element) {
                return null;
            }
            if (i < segments.length - 1) {
                // FIXME: When a targeting rule specifies `iframe#foo`, we should fail
                // authoritatively if `#foo` does not resolve to an iframe (rather than
                // falling back to shadow traversal). The current test-and-fallback can
                // mask stale or inaccurate selectors.
                const next = element instanceof HTMLIFrameElement
                    ? element.contentDocument
                    : this.traverseShadowRootBoundary(element);
                if (!next) {
                    return null;
                }
                context = next;
            }
            else {
                return element;
            }
        }
        return null;
    }
    /**
     * Walks a selector and returns the first iframe boundary encountered along
     * with the remaining selector to apply inside that iframe.  Shadow DOM
     * boundaries before the iframe are traversed normally. Returns null if no
     * iframe boundary exists in the selector (pure shadow DOM or direct element).
     *
     * @param selector - Selector string using `>>>` as the boundary combinator
     */
    findIframeCrossing(selector) {
        const segments = selector.split(DEEP_QUERY_SELECTOR_COMBINATOR);
        if (segments.length < 2) {
            return null;
        }
        let context = globalThis.document;
        for (let i = 0; i < segments.length - 1; i++) {
            const segment = (segments[i] || "").trim();
            if (!segment) {
                return null;
            }
            const element = context.querySelector(segment);
            if (!element) {
                return null;
            }
            if (element instanceof HTMLIFrameElement) {
                return {
                    iframeElement: element,
                    innerSelector: segments.slice(i + 1).join(DEEP_QUERY_SELECTOR_COMBINATOR),
                };
            }
            const shadow = this.getShadowRoot(element);
            if (!shadow) {
                return null;
            }
            context = shadow;
        }
        return null;
    }
    /**
     * Returns the shadow root of an element, or null if no shadow root exists.
     * Explicitly refuses to traverse iframe elements — callers must read
     * `contentDocument` directly for those.
     */
    traverseShadowRootBoundary(element) {
        if (element instanceof HTMLIFrameElement) {
            return null;
        }
        return this.getShadowRoot(element);
    }
    /**
     * Initializes the DomQueryService, checking for the presence of shadow DOM elements on the page.
     */
    init() {
        return dom_query_service_awaiter(this, void 0, void 0, function* () {
            if (globalThis.document.readyState === "complete") {
                this.updatePageContainsShadowDom();
                return;
            }
            globalThis.addEventListener(EVENTS.LOAD, this.updatePageContainsShadowDom);
        });
    }
    /**
     * Queries all elements in the DOM that match the given query string.
     * Also, recursively queries all shadow roots for the element.
     *
     * @param root - The root element to start the query from
     * @param queryString - The query string to match elements against
     * @param mutationObserver - The MutationObserver to use for observing shadow roots
     */
    deepQueryElements(root, queryString, mutationObserver) {
        let elements = this.queryElements(root, queryString);
        if (!this.pageContainsShadowDom) {
            return elements;
        }
        // Re-use the already-discovered shadow roots when possible to avoid the
        // expensive querySelectorAll("*") + tag-name scan on every call.
        // FIXME: shadow roots added to the main document after initialization are not
        // included in this set until `resetObservedShadowRoots()` is called. (i.e.
        // when the mutation observer is rebuilt)
        const shadowRoots = this.knownShadowRoots.size > 0
            ? Array.from(this.knownShadowRoots)
            : this.recursivelyQueryShadowRoots(root);
        for (let index = 0; index < shadowRoots.length; index++) {
            const shadowRoot = shadowRoots[index];
            elements = elements.concat(this.queryElements(shadowRoot, queryString));
            if (mutationObserver) {
                mutationObserver.observe(shadowRoot, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                });
            }
            this.knownShadowRoots.add(shadowRoot);
        }
        return elements;
    }
    /**
     * Queries the DOM for elements based on the given query string.
     *
     * @param root - The root element to start the query from
     * @param queryString - The query string to match elements against
     */
    queryElements(root, queryString) {
        // Avoid a redundant pre-check querySelector — querySelectorAll already
        // returns an empty NodeList when nothing matches, at no extra cost.
        return Array.from(root.querySelectorAll(queryString));
    }
    /**
     * Recursively queries all shadow roots found within the given root element.
     * Will also set up a mutation observer on the shadow root if the
     * `isObservingShadowRoot` parameter is set to true.
     *
     * @param root - The root element to start the query from
     * @param depth - The depth of the recursion
     */
    recursivelyQueryShadowRoots(root, depth = 0) {
        if (depth >= MAX_DEEP_QUERY_RECURSION_DEPTH) {
            throw new Error("Max recursion depth reached");
        }
        let shadowRoots = this.queryShadowRoots(root);
        for (let index = 0; index < shadowRoots.length; index++) {
            const shadowRoot = shadowRoots[index];
            shadowRoots = shadowRoots.concat(this.recursivelyQueryShadowRoots(shadowRoot, depth + 1));
        }
        return shadowRoots;
    }
    /**
     * Queries any immediate shadow roots found within the given root element.
     *
     * @param root - The root element to start the query from
     * @param returnSingleShadowRoot - Whether to return a single shadow root or an array of shadow roots
     */
    queryShadowRoots(root, returnSingleShadowRoot = false) {
        if (!root) {
            return [];
        }
        const shadowRoots = [];
        for (const potentialShadowRoot of root.querySelectorAll("*")) {
            const shadowRoot = this.getShadowRoot(potentialShadowRoot);
            if (shadowRoot) {
                shadowRoots.push(shadowRoot);
            }
            if (returnSingleShadowRoot && shadowRoots.length) {
                break;
            }
        }
        return shadowRoots;
    }
    /**
     * Attempts to get the ShadowRoot of the passed node. If support for the
     * extension based openOrClosedShadowRoot API is available, it will be used.
     * Will return null if the node is not an HTMLElement or if the node has
     * child nodes.
     *
     * @param {Node} node
     */
    getShadowRoot(node) {
        var _a;
        if (!nodeIsElement(node)) {
            return null;
        }
        if (this.isOwnedShadowHost(node)) {
            return null;
        }
        // Fast path first: element.shadowRoot is cheap and works on any element with
        // an open root.
        if (node.shadowRoot) {
            return node.shadowRoot;
        }
        // skip nodes that cannot contain shadow roots
        const isCandidate = SHADOW_ROOT_CANDIDATE_NODE_NAMES.has(node.nodeName) || node.nodeName.includes("-");
        if (!isCandidate) {
            return null;
        }
        // Fall back to chrome.dom.openOrClosedShadowRoot for closed
        // roots — the expensive cross-boundary call — on any host element, since
        // closed roots can be (and are) attached to plain HTML hosts in the wild.
        if ((_a = chrome.dom) === null || _a === void 0 ? void 0 : _a.openOrClosedShadowRoot) {
            try {
                return chrome.dom.openOrClosedShadowRoot(node);
            }
            catch (_b) {
                return null;
            }
        }
        // Firefox-specific equivalent of `openOrClosedShadowRoot`
        return node.openOrClosedShadowRoot;
    }
    /**
     * Queries the DOM for all the nodes that match the given filter callback
     * and returns a collection of nodes.
     * @param rootNode
     * @param filterCallback
     * @param ignoredTreeWalkerNodes
     * @param mutationObserver
     */
    queryAllTreeWalkerNodes(rootNode, filterCallback, ignoredTreeWalkerNodes, mutationObserver) {
        const treeWalkerQueryResults = [];
        this.buildTreeWalkerNodesQueryResults(rootNode, treeWalkerQueryResults, filterCallback, ignoredTreeWalkerNodes, mutationObserver);
        return treeWalkerQueryResults;
    }
    /**
     * Recursively builds a collection of nodes that match the given filter callback.
     * If a node has a ShadowRoot, it will be observed for mutations.
     *
     * @param rootNode
     * @param treeWalkerQueryResults
     * @param filterCallback
     * @param ignoredTreeWalkerNodes
     * @param mutationObserver
     */
    buildTreeWalkerNodesQueryResults(rootNode, treeWalkerQueryResults, filterCallback, ignoredTreeWalkerNodes, mutationObserver) {
        const treeWalker = document === null || document === void 0 ? void 0 : document.createTreeWalker(rootNode, NodeFilter.SHOW_ELEMENT, (node) => {
            var _a;
            return ignoredTreeWalkerNodes.has((_a = node.nodeName) === null || _a === void 0 ? void 0 : _a.toLowerCase())
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT;
        });
        do {
            const currentNode = treeWalker.currentNode;
            // `currentNode` can be one of two things: the root node (which is a `Node`),
            // or an `Element` (due to the `NodeFilter.SHOW_ELEMENT`). Therefore,
            // `currentNode` is an `Element` if it is not the root node, or if it
            // is an element.
            let currentElement;
            if (currentNode != treeWalker.root || nodeIsElement(currentNode)) {
                currentElement = currentNode;
            }
            else {
                continue;
            }
            if (filterCallback(currentElement)) {
                treeWalkerQueryResults.push(currentNode);
            }
            // Only probe for a shadow root when the page is known to have shadow DOM.
            // Fast path: element.shadowRoot for open roots, free on any element type.
            // Fall back to the extension API (chrome.dom.openOrClosedShadowRoot) for
            // closed roots on any host element.
            if (this.pageContainsShadowDom) {
                let nodeShadowRoot = currentElement.shadowRoot;
                if (!nodeShadowRoot) {
                    nodeShadowRoot = this.getShadowRoot(currentNode);
                }
                if (nodeShadowRoot) {
                    if (mutationObserver) {
                        mutationObserver.observe(nodeShadowRoot, {
                            attributes: true,
                            childList: true,
                            subtree: true,
                        });
                    }
                    this.knownShadowRoots.add(nodeShadowRoot);
                    this.buildTreeWalkerNodesQueryResults(nodeShadowRoot, treeWalkerQueryResults, filterCallback, ignoredTreeWalkerNodes, mutationObserver);
                }
            }
        } while (treeWalker.nextNode());
    }
}

;// ./src/autofill/models/autofill-field.ts
/**
 * Represents a single field that is collected from the page source and is potentially autofilled.
 */
class AutofillField {
}

;// ../../libs/common/src/vault/enums/bank-account-type.ts
const _BankAccountType = Object.freeze({
    Checking: "checking",
    Savings: "savings",
    CertificateOfDeposit: "certificateOfDeposit",
    LineOfCredit: "lineOfCredit",
    InvestmentBrokerage: "investmentBrokerage",
    MoneyMarket: "moneyMarket",
    Other: "other",
});
const BankAccountType = (/* unused pure expression or super */ null && (_BankAccountType));
const BankAccountTypeI18nKeys = {
    checking: "bankAccountTypeChecking",
    savings: "bankAccountTypeSavings",
    certificateOfDeposit: "bankAccountTypeCertificateOfDeposit",
    lineOfCredit: "bankAccountTypeLineOfCredit",
    investmentBrokerage: "bankAccountTypeInvestmentBrokerage",
    moneyMarket: "bankAccountTypeMoneyMarket",
    other: "bankAccountTypeOther",
};

;// ../../libs/common/src/vault/enums/cipher-reprompt-type.ts
const CipherRepromptType = {
    None: 0,
    Password: 1,
};
/**
 * Normalizes a CipherRepromptType value to ensure compatibility with the SDK.
 * @param value - The cipher reprompt type from user data
 * @returns Valid CipherRepromptType, defaults to CipherRepromptType.None if unrecognized
 */
function normalizeCipherRepromptTypeForSdk(value) {
    switch (value) {
        case CipherRepromptType.None:
        case CipherRepromptType.Password:
            return value;
        default:
            return CipherRepromptType.None;
    }
}

;// ../../libs/common/src/vault/enums/cipher-type.ts
const _CipherType = Object.freeze({
    Login: 1,
    SecureNote: 2,
    Card: 3,
    Identity: 4,
    SshKey: 5,
    BankAccount: 6,
    DriversLicense: 7,
    Passport: 8,
});
// FIXME: Update typing of `CipherType` to be `Record<keyof _CipherType, CipherType>` which is ADR-0025 compliant when the TypeScript version is at least 5.8.
const CipherType = _CipherType;
/**
 * Reverse mapping of Cipher Types to their associated names.
 * Prefer using {@link toCipherTypeName} rather than accessing this object directly.
 *
 * When represented as an enum in TypeScript, this mapping was provided
 * by default. Now using a constant object it needs to be defined manually.
 */
const cipherTypeNames = Object.freeze(Object.fromEntries(Object.entries(CipherType).map(([key, value]) => [value, key])));
/**
 * Returns the associated name for the cipher type, will throw when the name is not found.
 */
function toCipherTypeName(type) {
    const name = cipherTypeNames[type];
    return name;
}
/**
 * @returns `true` if the value is a valid `CipherType`, `false` otherwise.
 */
const isCipherType = (value) => {
    return Object.values(CipherType).includes(value);
};
/**
 * Converts a value to a `CipherType` if it is valid, otherwise returns `null`.
 */
const toCipherType = (value) => {
    if (isCipherType(value)) {
        return value;
    }
    if (typeof value === "string") {
        const valueAsInt = parseInt(value, 10);
        if (isCipherType(valueAsInt)) {
            return valueAsInt;
        }
    }
    return undefined;
};

;// ../../libs/common/src/vault/enums/field-type.enum.ts
const _FieldType = Object.freeze({
    Text: 0,
    Hidden: 1,
    Boolean: 2,
    Linked: 3,
});
const FieldType = (/* unused pure expression or super */ null && (_FieldType));
/**
 * Normalizes a FieldType value to ensure compatibility with the SDK.
 * @param value - The field type from user data
 * @returns Valid FieldType, defaults to FieldType.Text if unrecognized
 */
function normalizeFieldTypeForSdk(value) {
    switch (value) {
        case FieldType.Text:
        case FieldType.Hidden:
        case FieldType.Boolean:
        case FieldType.Linked:
            return value;
        default:
            return FieldType.Text;
    }
}

;// ../../libs/common/src/vault/enums/linked-id-type.enum.ts
// LoginView
const LoginLinkedId = {
    Username: 100,
    Password: 101,
};
// CardView
const CardLinkedId = {
    CardholderName: 300,
    ExpMonth: 301,
    ExpYear: 302,
    Code: 303,
    Brand: 304,
    Number: 305,
};
// IdentityView
const IdentityLinkedId = {
    Title: 400,
    MiddleName: 401,
    Address1: 402,
    Address2: 403,
    Address3: 404,
    City: 405,
    State: 406,
    PostalCode: 407,
    Country: 408,
    Company: 409,
    Email: 410,
    Phone: 411,
    Ssn: 412,
    Username: 413,
    PassportNumber: 414,
    LicenseNumber: 415,
    FirstName: 416,
    LastName: 417,
    FullName: 418,
};
/**
 * Normalizes a LinkedIdType value to ensure compatibility with the SDK.
 * @param value - The linked ID type from user data
 * @returns Valid LinkedIdType or undefined if unrecognized
 */
function normalizeLinkedIdTypeForSdk(value) {
    if (value == null) {
        return undefined;
    }
    // Check all valid LinkedId numeric values (100-418)
    const allValidValues = [
        ...Object.values(LoginLinkedId),
        ...Object.values(CardLinkedId),
        ...Object.values(IdentityLinkedId),
    ];
    return allValidValues.includes(value) ? value : undefined;
}

;// ../../libs/common/src/vault/enums/secure-note-type.enum.ts
const SecureNoteType = {
    Generic: 0,
};
/**
 * Normalizes a SecureNoteType value to ensure compatibility with the SDK.
 * @param value - The secure note type from user data
 * @returns Valid SecureNoteType, defaults to SecureNoteType.Generic if unrecognized
 */
function normalizeSecureNoteTypeForSdk(value) {
    return SecureNoteType.Generic;
}

;// ../../libs/common/src/vault/enums/extension-page-urls.enum.ts
/**
 * Available pages within the extension by their URL.
 * Useful when opening a specific page within the popup.
 */
const ExtensionPageUrls = {
    Index: "popup/index.html#/",
    AtRiskPasswords: "popup/index.html#/at-risk-passwords",
};

;// ../../libs/common/src/vault/enums/index.ts








;// ./src/autofill/services/autofill-constants.ts


/**
 * Authoritative cipher-type mapping for targeting-rule form categories whose
 * fields all belong to a single cipher type.
 */
const targetedFormCategoryFillTypes = {
    [FormPurposeCategories.AccountLogin]: CipherType.Login,
    [FormPurposeCategories.PaymentCard]: CipherType.Card,
    [FormPurposeCategories.Identity]: CipherType.Identity,
    [FormPurposeCategories.Address]: CipherType.Identity,
};
const loginQualifiers = [
    AutofillTargetingRuleTypes.username,
    AutofillTargetingRuleTypes.password,
    AutofillTargetingRuleTypes.newPassword,
];
const cardQualifiers = [
    AutofillTargetingRuleTypes.cardholderName,
    AutofillTargetingRuleTypes.cardNumber,
    AutofillTargetingRuleTypes.cardExpirationMonth,
    AutofillTargetingRuleTypes.cardExpirationYear,
    AutofillTargetingRuleTypes.cardExpirationDate,
    AutofillTargetingRuleTypes.cardCvv,
    AutofillTargetingRuleTypes.cardType,
];
const identityQualifiers = [
    AutofillTargetingRuleTypes.fullName,
    AutofillTargetingRuleTypes.honorificPrefix,
    AutofillTargetingRuleTypes.firstName,
    AutofillTargetingRuleTypes.middleName,
    AutofillTargetingRuleTypes.lastName,
    AutofillTargetingRuleTypes.honorificSuffix,
    AutofillTargetingRuleTypes.email,
    AutofillTargetingRuleTypes.phone,
    AutofillTargetingRuleTypes.phoneCountryCode,
    AutofillTargetingRuleTypes.phoneAreaCode,
    AutofillTargetingRuleTypes.phoneLocal,
    AutofillTargetingRuleTypes.phoneExtension,
    AutofillTargetingRuleTypes.organization,
    AutofillTargetingRuleTypes.streetAddress,
    AutofillTargetingRuleTypes.addressLine1,
    AutofillTargetingRuleTypes.addressLine2,
    AutofillTargetingRuleTypes.addressLine3,
    AutofillTargetingRuleTypes.addressLevel1,
    AutofillTargetingRuleTypes.addressLevel2,
    AutofillTargetingRuleTypes.addressLevel3,
    AutofillTargetingRuleTypes.addressLevel4,
    AutofillTargetingRuleTypes.postalCode,
    AutofillTargetingRuleTypes.country,
    AutofillTargetingRuleTypes.birthdate,
    AutofillTargetingRuleTypes.birthdateDay,
    AutofillTargetingRuleTypes.birthdateMonth,
    AutofillTargetingRuleTypes.birthdateYear,
];
class AutoFillConstants {
}
AutoFillConstants.EmailFieldNames = [
    // English
    "email",
    "email address",
    "e-mail",
    "e-mail address",
    // German
    "email adresse",
    "e-mail adresse",
];
AutoFillConstants.UsernameFieldNames = [
    // English
    "username",
    "user name",
    "userid",
    "user id",
    "customer id",
    "login id",
    "login",
    // German
    "benutzername",
    "benutzer name",
    "benutzerid",
    "benutzer id",
    ...AutoFillConstants.EmailFieldNames,
];
AutoFillConstants.TotpFieldNames = [
    "2facode",
    "approvals_code",
    "mfacode",
    "onetimecode",
    "onetimepassword",
    "otc-code",
    "otp-code",
    "otpcode",
    "second-factor",
    "security_code",
    "security code",
    "totp",
    "totpcode",
    "twofa",
    "twofactor",
    "twofactorcode",
    "verificationcode",
    "verification code",
    "otc-confirmation",
];
AutoFillConstants.RecoveryCodeFieldNames = ["backup", "recovery"];
AutoFillConstants.AmbiguousTotpFieldNames = ["code", "pin", "otc", "otp", "2fa", "mfa"];
AutoFillConstants.SearchFieldNames = ["search", "query", "find", "go"];
AutoFillConstants.NewEmailFieldKeywords = [
    "new-email",
    "newemail",
    "new email",
    "neue e-mail",
];
AutoFillConstants.RegistrationKeywords = [
    "register",
    "signup",
    "sign-up",
    "join",
    "create",
];
/**
 * Field-level keywords indicating account creation or registration context.
 * Broader than {@link RegistrationKeywords}, which is used at the form level.
 */
AutoFillConstants.AccountCreationFieldKeywords = [
    "register",
    "registration",
    "create password",
    "create a password",
    "create an account",
    "create account password",
    "create user password",
    "confirm password",
    "confirm account password",
    "confirm user password",
    "new user",
    "new email",
    "new e-mail",
    "new password",
    "new-password",
    "neuer benutzer",
    "neues passwort",
    "neue e-mail",
    "pwdcheck",
];
/**
 * Field-level keywords indicating a password update or change context, as distinguished
 * from a new account creation or initial login context.
 */
AutoFillConstants.UpdatePasswordFieldKeywords = [
    "update password",
    "change password",
    "current password",
    "kennwort ändern",
];
/**
 * Non-login keywords with high enough confidence to disqualify a form for login on their own.
 * Included by default in {@link ComprehensiveNonLoginKeywords}.
 */
AutoFillConstants.StrongNonLoginKeywords = ["newsletter"];
/** Full lexicon of non-login keywords. */
AutoFillConstants.ComprehensiveNonLoginKeywords = [
    ...AutoFillConstants.StrongNonLoginKeywords,
    "mailing list",
    "subscribe",
    "subscription",
    "unsubscribe",
];
/** Login-positive heading text used to short-circuit ambiguous-case disqualification. */
AutoFillConstants.StrongLoginHeadingKeywords = [
    "sign in",
    "signin",
    "log in",
    "login",
    "log on",
    "logon",
];
AutoFillConstants.FieldIgnoreList = ["captcha", "findanything", "forgot"];
AutoFillConstants.PasswordFieldExcludeList = [
    "hint",
    ...AutoFillConstants.FieldIgnoreList,
    ...AutoFillConstants.TotpFieldNames,
];
AutoFillConstants.ExcludedAutofillLoginTypes = [
    "hidden",
    "file",
    "button",
    "image",
    "reset",
    "search",
];
AutoFillConstants.ExcludedAutofillTypes = [
    "radio",
    "checkbox",
    ...AutoFillConstants.ExcludedAutofillLoginTypes,
];
AutoFillConstants.ExcludedInlineMenuTypes = [
    "textarea",
    ...AutoFillConstants.ExcludedAutofillTypes,
];
/** HTML elements for form fields */
AutoFillConstants.FieldElements = ["input", "select", "textarea"];
AutoFillConstants.AutocompleteCurrentPassword = "current-password";
AutoFillConstants.AutocompleteNewPassword = "new-password";
AutoFillConstants.ExcludedIdentityAutocompleteTypes = new Set([
    AutoFillConstants.AutocompleteCurrentPassword,
    AutoFillConstants.AutocompleteNewPassword,
]);
class CreditCardAutoFillConstants {
}
CreditCardAutoFillConstants.CardAttributes = [
    "autoCompleteType",
    "data-stripe",
    "htmlName",
    "htmlID",
    "title",
    "label-tag",
    "placeholder",
    "label-left",
    "label-top",
    "data-recurly",
];
CreditCardAutoFillConstants.CardAttributesExtended = [
    ...CreditCardAutoFillConstants.CardAttributes,
    "label-right",
];
CreditCardAutoFillConstants.CardHolderFieldNames = [
    "accountholdername",
    "cc-name",
    "card-name",
    "cardholder-name",
    "cardholder",
    "name",
    "nom",
];
CreditCardAutoFillConstants.CardHolderFieldNameValues = [
    "accountholdername",
    "cc-name",
    "card-name",
    "cardholder-name",
    "cardholder",
    "tbName",
];
CreditCardAutoFillConstants.CardNumberFieldNames = [
    "cc-number",
    "cc-num",
    "card-number",
    "card-num",
    "number",
    "cc",
    "cc-no",
    "card-no",
    "credit-card",
    "numero-carte",
    "carte",
    "carte-credit",
    "num-carte",
    "cb-num",
    "card-pan",
];
CreditCardAutoFillConstants.CardNumberFieldNameValues = [
    "cc-number",
    "cc-num",
    "card-number",
    "card-num",
    "cc-no",
    "card-no",
    "numero-carte",
    "num-carte",
    "cb-num",
];
CreditCardAutoFillConstants.CardExpiryFieldNames = [
    "cc-exp",
    "card-exp",
    "cc-expiration",
    "card-expiration",
    "cc-ex",
    "card-ex",
    "card-expire",
    "card-expiry",
    "validite",
    "expiration",
    "expiry",
    "mm-yy",
    "mm-yyyy",
    "yy-mm",
    "yyyy-mm",
    "expiration-date",
    "payment-card-expiration",
    "payment-cc-date",
];
CreditCardAutoFillConstants.CardExpiryFieldNameValues = [
    "mm-yy",
    "mm-yyyy",
    "yy-mm",
    "yyyy-mm",
    "expiration-date",
    "payment-card-expiration",
];
CreditCardAutoFillConstants.ExpiryMonthFieldNames = [
    "exp-month",
    "cc-exp-month",
    "cc-month",
    "card-month",
    "cc-mo",
    "card-mo",
    "exp-mo",
    "card-exp-mo",
    "cc-exp-mo",
    "card-expiration-month",
    "expiration-month",
    "cc-mm",
    "cc-m",
    "card-mm",
    "card-m",
    "card-exp-mm",
    "cc-exp-mm",
    "exp-mm",
    "exp-m",
    "expire-month",
    "expire-mo",
    "expiry-month",
    "expiry-mo",
    "card-expire-month",
    "card-expire-mo",
    "card-expiry-month",
    "card-expiry-mo",
    "mois-validite",
    "mois-expiration",
    "m-validite",
    "m-expiration",
    "expiry-date-field-month",
    "expiration-date-month",
    "expiration-date-mm",
    "exp-mon",
    "validity-mo",
    "exp-date-mo",
    "cb-date-mois",
    "date-m",
];
CreditCardAutoFillConstants.ExpiryYearFieldNames = [
    "exp-year",
    "cc-exp-year",
    "cc-year",
    "card-year",
    "cc-yr",
    "card-yr",
    "exp-yr",
    "card-exp-yr",
    "cc-exp-yr",
    "card-expiration-year",
    "expiration-year",
    "cc-yy",
    "cc-y",
    "card-yy",
    "card-y",
    "card-exp-yy",
    "cc-exp-yy",
    "exp-yy",
    "exp-y",
    "cc-yyyy",
    "card-yyyy",
    "card-exp-yyyy",
    "cc-exp-yyyy",
    "expire-year",
    "expire-yr",
    "expiry-year",
    "expiry-yr",
    "card-expire-year",
    "card-expire-yr",
    "card-expiry-year",
    "card-expiry-yr",
    "an-validite",
    "an-expiration",
    "annee-validite",
    "annee-expiration",
    "expiry-date-field-year",
    "expiration-date-year",
    "cb-date-ann",
    "expiration-date-yy",
    "expiration-date-yyyy",
    "validity-year",
    "exp-date-year",
    "date-y",
];
CreditCardAutoFillConstants.CVVFieldNames = [
    "cvv",
    "cvc",
    "cvv2",
    "cc-csc",
    "cc-cvv",
    "card-csc",
    "card-cvv",
    "cvd",
    "cid",
    "cvc2",
    "cnv",
    "cvn2",
    "cc-code",
    "card-code",
    "code-securite",
    "security-code",
    "crypto",
    "card-verif",
    "verification-code",
    "csc",
    "ccv",
];
CreditCardAutoFillConstants.CardBrandFieldNames = [
    "cc-type",
    "card-type",
    "card-brand",
    "cc-brand",
    "cb-type",
];
// Note, these are expressions of user-guidance for the expected expiry date format to be used
CreditCardAutoFillConstants.CardExpiryDateFormats = [
    // English
    {
        Month: "mm",
        MonthShort: "m",
        Year: "yyyy",
        YearShort: "yy",
    },
    // Danish
    {
        Month: "mm",
        MonthShort: "m",
        Year: "åååå",
        YearShort: "åå",
    },
    // German/Dutch
    {
        Month: "mm",
        MonthShort: "m",
        Year: "jjjj",
        YearShort: "jj",
    },
    // French/Spanish/Italian
    {
        Month: "mm",
        MonthShort: "m",
        Year: "aa",
        YearShort: "aa",
    },
    // Russian
    {
        Month: "мм",
        MonthShort: "м",
        Year: "гггг",
        YearShort: "гг",
    },
    // Portuguese
    {
        Month: "mm",
        MonthShort: "m",
        Year: "rrrr",
        YearShort: "rr",
    },
];
// Each index represents a language. These three arrays should all be the same length.
// 0: English, 1: Danish, 2: German/Dutch, 3: French/Spanish/Italian, 4: Russian, 5: Portuguese
CreditCardAutoFillConstants.MonthAbbr = ["mm", "mm", "mm", "mm", "мм", "mm"];
CreditCardAutoFillConstants.YearAbbrShort = ["yy", "åå", "jj", "aa", "гг", "rr"];
CreditCardAutoFillConstants.YearAbbrLong = ["yyyy", "åååå", "jjjj", "aa", "гггг", "rrrr"];
class IdentityAutoFillConstants {
}
IdentityAutoFillConstants.IdentityAttributes = [
    "autoCompleteType",
    "data-stripe",
    "htmlName",
    "htmlID",
    "label-tag",
    "placeholder",
    "label-left",
    "label-top",
    "data-recurly",
    "accountCreationFieldType",
    "type",
];
IdentityAutoFillConstants.FullNameFieldNames = ["name", "full-name", "your-name"];
IdentityAutoFillConstants.FullNameFieldNameValues = ["full-name", "your-name"];
IdentityAutoFillConstants.TitleFieldNames = [
    "honorific-prefix",
    "prefix",
    "title",
    // German
    "anrede",
];
IdentityAutoFillConstants.FirstnameFieldNames = [
    // English
    "f-name",
    "first-name",
    "given-name",
    "first-n",
    // German
    "vorname",
];
IdentityAutoFillConstants.MiddlenameFieldNames = [
    "m-name",
    "middle-name",
    "additional-name",
    "middle-initial",
    "middle-n",
    "middle-i",
];
IdentityAutoFillConstants.LastnameFieldNames = [
    // English
    "l-name",
    "last-name",
    "s-name",
    "surname",
    "family-name",
    "family-n",
    "last-n",
    // German
    "nachname",
    "familienname",
];
IdentityAutoFillConstants.EmailFieldNames = ["e-mail", "email-address"];
IdentityAutoFillConstants.AddressFieldNames = [
    "address",
    "street-address",
    "addr",
    "street",
    "mailing-addr",
    "billing-addr",
    "mail-addr",
    "bill-addr",
    // German
    "strasse",
    "adresse",
];
IdentityAutoFillConstants.AddressFieldNameValues = [
    "mailing-addr",
    "billing-addr",
    "mail-addr",
    "bill-addr",
];
IdentityAutoFillConstants.Address1FieldNames = [
    "address-1",
    "address-line-1",
    "addr-1",
    "street-1",
];
IdentityAutoFillConstants.Address2FieldNames = [
    "address-2",
    "address-line-2",
    "addr-2",
    "street-2",
    "address-ext",
];
IdentityAutoFillConstants.Address3FieldNames = [
    "address-3",
    "address-line-3",
    "addr-3",
    "street-3",
];
IdentityAutoFillConstants.PostalCodeFieldNames = [
    "postal",
    "zip",
    "zip2",
    "zip-code",
    "postal-code",
    "post-code",
    "postcode",
    "address-zip",
    "address-postal",
    "address-code",
    "address-postal-code",
    "address-zip-code",
    // German
    "plz",
    "postleitzahl",
];
IdentityAutoFillConstants.CityFieldNames = [
    "city",
    "town",
    "address-level-2",
    "address-city",
    "address-town",
    // German
    "ort",
    "stadt",
    "wohnort",
];
IdentityAutoFillConstants.StateFieldNames = [
    "state",
    "province",
    "provence",
    "address-level-1",
    "address-state",
    "address-province",
    // German
    "bundesland",
];
IdentityAutoFillConstants.CountryFieldNames = [
    "country",
    "country-code",
    "country-name",
    "address-country",
    "address-country-name",
    "address-country-code",
    // German
    "land",
];
IdentityAutoFillConstants.PhoneFieldNames = [
    "phone",
    "mobile",
    "mobile-phone",
    "tel",
    "telephone",
    "phone-number",
    // German
    "telefon",
    "telefonnummer",
    "mobil",
    "handy",
];
IdentityAutoFillConstants.UserNameFieldNames = ["user-name", "user-id", "screen-name"];
IdentityAutoFillConstants.CompanyFieldNames = [
    "company",
    "company-name",
    "organization",
    "organization-name",
    // German
    "firma",
];
IdentityAutoFillConstants.IsoCountries = {
    afghanistan: "AF",
    "aland islands": "AX",
    albania: "AL",
    algeria: "DZ",
    "american samoa": "AS",
    andorra: "AD",
    angola: "AO",
    anguilla: "AI",
    antarctica: "AQ",
    "antigua and barbuda": "AG",
    argentina: "AR",
    armenia: "AM",
    aruba: "AW",
    australia: "AU",
    austria: "AT",
    azerbaijan: "AZ",
    bahamas: "BS",
    bahrain: "BH",
    bangladesh: "BD",
    barbados: "BB",
    belarus: "BY",
    belgium: "BE",
    belize: "BZ",
    benin: "BJ",
    bermuda: "BM",
    bhutan: "BT",
    bolivia: "BO",
    "bosnia and herzegovina": "BA",
    botswana: "BW",
    "bouvet island": "BV",
    brazil: "BR",
    "british indian ocean territory": "IO",
    "brunei darussalam": "BN",
    bulgaria: "BG",
    "burkina faso": "BF",
    burundi: "BI",
    cambodia: "KH",
    cameroon: "CM",
    canada: "CA",
    "cape verde": "CV",
    "cayman islands": "KY",
    "central african republic": "CF",
    chad: "TD",
    chile: "CL",
    china: "CN",
    "christmas island": "CX",
    "cocos (keeling) islands": "CC",
    colombia: "CO",
    comoros: "KM",
    congo: "CG",
    "congo, democratic republic": "CD",
    "cook islands": "CK",
    "costa rica": "CR",
    "cote d'ivoire": "CI",
    croatia: "HR",
    cuba: "CU",
    cyprus: "CY",
    "czech republic": "CZ",
    denmark: "DK",
    djibouti: "DJ",
    dominica: "DM",
    "dominican republic": "DO",
    ecuador: "EC",
    egypt: "EG",
    "el salvador": "SV",
    "equatorial guinea": "GQ",
    eritrea: "ER",
    estonia: "EE",
    ethiopia: "ET",
    "falkland islands": "FK",
    "faroe islands": "FO",
    fiji: "FJ",
    finland: "FI",
    france: "FR",
    "french guiana": "GF",
    "french polynesia": "PF",
    "french southern territories": "TF",
    gabon: "GA",
    gambia: "GM",
    georgia: "GE",
    germany: "DE",
    ghana: "GH",
    gibraltar: "GI",
    greece: "GR",
    greenland: "GL",
    grenada: "GD",
    guadeloupe: "GP",
    guam: "GU",
    guatemala: "GT",
    guernsey: "GG",
    guinea: "GN",
    "guinea-bissau": "GW",
    guyana: "GY",
    haiti: "HT",
    "heard island & mcdonald islands": "HM",
    "holy see (vatican city state)": "VA",
    honduras: "HN",
    "hong kong": "HK",
    hungary: "HU",
    iceland: "IS",
    india: "IN",
    indonesia: "ID",
    "iran, islamic republic of": "IR",
    iraq: "IQ",
    ireland: "IE",
    "isle of man": "IM",
    israel: "IL",
    italy: "IT",
    jamaica: "JM",
    japan: "JP",
    jersey: "JE",
    jordan: "JO",
    kazakhstan: "KZ",
    kenya: "KE",
    kiribati: "KI",
    "republic of korea": "KR",
    "south korea": "KR",
    "democratic people's republic of korea": "KP",
    "north korea": "KP",
    kuwait: "KW",
    kyrgyzstan: "KG",
    "lao people's democratic republic": "LA",
    latvia: "LV",
    lebanon: "LB",
    lesotho: "LS",
    liberia: "LR",
    "libyan arab jamahiriya": "LY",
    liechtenstein: "LI",
    lithuania: "LT",
    luxembourg: "LU",
    macao: "MO",
    macedonia: "MK",
    madagascar: "MG",
    malawi: "MW",
    malaysia: "MY",
    maldives: "MV",
    mali: "ML",
    malta: "MT",
    "marshall islands": "MH",
    martinique: "MQ",
    mauritania: "MR",
    mauritius: "MU",
    mayotte: "YT",
    mexico: "MX",
    "micronesia, federated states of": "FM",
    moldova: "MD",
    monaco: "MC",
    mongolia: "MN",
    montenegro: "ME",
    montserrat: "MS",
    morocco: "MA",
    mozambique: "MZ",
    myanmar: "MM",
    namibia: "NA",
    nauru: "NR",
    nepal: "NP",
    netherlands: "NL",
    "netherlands antilles": "AN",
    "new caledonia": "NC",
    "new zealand": "NZ",
    nicaragua: "NI",
    niger: "NE",
    nigeria: "NG",
    niue: "NU",
    "norfolk island": "NF",
    "northern mariana islands": "MP",
    norway: "NO",
    oman: "OM",
    pakistan: "PK",
    palau: "PW",
    "palestinian territory, occupied": "PS",
    panama: "PA",
    "papua new guinea": "PG",
    paraguay: "PY",
    peru: "PE",
    philippines: "PH",
    pitcairn: "PN",
    poland: "PL",
    portugal: "PT",
    "puerto rico": "PR",
    qatar: "QA",
    reunion: "RE",
    romania: "RO",
    "russian federation": "RU",
    rwanda: "RW",
    "saint barthelemy": "BL",
    "saint helena": "SH",
    "saint kitts and nevis": "KN",
    "saint lucia": "LC",
    "saint martin": "MF",
    "saint pierre and miquelon": "PM",
    "saint vincent and grenadines": "VC",
    samoa: "WS",
    "san marino": "SM",
    "sao tome and principe": "ST",
    "saudi arabia": "SA",
    senegal: "SN",
    serbia: "RS",
    seychelles: "SC",
    "sierra leone": "SL",
    singapore: "SG",
    slovakia: "SK",
    slovenia: "SI",
    "solomon islands": "SB",
    somalia: "SO",
    "south africa": "ZA",
    "south georgia and sandwich isl.": "GS",
    spain: "ES",
    "sri lanka": "LK",
    sudan: "SD",
    suriname: "SR",
    "svalbard and jan mayen": "SJ",
    swaziland: "SZ",
    sweden: "SE",
    switzerland: "CH",
    "syrian arab republic": "SY",
    taiwan: "TW",
    tajikistan: "TJ",
    tanzania: "TZ",
    thailand: "TH",
    "timor-leste": "TL",
    togo: "TG",
    tokelau: "TK",
    tonga: "TO",
    "trinidad and tobago": "TT",
    tunisia: "TN",
    turkey: "TR",
    turkmenistan: "TM",
    "turks and caicos islands": "TC",
    tuvalu: "TV",
    uganda: "UG",
    ukraine: "UA",
    "united arab emirates": "AE",
    "united kingdom": "GB",
    "united states": "US",
    "united states outlying islands": "UM",
    uruguay: "UY",
    uzbekistan: "UZ",
    vanuatu: "VU",
    venezuela: "VE",
    vietnam: "VN",
    "virgin islands, british": "VG",
    "virgin islands, u.s.": "VI",
    "wallis and futuna": "WF",
    "western sahara": "EH",
    yemen: "YE",
    zambia: "ZM",
    zimbabwe: "ZW",
};
IdentityAutoFillConstants.IsoStates = {
    alabama: "AL",
    alaska: "AK",
    "american samoa": "AS",
    arizona: "AZ",
    arkansas: "AR",
    california: "CA",
    colorado: "CO",
    connecticut: "CT",
    delaware: "DE",
    "district of columbia": "DC",
    "federated states of micronesia": "FM",
    florida: "FL",
    georgia: "GA",
    guam: "GU",
    hawaii: "HI",
    idaho: "ID",
    illinois: "IL",
    indiana: "IN",
    iowa: "IA",
    kansas: "KS",
    kentucky: "KY",
    louisiana: "LA",
    maine: "ME",
    "marshall islands": "MH",
    maryland: "MD",
    massachusetts: "MA",
    michigan: "MI",
    minnesota: "MN",
    mississippi: "MS",
    missouri: "MO",
    montana: "MT",
    nebraska: "NE",
    nevada: "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    "northern mariana islands": "MP",
    ohio: "OH",
    oklahoma: "OK",
    oregon: "OR",
    palau: "PW",
    pennsylvania: "PA",
    "puerto rico": "PR",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    tennessee: "TN",
    texas: "TX",
    utah: "UT",
    vermont: "VT",
    "virgin islands": "VI",
    virginia: "VA",
    washington: "WA",
    "west virginia": "WV",
    wisconsin: "WI",
    wyoming: "WY",
};
IdentityAutoFillConstants.IsoProvinces = {
    alberta: "AB",
    "british columbia": "BC",
    manitoba: "MB",
    "new brunswick": "NB",
    "newfoundland and labrador": "NL",
    "nova scotia": "NS",
    ontario: "ON",
    "prince edward island": "PE",
    quebec: "QC",
    saskatchewan: "SK",
};
const SubmitLoginButtonNames = (/* unused pure expression or super */ null && ([
    "login",
    "signin",
    "submit",
    "continue",
    "next",
    "verify",
]));
const SubmitChangePasswordButtonNames = (/* unused pure expression or super */ null && ([
    "change",
    "save",
    "savepassword",
    "updatepassword",
    "changepassword",
    "resetpassword",
]));

;// ./src/autofill/services/collect-autofill-content.service.ts
var collect_autofill_content_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class CollectAutofillContentService {
    constructor(domElementVisibilityService, domQueryService, autofillOverlayContentService) {
        this.domElementVisibilityService = domElementVisibilityService;
        this.domQueryService = domQueryService;
        this.autofillOverlayContentService = autofillOverlayContentService;
        this.sendExtensionMessage = sendExtensionMessage;
        this.getAttributeBoolean = getAttributeBoolean;
        this.getPropertyOrAttribute = getPropertyOrAttribute;
        this.noFieldsFound = false;
        this.domRecentlyMutated = true;
        /**
         * undefined = not yet fetched, null = no rules (use heuristics),
         * [] = blocklisted (suppress autofill), [...] = use targeted fill
         */
        this.pageTargetingRules = undefined;
        this._autofillFormElements = new Map();
        this.autofillFieldElements = new Map();
        this.autofillFieldsByOpid = new Map();
        this.currentLocationHref = "";
        this.elementInitializingIntersectionObserver = new Set();
        this.isMonitoring = false;
        this.pendingAttributeMutations = new Map();
        this.pendingTopLayerTargets = new Set();
        this.pendingChildListUpdate = false;
        this.lastDetachedPurgeAt = -Infinity;
        this.detachedPurgeThrottleMs = 1000;
        this.updateAfterMutationIdleCallback = null;
        this.pendingOverlaySetup = new Map();
        this.overlaySetupDelayMs = 100;
        this.shadowDomCheckTimeout = null;
        this.pendingShadowDomCheck = false;
        this.pendingMutationAddedElements = new Set();
        this.pendingMutationAddedElementsOverflowed = false;
        // Caps the batch handed to suppressDescendantsInBatch; overflow → full-document scan fallback.
        this.pendingMutationAddedElementsCap = 256;
        this.ownedExperienceTagNames = [];
        this.updateAfterMutationTimeout = 1000;
        this.shadowDomCheckTimeoutMs = 500;
        this.shadowDomCheckDebounceMs = 300;
        this.lastMutationTimestamp = 0;
        this.mutationBurstCount = 0;
        this.mutationCooldownMs = 500;
        this.maxMutationWaitMs = 5000;
        this.nonInputFormFieldTags = new Set(["textarea", "select"]);
        this.ignoredInputTypes = new Set([
            "hidden",
            "submit",
            "reset",
            "button",
            "image",
            "file",
            "search",
            "url",
            "date",
            "time",
            "datetime", // Note: datetime is deprecated in HTML5; keeping here for backwards compatibility
            "datetime-local",
            "week",
            "color",
            "range",
        ]);
        /**
         * Builds an AutofillField object from the given form element. Will only return
         * shared field values if the element is a span element. Will not return any label
         * values if the element is a hidden input element.
         *
         * @param element - The form field element to build the AutofillField object from
         * @param index - The index of the form field element
         */
        this.buildAutofillFieldItem = (element, index) => collect_autofill_content_service_awaiter(this, void 0, void 0, function* () {
            if (element.closest("button[type='submit']")) {
                return null;
            }
            element.opid = `__${index}`;
            const existingAutofillField = this.autofillFieldElements.get(element);
            if (index >= 0 && existingAutofillField) {
                existingAutofillField.opid = element.opid;
                existingAutofillField.elementNumber = index;
                this.autofillFieldElements.set(element, existingAutofillField);
                return existingAutofillField;
            }
            const autofillFieldBase = {
                opid: element.opid,
                elementNumber: index,
                maxLength: this.getAutofillFieldMaxLength(element),
                viewable: yield this.domElementVisibilityService.isElementViewable(element),
                htmlID: this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.ID),
                htmlName: this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.NAME),
                htmlClass: this.getPropertyOrAttribute(element, "class"),
                tabindex: this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.TABINDEX),
                title: this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.TITLE),
                tagName: this.getAttributeLowerCase(element, "tagName"),
                dataSetValues: this.getDataSetValues(element),
            };
            // FIXME should a targeted rule be allowed to fill non-viewable fields
            // without waiting for them to enter the viewport?
            if (!autofillFieldBase.viewable) {
                this.elementInitializingIntersectionObserver.add(element);
                this.intersectionObserver.observe(element);
            }
            if (elementIsSpanElement(element)) {
                this.cacheAutofillFieldElement(index, element, autofillFieldBase);
                return autofillFieldBase;
            }
            let autofillFieldLabels = {};
            const elementType = this.getAttributeLowerCase(element, AUTOFILL_ATTRIBUTES.TYPE);
            if (elementType !== "hidden") {
                autofillFieldLabels = {
                    "label-tag": this.createAutofillFieldLabelTag(element),
                    "label-data": this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.DATA_LABEL),
                    "label-aria": this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.ARIA_LABEL),
                    "label-top": this.createAutofillFieldTopLabel(element),
                    "label-right": this.createAutofillFieldRightLabel(element),
                    "label-left": this.createAutofillFieldLeftLabel(element),
                    placeholder: this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.PLACEHOLDER),
                };
            }
            const fieldFormElement = element.form;
            const autofillField = Object.assign(Object.assign(Object.assign({}, autofillFieldBase), autofillFieldLabels), { rel: this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.REL), type: elementType, value: this.getElementValue(element), checked: this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.CHECKED), autoCompleteType: this.getAutoCompleteAttribute(element), disabled: this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.DISABLED), readonly: this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.READONLY), selectInfo: elementIsSelectElement(element)
                    ? this.getSelectElementOptions(element)
                    : null, form: fieldFormElement ? this.getPropertyOrAttribute(fieldFormElement, "opid") : null, "aria-describedby": this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.ARIA_DESCRIBEDBY), "aria-hidden": this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.ARIA_HIDDEN, true), "aria-disabled": this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.ARIA_DISABLED, true), "aria-haspopup": this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.ARIA_HASPOPUP, true), "data-stripe": this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.DATA_STRIPE) });
            this.cacheAutofillFieldElement(index, element, autofillField);
            return autofillField;
        });
        /**
         * Map over all the label elements and creates a
         * string of the text content of each label element.
         * @param {Set<HTMLElement>} labelElementsSet
         * @returns {string}
         * @private
         */
        this.createLabelElementsTag = (labelElementsSet) => {
            return Array.from(labelElementsSet)
                .map((labelElement) => {
                const textContent = labelElement
                    ? labelElement.textContent || labelElement.innerText
                    : null;
                return this.trimAndRemoveNonPrintableText(textContent || "");
            })
                .join("");
        };
        this.setupInitialTopLayerListeners = () => {
            var _a;
            const unownedTopLayerItems = (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.getUnownedTopLayerItems(true);
            if (unownedTopLayerItems === null || unownedTopLayerItems === void 0 ? void 0 : unownedTopLayerItems.length) {
                for (const unownedElement of unownedTopLayerItems) {
                    if (this.shouldListenToTopLayerCandidate(unownedElement)) {
                        this.setupTopLayerCandidateListener(unownedElement);
                    }
                }
            }
        };
        /**
         * Handles observed DOM mutations and identifies if a mutation is related to
         * an autofill element. If so, it will update the autofill element data.
         * @param {MutationRecord[]} mutations
         * @private
         */
        this.handleMutationObserverMutation = (mutations) => {
            var _a, _b;
            if (this.currentLocationHref !== globalThis.location.href) {
                this.handleWindowLocationMutation();
                return;
            }
            // Throttled; runs every wake so detached nodes are reclaimed even when no drain is scheduled.
            this.purgeDetachedNodesIfDue();
            const hasMutationsInShadowRoot = this.domQueryService.checkMutationsInShadowRoots(mutations);
            if (hasMutationsInShadowRoot) {
                this.debouncedRequirePageDetailsUpdate();
            }
            // New-shadow-root detection only runs when a batch actually added nodes;
            // attribute/character-data mutations can't introduce shadow roots.
            const hasAddedNodes = mutations.some((m) => { var _a, _b; return ((_b = (_a = m.addedNodes) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0; });
            if (hasAddedNodes) {
                this.collectAddedShadowRootCandidates(mutations);
                if (!this.pendingShadowDomCheck) {
                    this.pendingShadowDomCheck = true;
                    if (this.shadowDomCheckTimeout) {
                        clearTimeout(this.shadowDomCheckTimeout);
                    }
                    this.shadowDomCheckTimeout = setTimeout(() => {
                        this.handleNewShadowRoots();
                        this.pendingShadowDomCheck = false;
                        this.pendingMutationAddedElements.clear();
                        this.pendingMutationAddedElementsOverflowed = false;
                    }, this.shadowDomCheckTimeoutMs);
                }
            }
            // Drain only when idle AND this batch added work; no-op drains are pure overhead.
            const queueWasIdle = !this.hasPendingWork;
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    if (!nodeIsElement(mutation.target)) {
                        continue;
                    }
                    const attributeName = (_a = mutation.attributeName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                    if (!attributeName) {
                        continue;
                    }
                    const target = mutation.target;
                    let attributeNames = this.pendingAttributeMutations.get(target);
                    if (!attributeNames) {
                        attributeNames = new Set();
                        this.pendingAttributeMutations.set(target, attributeNames);
                    }
                    attributeNames.add(attributeName);
                    if (this.isPopoverAttribute(attributeName)) {
                        this.pendingTopLayerTargets.add(target);
                    }
                }
                else if (mutation.type === "childList") {
                    // Gate the noFieldsFound-invalidating flag; skip the walk once it's set.
                    if (!this.pendingChildListUpdate && this.mutationAddsOrRemovesFormField(mutation)) {
                        this.pendingChildListUpdate = true;
                    }
                    for (const node of (_b = mutation.addedNodes) !== null && _b !== void 0 ? _b : []) {
                        if (!nodeIsElement(node)) {
                            continue;
                        }
                        if (this.shouldListenToTopLayerCandidate(node)) {
                            this.pendingTopLayerTargets.add(node);
                        }
                    }
                }
            }
            if (queueWasIdle && this.hasPendingWork) {
                requestIdleCallbackPolyfill(this.processMutations, { timeout: 500 });
            }
        };
        this.processMutations = () => {
            // Swap first so reentrant mutations during processing land in fresh structures
            // and drain on the next cycle, mirroring the queue-swap the previous design relied on.
            const drainingAttributeMutations = this.pendingAttributeMutations;
            const drainingTopLayer = this.pendingTopLayerTargets;
            const childListNeeded = this.pendingChildListUpdate;
            this.pendingAttributeMutations = new Map();
            this.pendingTopLayerTargets = new Set();
            this.pendingChildListUpdate = false;
            // Drain-time purge: throttled, so this only does work when the window elapsed since the wake-purge.
            this.purgeDetachedNodesIfDue();
            if (drainingAttributeMutations.size === 0 && drainingTopLayer.size === 0 && !childListNeeded) {
                return;
            }
            requestIdleCallbackPolyfill(() => {
                for (const element of drainingTopLayer) {
                    this.setupTopLayerCandidateListener(element);
                }
                if (childListNeeded) {
                    // Full rebuild re-reads every attribute, so the per-attribute path is redundant here.
                    this.requirePageDetailsUpdate();
                }
                else {
                    for (const [target, attributeNames] of drainingAttributeMutations) {
                        for (const attributeName of attributeNames) {
                            this.applyAttributeMutation(target, attributeName);
                        }
                    }
                }
                if (this.domRecentlyMutated) {
                    this.updateAutofillElementsAfterMutation();
                }
            }, { timeout: 500 });
        };
        this.debouncedRequirePageDetailsUpdate = debounce(() => {
            this.requirePageDetailsUpdate();
            this.updateAutofillElementsAfterMutation();
        }, this.shadowDomCheckDebounceMs);
        /**
         * Detects new shadow roots and schedules a page details update if any are found.
         * This is called periodically to catch shadow roots added after initial page load.
         * The update is debounced to prevent excessive collection triggers.
         * @private
         */
        this.handleNewShadowRoots = () => {
            // Hosts added by mutation may have been removed during the 500ms debounce.
            const connected = [];
            for (const element of this.pendingMutationAddedElements) {
                if (element.isConnected) {
                    connected.push(element);
                }
            }
            const hasNewShadowRoots = this.domQueryService.checkForNewShadowRoots(connected);
            if (hasNewShadowRoots) {
                this.debouncedRequirePageDetailsUpdate();
            }
        };
        this.setupTopLayerCandidateListener = (element) => {
            const overlayService = this.autofillOverlayContentService;
            if (overlayService !== undefined) {
                const ownedTags = overlayService.getOwnedInlineMenuTagNames() || [];
                this.ownedExperienceTagNames = ownedTags;
                if (!ownedTags.includes(element.tagName)) {
                    const toggleListener = (event) => {
                        if (event.newState === "open") {
                            // Add a slight delay (but faster than a user's reaction), to ensure the layer
                            // positioning happens after any triggered toggle has completed.
                            setTimeout(() => {
                                overlayService.refreshMenuLayerPosition();
                            }, 100);
                        }
                    };
                    element.addEventListener("toggle", toggleListener);
                    overlayService.refreshMenuLayerPosition();
                }
            }
        };
        this.isPopoverAttribute = (attr) => {
            const popoverAttributes = new Set(["popover", "popovertarget", "popovertargetaction"]);
            return attr && popoverAttributes.has(attr.toLowerCase());
        };
        this.shouldListenToTopLayerCandidate = (element) => {
            return (!this.ownedExperienceTagNames.includes(element.tagName) &&
                (element.tagName === "DIALOG" ||
                    Array.from(element.attributes || []).some((attribute) => this.isPopoverAttribute(attribute.name))));
        };
        /**
         * Handles observed form field elements that are not viewable in the viewport.
         * Will re-evaluate the visibility of the element and set up the autofill
         * overlay listeners on the field if it is viewable.
         *
         * @param entries - The entries observed by the IntersectionObserver
         */
        this.handleFormElementIntersection = (entries) => collect_autofill_content_service_awaiter(this, void 0, void 0, function* () {
            for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
                const entry = entries[entryIndex];
                const formFieldElement = entry.target;
                if (this.elementInitializingIntersectionObserver.has(formFieldElement)) {
                    this.elementInitializingIntersectionObserver.delete(formFieldElement);
                    continue;
                }
                const cachedAutofillFieldElement = this.autofillFieldElements.get(formFieldElement);
                if (!cachedAutofillFieldElement) {
                    this.intersectionObserver.unobserve(entry.target);
                    continue;
                }
                const isViewable = yield this.domElementVisibilityService.isElementViewable(formFieldElement);
                if (!isViewable) {
                    continue;
                }
                cachedAutofillFieldElement.viewable = true;
                this.setupOverlayOnField(formFieldElement, cachedAutofillFieldElement);
                this.intersectionObserver.unobserve(entry.target);
            }
        });
        let inputQuery = "input:not([data-bwignore])";
        for (const type of this.ignoredInputTypes) {
            inputQuery += `:not([type="${type}"])`;
        }
        this.formFieldQueryString = `${inputQuery}, textarea:not([data-bwignore]), select:not([data-bwignore]), span[data-bwautofill]`;
        this.mutationObserver = new MutationObserver(this.handleMutationObserverMutation);
        this.intersectionObserver = new IntersectionObserver(this.handleFormElementIntersection, {
            root: null,
            rootMargin: "0px",
            // Safari doesn't seem to function properly with a threshold of 1.
            threshold: 0.9999,
        });
        // Match owned inline-menu hosts by identity, not tag name — a tag-name match would
        // over-exclude same-tag page elements and is spoofable by the page.
        this.domQueryService.setOwnedShadowHostPredicate((host) => { var _a, _b; return (_b = (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.isElementInlineMenu(host)) !== null && _b !== void 0 ? _b : false; });
    }
    /**
     * Attaches the mutation observer to the document. The intersection
     * observer is allocated at construction; it attaches per-field as
     * fields are cached during page-details collection. Idempotent.
     */
    startMonitoring() {
        if (this.isMonitoring) {
            return;
        }
        this.isMonitoring = true;
        this.currentLocationHref = globalThis.location.href;
        // FIXME we might be able to use an alternate (less expensive) mutation observer setup when targeting rules are being used
        this.mutationObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: Object.values(AUTOFILL_ATTRIBUTES),
            childList: true,
            subtree: true,
        });
    }
    /**
     * Detaches observers and clears monitoring-scoped state so a future
     * `startMonitoring()` begins fresh against the current page. Idempotent.
     */
    stopMonitoring() {
        this.isMonitoring = false;
        if (this.updateAfterMutationIdleCallback !== null) {
            cancelIdleCallbackPolyfill(this.updateAfterMutationIdleCallback);
            this.updateAfterMutationIdleCallback = null;
        }
        if (this.shadowDomCheckTimeout) {
            clearTimeout(this.shadowDomCheckTimeout);
            this.shadowDomCheckTimeout = null;
        }
        this.pendingOverlaySetup.forEach((timeout) => globalThis.clearTimeout(timeout));
        this.pendingOverlaySetup.clear();
        this.mutationObserver.disconnect();
        this.intersectionObserver.disconnect();
        this._autofillFormElements.clear();
        this.autofillFieldElements.clear();
        this.autofillFieldsByOpid.clear();
        this.elementInitializingIntersectionObserver.clear();
        this.noFieldsFound = false;
        this.domRecentlyMutated = true;
        this.pendingShadowDomCheck = false;
        this.currentLocationHref = "";
    }
    get autofillFormElements() {
        return this._autofillFormElements;
    }
    /**
     * Builds the data for all forms and fields found within the page DOM.
     * Sets up a mutation observer to verify DOM changes and returns early
     * with cached data if no changes are detected.
     * @returns {Promise<AutofillPageDetails>}
     * @public
     */
    getPageDetails() {
        return collect_autofill_content_service_awaiter(this, void 0, void 0, function* () {
            var _a;
            // Set up listeners on top-layer candidates that predate Mutation Observer setup
            if (this.autofillOverlayContentService) {
                this.setupInitialTopLayerListeners();
            }
            // Check for targeting rules before running heuristic collection
            if (this.pageTargetingRules === undefined) {
                this.pageTargetingRules =
                    (_a = (yield this.sendExtensionMessage("getUrlAutofillTargetingRules")).result) !== null && _a !== void 0 ? _a : null;
            }
            const targetingRules = this.pageTargetingRules;
            if (targetingRules != null) {
                if (targetingRules.length === 0) {
                    // Blocklisted; return empty page details, skip heuristics
                    return this.getFormattedPageDetails({}, []);
                }
                return this.getTargetedPageDetails(targetingRules);
            }
            if (!this.domRecentlyMutated && this.noFieldsFound) {
                return this.getFormattedPageDetails({}, []);
            }
            if (!this.domRecentlyMutated && this.autofillFieldElements.size) {
                this.updateCachedAutofillFieldVisibility();
                return this.getFormattedPageDetails(this.getFormattedAutofillFormsData(), this.getFormattedAutofillFieldsData());
            }
            const { formElements, formFieldElements } = this.queryAutofillFormAndFieldElements();
            const autofillFormsData = this.buildAutofillFormsData(formElements);
            const autofillFieldsData = yield this.buildAutofillFieldsData(formFieldElements);
            this.sortAutofillFieldElementsMap();
            if (!autofillFieldsData.length) {
                this.noFieldsFound = true;
            }
            this.domRecentlyMutated = false;
            const pageDetails = this.getFormattedPageDetails(autofillFormsData, autofillFieldsData);
            this.setupOverlayListeners(pageDetails);
            return pageDetails;
        });
    }
    /**
     * Find an AutofillField element by its opid, will only return the first
     * element if there are multiple elements with the same opid. If no
     * element is found, null will be returned.
     * @param {string} opid
     * @returns {FormFieldElement | null}
     */
    getAutofillFieldElementByOpid(opid) {
        // O(1): Try dual-index lookup first
        const cachedElement = this.autofillFieldsByOpid.get(opid);
        if (cachedElement) {
            // Validate element is still in DOM (not stale)
            if (cachedElement.isConnected) {
                return cachedElement;
            }
            // Stale entry - clean it up
            this.autofillFieldElements.delete(cachedElement);
            this.autofillFieldsByOpid.delete(opid);
        }
        // Fallback: No cached element or it was stale, query DOM
        const cachedFormFieldElements = Array.from(this.autofillFieldElements.keys());
        const formFieldElements = (cachedFormFieldElements === null || cachedFormFieldElements === void 0 ? void 0 : cachedFormFieldElements.length)
            ? cachedFormFieldElements
            : this.getAutofillFieldElements();
        const fieldElementsWithOpid = formFieldElements.filter((fieldElement) => fieldElement.opid === opid);
        if (!fieldElementsWithOpid.length) {
            const elementIndex = parseInt(opid.split("__")[1], 10);
            return formFieldElements[elementIndex] || null;
        }
        if (fieldElementsWithOpid.length > 1) {
            // eslint-disable-next-line no-console
            console.warn(`More than one element found with opid ${opid}`);
        }
        return fieldElementsWithOpid[0];
    }
    /**
     * Sorts the AutofillFieldElements map by the elementNumber property.
     * @private
     */
    sortAutofillFieldElementsMap() {
        if (!this.autofillFieldElements.size) {
            return;
        }
        this.autofillFieldElements = new Map([...this.autofillFieldElements].sort((a, b) => a[1].elementNumber - b[1].elementNumber));
    }
    /**
     * Formats and returns the AutofillPageDetails object
     *
     * @param autofillFormsData - The data for all the forms found in the page
     * @param autofillFieldsData - The data for all the fields found in the page
     */
    getFormattedPageDetails(autofillFormsData, autofillFieldsData) {
        return {
            title: document.title,
            url: (document.defaultView || globalThis).location.href,
            documentUrl: document.location.href,
            forms: autofillFormsData,
            fields: autofillFieldsData,
            collectedTimestamp: Date.now(),
        };
    }
    /**
     * Builds page details using targeting rule selectors instead of heuristic
     * detection. Iterates through form definitions, resolving each field type's
     * selector array by trying each `DeepSelector` in order and stopping at the
     * first DOM match.
     */
    getTargetedPageDetails(forms) {
        const targets = forms.flatMap((form) => Object.entries(form.fields)
            .filter(([, alternatives]) => alternatives === null || alternatives === void 0 ? void 0 : alternatives.length)
            .map(([fieldType, selectorAlternatives]) => ({
            fieldType,
            selectorAlternatives,
            formCategory: form.category,
        })));
        const { localFields, iframeTargets } = this.resolveTargetedFields(targets);
        this.routeIframeTargets(iframeTargets);
        // If this frame resolved no local targeted fields but already has fields cached
        // from a prior applyExternalTargetedFields call, use those cached fields. This
        // handles the case where an iframe's own getPageDetails() runs the targeting path
        // (because targeting rules apply to the whole tab URL) but all selectors in the
        // rules cross an iframe boundary that doesn't exist inside this frame — so the
        // results are empty, and we must not overwrite the background's page-details entry
        // with an empty payload.
        if (!localFields.length && this.autofillFieldElements.size > 0) {
            this.domRecentlyMutated = false;
            const cachedPageDetails = this.getFormattedPageDetails(this.getFormattedAutofillFormsData(), this.getFormattedAutofillFieldsData());
            this.setupOverlayListeners(cachedPageDetails);
            return cachedPageDetails;
        }
        this.domRecentlyMutated = false;
        /**
         * @TODO check if need to utilize targeting rules for forms/submits within closed
         * shadow roots as well, in order to detect cipher additions/updates
         */
        const pageDetails = this.getFormattedPageDetails({}, localFields);
        this.setupOverlayListeners(pageDetails);
        return pageDetails;
    }
    /**
     * Applies externally-provided targeting rules to this frame. Called when the
     * background dispatches `applyTargetedFields` after a parent frame's
     * targeting rule selector crossed into this iframe. Resolves each selector
     * locally if possible; if a routed selector itself crosses another iframe
     * (multi-hop chain), re-routes via the background to the next frame.
     * Re-sends collectPageDetailsResponse so the background updates its frame
     * records.
     *
     * @param targetedFields - Selector/fieldType pairs resolved to this frame
     */
    applyExternalTargetedFields(targetedFields) {
        return collect_autofill_content_service_awaiter(this, void 0, void 0, function* () {
            const targets = targetedFields.map((t) => ({
                selectorAlternatives: [t.selector],
                fieldType: t.fieldType,
                formCategory: t.formCategory,
            }));
            const { localFields, iframeTargets } = this.resolveTargetedFields(targets);
            this.routeIframeTargets(iframeTargets);
            // Symmetric to getTargetedPageDetails: if we resolved no local fields but
            // already have cached fields from a prior applyExternalTargetedFields call,
            // re-broadcast those instead of clobbering with an empty payload.
            if (!localFields.length && this.autofillFieldElements.size > 0) {
                this.domRecentlyMutated = false;
                const cachedPageDetails = this.getFormattedPageDetails(this.getFormattedAutofillFormsData(), this.getFormattedAutofillFieldsData());
                void this.sendExtensionMessage("collectPageDetailsResponse", {
                    details: cachedPageDetails,
                    sender: "autofillInit",
                });
                return;
            }
            if (!localFields.length) {
                return;
            }
            this.domRecentlyMutated = false;
            const pageDetails = this.getFormattedPageDetails({}, localFields);
            this.setupOverlayListeners(pageDetails);
            void this.sendExtensionMessage("collectPageDetailsResponse", {
                details: pageDetails,
                sender: "autofillInit",
            });
        });
    }
    /**
     * Resolves a flat list of field targets against the current frame's DOM.
     * For each target, tries each selector alternative in order until one resolves
     * locally or crosses into an iframe. Iframe-crossing selectors are
     * accumulated into `iframeTargets` keyed by the iframe's URL so the caller
     * can route them onward via the background.
     *
     * Termination guarantee: when invoked recursively across frames, each hop
     * strips at least one `>>>` segment from the routed selector, so a selector
     * with N segments terminates after at most N-1 hops.
     */
    resolveTargetedFields(targets) {
        var _a, _b;
        const localFields = [];
        // Accumulates targets that live inside iframes, keyed by the iframe's URL.
        // These are routed to the iframe's own content script instead of being
        // collected here, so the existing sub-frame offset infrastructure handles
        // their positioning correctly.
        const iframeTargets = new Map();
        for (let targetIndex = 0; targetIndex < targets.length; targetIndex++) {
            const { selectorAlternatives, fieldType, formCategory } = targets[targetIndex];
            if (!(selectorAlternatives === null || selectorAlternatives === void 0 ? void 0 : selectorAlternatives.length)) {
                continue;
            }
            for (const selector of selectorAlternatives) {
                if (typeof selector !== "string") {
                    continue;
                }
                // Check whether this selector crosses an iframe boundary before
                // trying to resolve it locally.
                const iframeCrossing = this.domQueryService.findIframeCrossing(selector);
                if (iframeCrossing) {
                    const { iframeElement, innerSelector } = iframeCrossing;
                    const iframeSrc = ((_b = (_a = iframeElement.contentDocument) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.href) || iframeElement.src;
                    // Empty src (srcdoc, about:blank) is deferred — see routing/scope notes.
                    if (iframeSrc) {
                        if (!iframeTargets.has(iframeSrc)) {
                            iframeTargets.set(iframeSrc, []);
                        }
                        iframeTargets.get(iframeSrc).push({
                            selector: innerSelector,
                            fieldType,
                            formCategory,
                        });
                    }
                    break;
                }
                // No iframe boundary — resolve locally (direct element or shadow DOM).
                const matchedElement = this.domQueryService.queryDeepSelector(selector);
                if (matchedElement) {
                    const fieldId = `targeted_field_${targetIndex}_${fieldType}`;
                    const formFieldElement = matchedElement;
                    formFieldElement.opid = fieldId;
                    const autofillField = this.buildTargetedAutofillField(formFieldElement, fieldType, localFields.length, formCategory);
                    localFields.push(autofillField);
                    this.cacheAutofillFieldElement(localFields.length - 1, formFieldElement, autofillField);
                    break;
                }
            }
        }
        return { localFields, iframeTargets };
    }
    /**
     * Resets the cached targeting-rules. Invoked when the background signals
     * that the user disabled fill assist mid-session.
     */
    clearCachedTargetingRules() {
        this.pageTargetingRules = undefined;
    }
    /**
     * Fire-and-forget dispatch of accumulated iframe-crossing selectors to the
     * background, which routes each batch to the matching frame's content script.
     * The receiving frame's `applyExternalTargetedFields` will resolve locally
     * or re-route onward, enabling multi-hop chains.
     */
    routeIframeTargets(iframeTargets) {
        for (const [iframeSrc, iframeTargetedFields] of iframeTargets) {
            void this.sendExtensionMessage("routeTargetedFieldsToFrame", {
                iframeSrc,
                iframeTargetedFields,
            }).catch((error) => {
                // eslint-disable-next-line no-console
                console.warn(`[CollectAutofillContent] Failed to route targeted fields for iframe ${iframeSrc}:`, error);
            });
        }
    }
    /**
     * Builds a minimal AutofillField for a targeted element, setting the
     * fieldQualifier and targeted flag so the fill pipeline can identify it.
     */
    buildTargetedAutofillField(element, fieldType, index, formCategory) {
        var _a, _b;
        const field = new AutofillField();
        field.opid = element.opid;
        field.elementNumber = index;
        // Targeted fields are always treated as viewable regardless of actual
        // visibility. Targeting rules may deliberately select hidden fields
        // (e.g. tabbed forms, fields revealed by user interaction).
        field.viewable = true;
        field.htmlID = element.id || null;
        field.htmlName = element.name || null;
        field.htmlClass = element.className || null;
        field.tabindex = element.getAttribute("tabindex");
        field.title = element.getAttribute("title");
        field.tagName = (_a = element.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        field.type = ((_b = element.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || undefined;
        field.fieldQualifier = fieldType;
        field.targeted = true;
        field.formCategory = formCategory;
        return field;
    }
    /**
     * Re-checks the visibility for all form fields and updates the
     * cached data to reflect the most recent visibility state.
     *
     * @private
     */
    updateCachedAutofillFieldVisibility() {
        this.autofillFieldElements.forEach((autofillField, element) => collect_autofill_content_service_awaiter(this, void 0, void 0, function* () {
            const previouslyViewable = autofillField.viewable;
            autofillField.viewable = yield this.domElementVisibilityService.isElementViewable(element);
            if (!previouslyViewable && autofillField.viewable) {
                this.setupOverlayOnField(element, autofillField);
            }
        }));
    }
    /**
     * Queries the DOM for all the forms elements and
     * returns a collection of AutofillForm objects.
     * @returns {Record<string, AutofillForm>}
     * @private
     */
    buildAutofillFormsData(formElements) {
        var _a;
        for (let index = 0; index < formElements.length; index++) {
            const formElement = formElements[index];
            formElement.opid = `__form__${index}`;
            const existingAutofillForm = this._autofillFormElements.get(formElement);
            if (existingAutofillForm) {
                existingAutofillForm.opid = formElement.opid;
                this._autofillFormElements.set(formElement, existingAutofillForm);
                continue;
            }
            this._autofillFormElements.set(formElement, {
                opid: formElement.opid,
                htmlAction: this.getFormActionAttribute(formElement),
                htmlName: this.getPropertyOrAttribute(formElement, AUTOFILL_ATTRIBUTES.NAME),
                htmlClass: (_a = this.getPropertyOrAttribute(formElement, "class")) !== null && _a !== void 0 ? _a : "",
                htmlID: this.getPropertyOrAttribute(formElement, AUTOFILL_ATTRIBUTES.ID),
                htmlMethod: this.getPropertyOrAttribute(formElement, AUTOFILL_ATTRIBUTES.METHOD),
                htmlAncestorHeadings: this.getAncestorHeadings(formElement),
            });
        }
        return this.getFormattedAutofillFormsData();
    }
    /**
     * Headings inside the form's nearest section/article/main/aside/form ancestor,
     * ordered by depth of common ancestor (closest first). Sibling-form headings skipped.
     */
    getAncestorHeadings(formElement) {
        var _a;
        const scope = (_a = formElement.parentElement) === null || _a === void 0 ? void 0 : _a.closest("section, article, main, aside");
        if (!scope) {
            return [];
        }
        const ancestorDepths = new Map();
        let cursor = formElement;
        let depth = 0;
        while (cursor) {
            ancestorDepths.set(cursor, depth++);
            if (cursor === scope) {
                break;
            }
            cursor = cursor.parentElement;
        }
        return Array.from(scope.querySelectorAll("h1, h2, h3, h4, h5, h6"))
            .flatMap((heading) => {
            const f = heading.closest("form");
            if (f !== null && f !== formElement) {
                return [];
            }
            const text = this.getTextContentFromElement(heading);
            if (!text) {
                return [];
            }
            // Every retained heading lives under `scope`, and `scope` is in `ancestorDepths`,
            // so the walk always terminates at a known ancestor.
            let ancestor = heading;
            while (!ancestorDepths.has(ancestor)) {
                ancestor = ancestor.parentElement;
            }
            return [{ text, distance: ancestorDepths.get(ancestor) }];
        })
            .sort((a, b) => a.distance - b.distance)
            .map((entry) => entry.text);
    }
    /**
     * Returns the action attribute of the form element. If the action attribute
     * is a relative path, it will be converted to an absolute path.
     * @param {ElementWithOpId<HTMLFormElement>} element
     * @returns {string | null}
     * @private
     */
    getFormActionAttribute(element) {
        const action = this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.ACTION);
        if (action === null) {
            return null;
        }
        return new URL(action, globalThis.location.href).href;
    }
    /**
     * Iterates over all known form elements and returns an AutofillForm object
     * containing a key value pair of the form element's opid and the form data.
     * @returns {Record<string, AutofillForm>}
     * @private
     */
    getFormattedAutofillFormsData() {
        const autofillForms = {};
        const autofillFormElements = Array.from(this._autofillFormElements);
        for (let index = 0; index < autofillFormElements.length; index++) {
            const [formElement, autofillForm] = autofillFormElements[index];
            autofillForms[formElement.opid] = autofillForm;
        }
        return autofillForms;
    }
    /**
     * Queries the DOM for all the field elements and
     * returns a list of AutofillField objects.
     * @returns {Promise<AutofillField[]>}
     * @private
     */
    buildAutofillFieldsData(formFieldElements) {
        return collect_autofill_content_service_awaiter(this, void 0, void 0, function* () {
            // Maximum number of form fields to process for autofill to prevent performance issues on pages with excessive fields
            const autofillFieldsLimit = 200;
            const autofillFieldElements = this.getAutofillFieldElements(autofillFieldsLimit, formFieldElements);
            const autofillFieldDataPromises = autofillFieldElements.map((element, i) => this.buildAutofillFieldItem(element, i));
            const candidates = yield Promise.all(autofillFieldDataPromises);
            const autofillFields = candidates.filter((field) => field !== null);
            return autofillFields;
        });
    }
    /**
     * Queries the DOM for all the field elements that can be autofilled,
     * and returns a list limited to the given `fieldsLimit` number that
     * is ordered by priority.
     * @param {number} fieldsLimit - The maximum number of fields to return
     * @param {FormFieldElement[]} previouslyFoundFormFieldElements - The list of all the field elements
     * @returns {FormFieldElement[]}
     * @private
     */
    getAutofillFieldElements(fieldsLimit, previouslyFoundFormFieldElements) {
        var _a;
        let formFieldElements = previouslyFoundFormFieldElements;
        if (!formFieldElements) {
            formFieldElements = this.domQueryService.query(globalThis.document.documentElement, this.formFieldQueryString, (element) => this.isElementFormFieldElement(element), this.mutationObserver);
        }
        if (!fieldsLimit || formFieldElements.length <= fieldsLimit) {
            return formFieldElements;
        }
        const priorityFormFields = [];
        const unimportantFormFields = [];
        const unimportantFieldTypesSet = new Set(["checkbox", "radio"]);
        for (const element of formFieldElements) {
            if (priorityFormFields.length >= fieldsLimit) {
                return priorityFormFields;
            }
            const fieldType = (_a = this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.TYPE)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (fieldType !== undefined && unimportantFieldTypesSet.has(fieldType)) {
                unimportantFormFields.push(element);
                continue;
            }
            priorityFormFields.push(element);
        }
        const numberUnimportantFieldsToInclude = fieldsLimit - priorityFormFields.length;
        for (let index = 0; index < numberUnimportantFieldsToInclude; index++) {
            priorityFormFields.push(unimportantFormFields[index]);
        }
        return priorityFormFields;
    }
    /**
     * Caches the autofill field element and its data.
     *
     * @param index - The index of the autofill field element
     * @param element - The autofill field element to cache
     * @param autofillFieldData - The autofill field data to cache
     */
    cacheAutofillFieldElement(index, element, autofillFieldData) {
        const opid = autofillFieldData.opid;
        // Remove old element with same opid if it exists
        const oldElement = this.autofillFieldsByOpid.get(opid);
        if (oldElement && oldElement !== element) {
            this.autofillFieldElements.delete(oldElement);
        }
        // Always cache the element, even if index is -1 (for dynamically added fields)
        this.autofillFieldElements.set(element, autofillFieldData);
        this.autofillFieldsByOpid.set(opid, element);
    }
    /**
     * Identifies the autocomplete attribute associated with an element and returns
     * the value of the attribute if it is not set to "off".
     * @param {ElementWithOpId<FormFieldElement>} element
     * @returns {string | null}
     * @private
     */
    getAutoCompleteAttribute(element) {
        return (this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.AUTOCOMPLETE) ||
            this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.X_AUTOCOMPLETE_TYPE) ||
            this.getPropertyOrAttribute(element, AUTOFILL_ATTRIBUTES.AUTOCOMPLETE_TYPE));
    }
    /**
     * Returns the attribute of an element as a lowercase value.
     * @param {ElementWithOpId<FormFieldElement>} element
     * @param {string} attributeName
     * @returns {string | undefined}
     * @private
     */
    getAttributeLowerCase(element, attributeName) {
        var _a;
        return (_a = this.getPropertyOrAttribute(element, attributeName)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    }
    /**
     * Returns the value of an element's property or attribute.
     * @returns {AutofillField[]}
     * @private
     */
    getFormattedAutofillFieldsData() {
        return Array.from(this.autofillFieldElements.values());
    }
    /**
     * Creates a label tag used to autofill the element pulled from a label
     * associated with the element's id, name, parent element or from an
     * associated description term element if no other labels can be found.
     * Returns a string containing all the `textContent` or `innerText`
     * values of the label elements.
     * @param {FillableFormFieldElement} element
     * @returns {string}
     * @private
     */
    createAutofillFieldLabelTag(element) {
        var _a, _b;
        const labelElementsSet = new Set(element.labels);
        if (labelElementsSet.size) {
            return this.createLabelElementsTag(labelElementsSet);
        }
        const labelElements = this.queryElementLabels(element);
        if (labelElements === null || labelElements === void 0 ? void 0 : labelElements.length) {
            for (const label of labelElements) {
                labelElementsSet.add(label);
            }
        }
        let currentElement = element;
        while (currentElement !== null && currentElement !== document.documentElement) {
            if (elementIsLabelElement(currentElement)) {
                labelElementsSet.add(currentElement);
            }
            currentElement = (_b = (_a = currentElement.parentElement) === null || _a === void 0 ? void 0 : _a.closest("label")) !== null && _b !== void 0 ? _b : null;
        }
        const parentElement = element.parentElement;
        if (!labelElementsSet.size &&
            parentElement !== null &&
            elementIsDescriptionDetailsElement(parentElement)) {
            const prevSibling = parentElement.previousElementSibling;
            if (prevSibling instanceof HTMLElement && elementIsDescriptionTermElement(prevSibling)) {
                labelElementsSet.add(prevSibling);
            }
        }
        return this.createLabelElementsTag(labelElementsSet);
    }
    /**
     * Queries the DOM for label elements associated with the given element
     * by id or name. Returns a NodeList of label elements or null if none
     * are found.
     * @param {FillableFormFieldElement} element
     * @returns {NodeListOf<HTMLLabelElement> | null}
     * @private
     */
    queryElementLabels(element) {
        let labelQuerySelectors = element.id ? `label[for="${element.id}"]` : "";
        if (element.name) {
            const forElementNameSelector = `label[for="${element.name}"]`;
            labelQuerySelectors = labelQuerySelectors
                ? `${labelQuerySelectors}, ${forElementNameSelector}`
                : forElementNameSelector;
        }
        if (!labelQuerySelectors) {
            return null;
        }
        return element.getRootNode().querySelectorAll(labelQuerySelectors.replace(/\n/g, ""));
    }
    /**
     * Gets the maxLength property of the passed FormFieldElement and
     * returns the value or null if the element does not have a
     * maxLength property. If the element has a maxLength property
     * greater than 999, it will return 999.
     * @param {FormFieldElement} element
     * @returns {number | null}
     * @private
     */
    getAutofillFieldMaxLength(element) {
        const elementHasMaxLengthProperty = elementIsInputElement(element) || elementIsTextAreaElement(element);
        const elementMaxLength = elementHasMaxLengthProperty && element.maxLength > -1 ? element.maxLength : 999;
        return elementHasMaxLengthProperty ? Math.min(elementMaxLength, 999) : null;
    }
    /**
     * Iterates over the next siblings of the passed element and
     * returns a string of the text content of each element. Will
     * stop iterating if it encounters a new section element.
     * @param {FormFieldElement} element
     * @returns {string}
     * @private
     */
    createAutofillFieldRightLabel(element) {
        const labelTextContent = [];
        let currentElement = element;
        while (currentElement && currentElement.nextSibling) {
            currentElement = currentElement.nextSibling;
            if (this.isNewSectionElement(currentElement)) {
                break;
            }
            if (this.containsChildField(currentElement)) {
                break;
            }
            const textContent = this.getTextContentFromElement(currentElement);
            if (textContent) {
                labelTextContent.push(textContent);
            }
        }
        return labelTextContent.join("");
    }
    /**
     * Recursively gets the text content from an element's previous siblings
     * and returns a string of the text content of each element.
     * @param {FormFieldElement} element
     * @returns {string}
     * @private
     */
    createAutofillFieldLeftLabel(element) {
        const labelTextContent = this.recursivelyGetTextFromPreviousSiblings(element);
        return labelTextContent.reverse().join("");
    }
    /**
     * Assumes that the input elements that are to be autofilled are within a
     * table structure. Queries the previous sibling of the parent row that
     * the input element is in and returns the text content of the cell that
     * is in the same column as the input element.
     * @param {FormFieldElement} element
     * @returns {string | null}
     * @private
     */
    createAutofillFieldTopLabel(element) {
        var _a, _b;
        const tableDataElement = element.closest("td");
        if (!tableDataElement) {
            return null;
        }
        const tableDataElementIndex = tableDataElement.cellIndex;
        if (tableDataElementIndex < 0) {
            return null;
        }
        const parentSiblingTableRowElement = (_a = tableDataElement.closest("tr")) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
        return ((_b = parentSiblingTableRowElement === null || parentSiblingTableRowElement === void 0 ? void 0 : parentSiblingTableRowElement.cells) === null || _b === void 0 ? void 0 : _b.length) > tableDataElementIndex
            ? this.getTextContentFromElement(parentSiblingTableRowElement.cells[tableDataElementIndex])
            : null;
    }
    /**
     * Checks whether any of an element's descendants are form fields.
     */
    containsChildField(element) {
        if (nodeIsElement(element)) {
            const fields = AutoFillConstants.FieldElements.join(", ");
            return !!element.querySelector(fields);
        }
        else {
            return false;
        }
    }
    /**
     * Check if the element's tag indicates that a transition to a new section of the
     * page is occurring. If so, we should not use the element or its children in order
     * to get autofill context for the previous element.
     * @param {HTMLElement} currentElement
     * @returns {boolean}
     * @private
     */
    isNewSectionElement(currentElement) {
        if (!currentElement) {
            return true;
        }
        const transitionalElementTagsSet = new Set([
            "html",
            "body",
            "button",
            "form",
            "head",
            "iframe",
            "input",
            "option",
            "script",
            "select",
            "table",
            "textarea",
        ]);
        return ("tagName" in currentElement &&
            transitionalElementTagsSet.has(currentElement.tagName.toLowerCase()));
    }
    /**
     * Gets the text content from a passed element, regardless of whether it is a
     * text node, an element node or an HTMLElement.
     * @param {Node | HTMLElement} element
     * @returns {string}
     * @private
     */
    getTextContentFromElement(element) {
        if (element.nodeType === Node.TEXT_NODE) {
            const nodeValue = element.nodeValue;
            if (nodeValue === null) {
                return null;
            }
            return this.trimAndRemoveNonPrintableText(nodeValue);
        }
        const textContentOrInnerText = element.textContent || element.innerText;
        if (textContentOrInnerText === null) {
            return null;
        }
        return this.trimAndRemoveNonPrintableText(textContentOrInnerText);
    }
    /**
     * Removes non-printable characters from the passed text
     * content and trims leading and trailing whitespace.
     * @param {string} textContent
     * @returns {string}
     * @private
     */
    trimAndRemoveNonPrintableText(textContent) {
        return (textContent || "")
            .replace(/\p{C}+|\s+/gu, " ") // Strip out non-printable characters and replace multiple spaces with a single space
            .trim(); // Trim leading and trailing whitespace
    }
    /**
     * Get the text content from the previous siblings of the element. If
     * no text content is found, recursively get the text content from the
     * previous siblings of the parent element.
     * @param {FormFieldElement} element
     * @returns {string[]}
     * @private
     */
    recursivelyGetTextFromPreviousSiblings(element) {
        const textContentItems = [];
        let currentElement = element;
        while (currentElement !== null && currentElement.previousSibling !== null) {
            // Ensure we are capturing text content from nodes and elements.
            currentElement = currentElement.previousSibling;
            if (this.isNewSectionElement(currentElement)) {
                return textContentItems;
            }
            if (this.containsChildField(currentElement)) {
                return textContentItems;
            }
            const textContent = this.getTextContentFromElement(currentElement);
            if (textContent) {
                textContentItems.push(textContent);
            }
        }
        if (currentElement === null || textContentItems.length > 0) {
            return textContentItems;
        }
        // Prioritize capturing text content from elements rather than nodes.
        const parent = currentElement.parentElement !== null
            ? currentElement.parentElement
            : currentElement.parentNode;
        if (parent === null) {
            return textContentItems;
        }
        currentElement = parent;
        let siblingElement = nodeIsElement(currentElement)
            ? currentElement.previousElementSibling
            : currentElement.previousSibling;
        while (siblingElement !== null &&
            siblingElement.lastChild !== null &&
            !this.isNewSectionElement(siblingElement) &&
            !this.containsChildField(siblingElement)) {
            siblingElement = siblingElement.lastChild;
        }
        if (siblingElement === null ||
            this.isNewSectionElement(siblingElement) ||
            this.containsChildField(siblingElement)) {
            return textContentItems;
        }
        const siblingTextContent = this.getTextContentFromElement(siblingElement);
        if (siblingTextContent) {
            textContentItems.push(siblingTextContent);
            return textContentItems;
        }
        return this.recursivelyGetTextFromPreviousSiblings(siblingElement);
    }
    /**
     * Gets the value of the element. If the element is a checkbox, returns a checkmark if the
     * checkbox is checked, or an empty string if it is not checked. If the element is a hidden
     * input, returns the value of the input if it is less than 254 characters, or a truncated
     * value if it is longer than 254 characters.
     * @param {FormFieldElement} element
     * @returns {string}
     * @private
     */
    getElementValue(element) {
        if (!elementIsFillableFormField(element)) {
            const spanTextContent = element.textContent || element.innerText;
            return spanTextContent || "";
        }
        const elementValue = element.value || "";
        const elementType = String(element.type).toLowerCase();
        if ("checked" in element && elementType === "checkbox") {
            return element.checked ? "✓" : "";
        }
        if (elementType === "hidden") {
            const inputValueMaxLength = 254;
            return elementValue.length > inputValueMaxLength
                ? `${elementValue.substring(0, inputValueMaxLength)}...SNIPPED`
                : elementValue;
        }
        return elementValue;
    }
    /**
     * Captures the `data-*` attribute metadata to help with validating the autofill data.
     *
     * @param element - The form field element to capture the `data-*` attribute metadata from
     */
    getDataSetValues(element) {
        let datasetValues = "";
        const dataset = element.dataset;
        for (const key in dataset) {
            datasetValues += `${key}: ${dataset[key]}, `;
        }
        return datasetValues;
    }
    /**
     * Get the options from a select element and return them as an array
     * of arrays indicating the select element option text and value.
     * @param {HTMLSelectElement} element
     * @returns {{options: (string | null)[][]}}
     * @private
     */
    getSelectElementOptions(element) {
        const options = Array.from(element.options).map((option) => {
            const optionText = option.text
                ? String(option.text)
                    .toLowerCase()
                    .replace(/[\s~`!@$%^&#*()\-_+=:;'"[\]|\\,<.>?]/gm, "") // Remove whitespace and punctuation
                : null;
            return [optionText, option.value];
        });
        return { options };
    }
    /**
     * Queries all potential form and field elements from the DOM and returns
     * a collection of form and field elements. Leverages the TreeWalker API
     * to deep query Shadow DOM elements.
     */
    queryAutofillFormAndFieldElements() {
        const formElements = [];
        const formFieldElements = [];
        const queriedElements = this.domQueryService.query(globalThis.document.documentElement, `form, ${this.formFieldQueryString}`, (element) => {
            if (elementIsFormElement(element)) {
                formElements.push(element);
                return true;
            }
            if (this.isElementFormFieldElement(element)) {
                formFieldElements.push(element);
                return true;
            }
            return false;
        }, this.mutationObserver);
        if (formElements.length || formFieldElements.length) {
            return { formElements, formFieldElements };
        }
        for (let index = 0; index < queriedElements.length; index++) {
            const element = queriedElements[index];
            if (elementIsFormElement(element)) {
                formElements.push(element);
                continue;
            }
            if (this.isElementFormFieldElement(element)) {
                formFieldElements.push(element);
            }
        }
        return { formElements, formFieldElements };
    }
    /**
     * Checks if the passed node is a form field element.
     * @param {Element} element the element to check.
     * @returns {boolean} whether the element is a form field element.
     * @private
     */
    isElementFormFieldElement(element) {
        const nodeTagName = element.tagName.toLowerCase();
        const nodeIsSpanElementWithAutofillAttribute = nodeTagName === "span" && element.hasAttribute("data-bwautofill");
        if (nodeIsSpanElementWithAutofillAttribute) {
            return true;
        }
        const nodeHasBwIgnoreAttribute = element.hasAttribute("data-bwignore");
        const nodeIsValidInputElement = nodeTagName === "input" && !this.ignoredInputTypes.has(element.type);
        if (nodeIsValidInputElement && !nodeHasBwIgnoreAttribute) {
            return true;
        }
        return this.nonInputFormFieldTags.has(nodeTagName) && !nodeHasBwIgnoreAttribute;
    }
    get hasPendingWork() {
        return (this.pendingAttributeMutations.size > 0 ||
            this.pendingTopLayerTargets.size > 0 ||
            this.pendingChildListUpdate);
    }
    /**
     * Handles a mutation to the window location. Clears the autofill elements
     * and updates the autofill elements after a timeout.
     * @private
     */
    handleWindowLocationMutation() {
        this.currentLocationHref = globalThis.location.href;
        this.domRecentlyMutated = true;
        if (this.autofillOverlayContentService) {
            this.autofillOverlayContentService.pageDetailsUpdateRequired = true;
            this.autofillOverlayContentService.clearUserFilledFields();
            void this.sendExtensionMessage("closeAutofillInlineMenu", { forceCloseInlineMenu: true });
        }
        this.noFieldsFound = false;
        // Targeting rules are URL-scoped and gated by user/feature state at fetch
        // time; the new URL must re-fetch to pick up rule and gate changes.
        this.pageTargetingRules = undefined;
        this._autofillFormElements.clear();
        this.autofillFieldElements.clear();
        this.autofillFieldsByOpid.clear();
        // Reset shadow root tracking on navigation
        this.domQueryService.resetObservedShadowRoots();
        this.updateAutofillElementsAfterMutation();
    }
    applyAttributeMutation(target, attributeName) {
        if (!target.isConnected) {
            return;
        }
        const form = this._autofillFormElements.get(target);
        if (form) {
            this.updateAutofillFormElementData(attributeName, target, form);
            return;
        }
        const field = this.autofillFieldElements.get(target);
        if (field) {
            this.updateAutofillFieldElementData(attributeName, target, field);
        }
    }
    // One sweep per throttle window; -Infinity start lets the first call always run.
    purgeDetachedNodesIfDue() {
        const now = performance.now();
        if (now - this.lastDetachedPurgeAt < this.detachedPurgeThrottleMs) {
            return;
        }
        this.lastDetachedPurgeAt = now;
        this.purgeDetachedFieldMetadata();
        this.domQueryService.purgeDetachedShadowRoots();
    }
    purgeDetachedFieldMetadata() {
        for (const formElement of this._autofillFormElements.keys()) {
            if (!formElement.isConnected) {
                this._autofillFormElements.delete(formElement);
            }
        }
        for (const fieldElement of this.autofillFieldElements.keys()) {
            if (!fieldElement.isConnected) {
                this.autofillFieldElements.delete(fieldElement);
            }
        }
        for (const [opid, fieldElement] of this.autofillFieldsByOpid) {
            if (!fieldElement.isConnected) {
                this.autofillFieldsByOpid.delete(opid);
            }
        }
    }
    // Flag-only. Callers schedule explicitly so the rebuild funnel stays narrow.
    requirePageDetailsUpdate() {
        this.domRecentlyMutated = true;
        if (this.autofillOverlayContentService) {
            this.autofillOverlayContentService.pageDetailsUpdateRequired = true;
        }
        this.noFieldsFound = false;
    }
    // Edge case: a plain element added empty and given `attachShadow()` later
    // with no further child mutations is dropped here. Rare for autofill content;
    // the next mutation cycle catches it.
    collectAddedShadowRootCandidates(mutations) {
        var _a;
        if (this.pendingMutationAddedElementsOverflowed) {
            return;
        }
        for (const mutation of mutations) {
            for (const node of (_a = mutation.addedNodes) !== null && _a !== void 0 ? _a : []) {
                if (!this.isShadowRootCandidate(node)) {
                    continue;
                }
                this.pendingMutationAddedElements.add(node);
                if (this.pendingMutationAddedElements.size >= this.pendingMutationAddedElementsCap) {
                    this.pendingMutationAddedElementsOverflowed = true;
                    // Release element refs immediately; we won't process them this window.
                    this.pendingMutationAddedElements.clear();
                    return;
                }
            }
        }
    }
    mutationAddsOrRemovesFormField(mutation) {
        return (this.nodeListContainsFormField(mutation.addedNodes) ||
            this.nodeListContainsFormField(mutation.removedNodes));
    }
    nodeListContainsFormField(nodes) {
        if (!nodes) {
            return false;
        }
        for (const node of nodes) {
            if (!nodeIsElement(node)) {
                continue;
            }
            if (node.matches(this.formFieldQueryString) ||
                node.querySelector(this.formFieldQueryString) !== null) {
                return true;
            }
        }
        return false;
    }
    isShadowRootCandidate(node) {
        if (!nodeIsElement(node)) {
            return false;
        }
        if (node.shadowRoot) {
            return true;
        }
        // Custom element — `attachShadow` may run after observation.
        if (node.tagName.includes("-")) {
            return true;
        }
        return node.firstElementChild !== null;
    }
    /**
     * Updates the autofill elements after a DOM mutation has occurred.
     * Uses adaptive debouncing - extends timeout if DOM is "hot" (rapid mutations).
     * This prevents premature collection during loading spinners or SPA transitions.
     * @private
     */
    updateAutofillElementsAfterMutation() {
        if (this.updateAfterMutationIdleCallback !== null) {
            cancelIdleCallbackPolyfill(this.updateAfterMutationIdleCallback);
            this.updateAfterMutationIdleCallback = null;
        }
        const now = Date.now();
        const timeSinceLastMutation = now - this.lastMutationTimestamp;
        this.lastMutationTimestamp = now;
        // Check if mutations are occurring rapidly (DOM is still "hot")
        if (timeSinceLastMutation < this.mutationCooldownMs) {
            this.mutationBurstCount++;
        }
        else {
            this.mutationBurstCount = 0;
        }
        // Calculate adaptive timeout based on mutation frequency
        // If DOM is "hot" (mutations occurring rapidly), extend the wait time
        let adaptiveTimeout = this.updateAfterMutationTimeout;
        if (this.mutationBurstCount > 0) {
            // Extend timeout proportionally to mutation frequency, up to max wait time
            const extensionMs = Math.min(this.mutationBurstCount * this.mutationCooldownMs, this.maxMutationWaitMs - this.updateAfterMutationTimeout);
            adaptiveTimeout = this.updateAfterMutationTimeout + extensionMs;
        }
        this.updateAfterMutationIdleCallback = requestIdleCallbackPolyfill(this.getPageDetails.bind(this), { timeout: adaptiveTimeout });
    }
    /**
     * Updates the autofill form element data based on the passed attribute name.
     * @param {string} attributeName
     * @param {ElementWithOpId<HTMLFormElement>} element
     * @param {AutofillForm} dataTarget
     * @private
     */
    updateAutofillFormElementData(attributeName, element, dataTarget) {
        const updateAttribute = (dataTargetKey) => {
            this.updateAutofillDataAttribute({ element, attributeName, dataTarget, dataTargetKey });
        };
        const updateActions = {
            action: () => {
                const actionUrl = this.getFormActionAttribute(element);
                if (actionUrl !== null) {
                    dataTarget.htmlAction = actionUrl;
                }
            },
            name: () => updateAttribute("htmlName"),
            id: () => updateAttribute("htmlID"),
            // Note: `class` is intentionally omitted — it is excluded from the
            // MutationObserver attributeFilter to avoid callback storms on dynamic pages.
            // htmlClass is refreshed on the next full page-detail collection.
            method: () => updateAttribute("htmlMethod"),
        };
        if (!updateActions[attributeName]) {
            return;
        }
        updateActions[attributeName]();
        if (this._autofillFormElements.has(element)) {
            this._autofillFormElements.set(element, dataTarget);
        }
    }
    /**
     * Updates the autofill field element data based on the passed attribute name.
     *
     * @param {string} attributeName
     * @param {ElementWithOpId<FormFieldElement>} element
     * @param {AutofillField} dataTarget
     */
    updateAutofillFieldElementData(attributeName, element, dataTarget) {
        const updateAttribute = (dataTargetKey) => {
            this.updateAutofillDataAttribute({ element, attributeName, dataTarget, dataTargetKey });
        };
        const updateActions = {
            "aria-describedby": () => updateAttribute(AUTOFILL_ATTRIBUTES.ARIA_DESCRIBEDBY),
            "aria-label": () => updateAttribute("label-aria"),
            "aria-labelledby": () => updateAttribute(AUTOFILL_ATTRIBUTES.ARIA_LABELLEDBY),
            "aria-hidden": () => (dataTarget["aria-hidden"] = this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.ARIA_HIDDEN, true)),
            "aria-disabled": () => (dataTarget["aria-disabled"] = this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.ARIA_DISABLED, true)),
            "aria-haspopup": () => (dataTarget["aria-haspopup"] = this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.ARIA_HASPOPUP, true)),
            autocomplete: () => (dataTarget.autoCompleteType = this.getAutoCompleteAttribute(element)),
            autocompletetype: () => (dataTarget.autoCompleteType = this.getAutoCompleteAttribute(element)),
            "x-autocompletetype": () => (dataTarget.autoCompleteType = this.getAutoCompleteAttribute(element)),
            class: () => updateAttribute("htmlClass"),
            checked: () => (dataTarget.checked = this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.CHECKED)),
            "data-label": () => updateAttribute("label-data"),
            "data-stripe": () => updateAttribute(AUTOFILL_ATTRIBUTES.DATA_STRIPE),
            disabled: () => (dataTarget.disabled = this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.DISABLED)),
            id: () => updateAttribute("htmlID"),
            maxlength: () => (dataTarget.maxLength = this.getAutofillFieldMaxLength(element)),
            name: () => updateAttribute("htmlName"),
            placeholder: () => updateAttribute(AUTOFILL_ATTRIBUTES.PLACEHOLDER),
            readonly: () => (dataTarget.readonly = this.getAttributeBoolean(element, AUTOFILL_ATTRIBUTES.READONLY)),
            rel: () => updateAttribute(AUTOFILL_ATTRIBUTES.REL),
            tabindex: () => updateAttribute(AUTOFILL_ATTRIBUTES.TABINDEX),
            title: () => updateAttribute(AUTOFILL_ATTRIBUTES.TITLE),
            type: () => (dataTarget.type = this.getAttributeLowerCase(element, AUTOFILL_ATTRIBUTES.TYPE)),
        };
        if (!updateActions[attributeName]) {
            return;
        }
        updateActions[attributeName]();
        if (this.autofillFieldElements.has(element)) {
            this.autofillFieldElements.set(element, dataTarget);
        }
    }
    /**
     * Gets the attribute value for the passed element, and returns it. If the dataTarget
     * and dataTargetKey are passed, it will set the value of the dataTarget[dataTargetKey].
     * @param UpdateAutofillDataAttributeParams
     * @returns {string}
     * @private
     */
    updateAutofillDataAttribute({ element, attributeName, dataTarget, dataTargetKey, }) {
        const attributeValue = this.getPropertyOrAttribute(element, attributeName);
        if (dataTarget && dataTargetKey) {
            dataTarget[dataTargetKey] = attributeValue;
        }
        return attributeValue;
    }
    /**
     * Iterates over all cached field elements and sets up the inline menu listeners on each field.
     *
     * @param pageDetails - The page details to use for the inline menu listeners
     */
    setupOverlayListeners(pageDetails) {
        if (this.autofillOverlayContentService) {
            this.autofillFieldElements.forEach((autofillField, formFieldElement) => {
                this.setupOverlayOnField(formFieldElement, autofillField, pageDetails);
            });
        }
    }
    /**
     * Sets up the inline menu listener on the passed field element.
     * Debounced per-element to prevent excessive setup/teardown during rapid DOM changes.
     *
     * @param formFieldElement - The form field element to set up the inline menu listener on
     * @param autofillField - The metadata for the form field
     * @param pageDetails - The page details to use for the inline menu listeners
     */
    setupOverlayOnField(formFieldElement, autofillField, pageDetails) {
        if (!this.autofillOverlayContentService) {
            return;
        }
        // Check if there's already a pending debounce for this element
        const existingTimeout = this.pendingOverlaySetup.get(formFieldElement);
        const shouldExecuteImmediately = !existingTimeout;
        // Cancel any pending setup for this element
        if (existingTimeout) {
            globalThis.clearTimeout(existingTimeout);
        }
        // Execute immediately on first call (leading edge), then debounce subsequent calls
        if (shouldExecuteImmediately) {
            this.executeOverlaySetup(formFieldElement, autofillField, pageDetails);
        }
        // Set up debounce timeout that clears the tracking after the delay
        // This allows the next call after the delay to execute immediately again
        const timeoutId = globalThis.setTimeout(() => {
            this.pendingOverlaySetup.delete(formFieldElement);
        }, this.overlaySetupDelayMs);
        this.pendingOverlaySetup.set(formFieldElement, timeoutId);
    }
    /**
     * Executes the overlay setup for a form field element.
     *
     * @param formFieldElement - The form field element to set up the inline menu listener on
     * @param autofillField - The metadata for the form field
     * @param pageDetails - The page details to use for the inline menu listeners
     */
    executeOverlaySetup(formFieldElement, autofillField, pageDetails) {
        // Verify the field is still in the DOM and cached before setup
        if (!formFieldElement.isConnected ||
            !this.autofillFieldElements.has(formFieldElement) ||
            !this.autofillOverlayContentService) {
            return;
        }
        const autofillPageDetails = pageDetails ||
            this.getFormattedPageDetails(this.getFormattedAutofillFormsData(), this.getFormattedAutofillFieldsData());
        void this.autofillOverlayContentService.setupOverlayListeners(formFieldElement, autofillField, autofillPageDetails);
    }
    /**
     * Validates whether a password field is within the document.
     */
    isPasswordFieldWithinDocument() {
        var _a;
        return (((_a = this.domQueryService.query(globalThis.document.documentElement, `input[type="password"]`, (element) => elementIsInputElement(element) && element.type === "password")) === null || _a === void 0 ? void 0 : _a.length) > 0);
    }
}

;// ./src/autofill/models/autofill-script.ts
const FillScriptActionTypes = {
    fill_by_opid: "fill_by_opid",
    click_on_opid: "click_on_opid",
    focus_by_opid: "focus_by_opid",
};
class AutofillScript {
    constructor() {
        this.script = [];
        this.properties = {};
    }
}

;// ./src/autofill/services/insert-autofill-content.service.ts
var insert_autofill_content_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class InsertAutofillContentService {
    /**
     * InsertAutofillContentService constructor. Instantiates the
     * DomElementVisibilityService and CollectAutofillContentService classes.
     */
    constructor(domElementVisibilityService, collectAutofillContentService) {
        this.domElementVisibilityService = domElementVisibilityService;
        this.collectAutofillContentService = collectAutofillContentService;
        this.autofillInsertActions = {
            fill_by_opid: ({ opid, value }) => this.handleFillFieldByOpidAction(opid, value),
            click_on_opid: ({ opid }) => this.handleClickOnFieldByOpidAction(opid),
            focus_by_opid: ({ opid }) => this.handleFocusOnFieldByOpidAction(opid),
        };
        this.showAnimations = true;
        /**
         * Runs the autofill action based on the action type and the opid.
         * Each action is subsequently delayed by 20 milliseconds.
         * @param {FillScript} [action, opid, value]
         * @returns {Promise<void>}
         * @private
         */
        this.runFillScriptAction = ([action, opid, value]) => {
            if (!opid || !this.autofillInsertActions[action]) {
                return Promise.resolve();
            }
            const delayActionsInMilliseconds = 20;
            return new Promise((resolve) => setTimeout(() => {
                if (action === FillScriptActionTypes.fill_by_opid && !!(value === null || value === void 0 ? void 0 : value.length)) {
                    this.autofillInsertActions.fill_by_opid({ opid, value });
                }
                else if (action === FillScriptActionTypes.click_on_opid) {
                    this.autofillInsertActions.click_on_opid({ opid });
                }
                else if (action === FillScriptActionTypes.focus_by_opid) {
                    this.autofillInsertActions.focus_by_opid({ opid });
                }
                resolve();
            }, delayActionsInMilliseconds));
        };
    }
    /**
     * Handles autofill of the forms on the current page based on the
     * data within the passed fill script object.
     * @param {AutofillScript} fillScript
     * @param {boolean} showAnimations
     * @returns {Promise<void>}
     * @public
     */
    fillForm(fillScript_1) {
        return insert_autofill_content_service_awaiter(this, arguments, void 0, function* (fillScript, showAnimations = true) {
            var _a;
            this.showAnimations = showAnimations;
            if (!((_a = fillScript.script) === null || _a === void 0 ? void 0 : _a.length) ||
                currentlyInSandboxedIframe() ||
                this.userCancelledInsecureUrlAutofill(fillScript.savedUrls) ||
                this.userCancelledUntrustedIframeAutofill(fillScript)) {
                return;
            }
            for (let index = 0; index < fillScript.script.length; index++) {
                yield this.runFillScriptAction(fillScript.script[index]);
            }
        });
    }
    /**
     * Checks if the autofill is occurring on a page that can be considered secure. If the page is not secure,
     * the user is prompted to confirm that they want to autofill on the page.
     * @param {string[] | null} savedUrls
     * @returns {boolean}
     * @private
     */
    userCancelledInsecureUrlAutofill(savedUrls) {
        if (!(savedUrls === null || savedUrls === void 0 ? void 0 : savedUrls.some((url) => url.startsWith(`https://${globalThis.location.hostname}`))) ||
            globalThis.location.protocol !== "http:" ||
            !this.isPasswordFieldWithinDocument()) {
            return false;
        }
        const confirmationWarning = [
            chrome.i18n.getMessage("insecurePageWarning"),
            chrome.i18n.getMessage("insecurePageWarningFillPrompt", [globalThis.location.hostname]),
        ].join("\n\n");
        return !globalThis.confirm(confirmationWarning);
    }
    /**
     * Checks if there is a password field within the current document. Includes
     * password fields that are present within the shadow DOM.
     * @returns {boolean}
     * @private
     */
    isPasswordFieldWithinDocument() {
        return this.collectAutofillContentService.isPasswordFieldWithinDocument();
    }
    /**
     * Checking if the autofill is occurring within an untrusted iframe. If the page is within an untrusted iframe,
     * the user is prompted to confirm that they want to autofill on the page. If the user cancels the autofill,
     * the script will not continue.
     *
     * Note: confirm() is blocked by sandboxed iframes, but we don't want to fill sandboxed iframes anyway.
     * If this occurs, confirm() returns false without displaying the dialog box, and autofill will be aborted.
     * The browser may print a message to the console, but this is not a standard error that we can handle.
     * @param {AutofillScript} fillScript
     * @returns {boolean}
     * @private
     */
    userCancelledUntrustedIframeAutofill(fillScript) {
        if (!fillScript.untrustedIframe) {
            return false;
        }
        const confirmationWarning = [
            chrome.i18n.getMessage("autofillIframeWarning"),
            chrome.i18n.getMessage("autofillIframeWarningTip", [globalThis.location.hostname]),
        ].join("\n\n");
        return !globalThis.confirm(confirmationWarning);
    }
    /**
     * Queries the DOM for an element by opid and inserts the passed value into the element.
     * @param {string} opid
     * @param {string} value
     * @private
     */
    handleFillFieldByOpidAction(opid, value) {
        const element = this.collectAutofillContentService.getAutofillFieldElementByOpid(opid);
        this.insertValueIntoField(element, value);
    }
    /**
     * Handles finding an element by opid and triggering a click event on the element.
     * @param {string} opid
     * @private
     */
    handleClickOnFieldByOpidAction(opid) {
        const element = this.collectAutofillContentService.getAutofillFieldElementByOpid(opid);
        if (element) {
            this.triggerClickOnElement(element);
        }
    }
    /**
     * Handles finding an element by opid and triggering click and focus events on the element.
     * To ensure that we trigger a blur event correctly on a filled field, we first check if the
     * element is already focused. If it is, we blur the element before focusing on it again.
     *
     * @param {string} opid - The opid of the element to focus on.
     */
    handleFocusOnFieldByOpidAction(opid) {
        const element = this.collectAutofillContentService.getAutofillFieldElementByOpid(opid);
        if (!element) {
            return;
        }
        if (document.activeElement === element) {
            element.blur();
        }
        this.simulateUserMouseClickAndFocusEventInteractions(element, true);
    }
    /**
     * Identifies the type of element passed and inserts the value into the element.
     * Will trigger simulated events on the element to ensure that the element is
     * properly updated.
     * @param {FormFieldElement | null} element
     * @param {string} value
     * @private
     */
    insertValueIntoField(element, value) {
        if (!element || !value) {
            return;
        }
        const elementValue = (element === null || element === void 0 ? void 0 : element.value) || (element === null || element === void 0 ? void 0 : element.innerText) || "";
        const elementAlreadyHasTheValue = !!((elementValue === null || elementValue === void 0 ? void 0 : elementValue.length) && elementValue === value);
        if (elementAlreadyHasTheValue || isReadonlyOrDisabledFormFieldElement(element)) {
            return;
        }
        if (!elementIsFillableFormField(element)) {
            this.handleInsertValueAndTriggerSimulatedEvents(element, () => (element.innerText = value));
            return;
        }
        const isFillableCheckboxOrRadioElement = elementIsInputElement(element) &&
            new Set(["checkbox", "radio"]).has(element.type) &&
            new Set(["true", "y", "1", "yes", "✓"]).has(String(value).toLowerCase());
        if (isFillableCheckboxOrRadioElement) {
            this.handleInsertValueAndTriggerSimulatedEvents(element, () => (element.checked = true));
            return;
        }
        this.handleInsertValueAndTriggerSimulatedEvents(element, () => (element.value = value));
    }
    /**
     * Simulates pre- and post-insert events on the element meant to mimic user interactions
     * while inserting the autofill value into the element.
     * @param {FormFieldElement} element
     * @param {Function} valueChangeCallback
     * @private
     */
    handleInsertValueAndTriggerSimulatedEvents(element, valueChangeCallback) {
        this.triggerPreInsertEventsOnElement(element);
        valueChangeCallback();
        this.triggerPostInsertEventsOnElement(element);
        this.triggerFillAnimationOnElement(element);
    }
    /**
     * Simulates a mouse click event on the element, including focusing the event, and
     * the triggers a simulated keyboard event on the element. Will attempt to ensure
     * that the initial element value is not arbitrarily changed by the simulated events.
     * @param {FormFieldElement} element
     * @private
     */
    triggerPreInsertEventsOnElement(element) {
        const initialElementValue = "value" in element ? element.value : "";
        this.simulateUserMouseClickAndFocusEventInteractions(element);
        this.simulateUserKeyboardEventInteractions(element);
        if ("value" in element && initialElementValue !== element.value) {
            element.value = initialElementValue;
        }
    }
    /**
     * Simulates a keyboard event on the element before assigning the autofilled value to the element, and then
     * simulates an input change event on the element to trigger expected events after autofill occurs.
     * @param {FormFieldElement} element
     * @private
     */
    triggerPostInsertEventsOnElement(element) {
        const autofilledValue = "value" in element ? element.value : "";
        this.simulateUserKeyboardEventInteractions(element);
        if ("value" in element && autofilledValue !== element.value) {
            element.value = autofilledValue;
        }
        this.simulateInputElementChangedEvent(element);
    }
    /**
     * Identifies if a passed element can be animated and sets a class on the element
     * to trigger a CSS animation. The animation is removed after a short delay.
     * @param {FormFieldElement} element
     * @private
     */
    triggerFillAnimationOnElement(element) {
        if (!this.showAnimations) {
            return;
        }
        const skipAnimatingElement = elementIsFillableFormField(element) &&
            !new Set(["email", "text", "password", "number", "tel", "url"]).has(element === null || element === void 0 ? void 0 : element.type);
        if (this.domElementVisibilityService.isElementHiddenByCss(element) || skipAnimatingElement) {
            return;
        }
        element.classList.add("com-bitwarden-browser-animated-fill");
        setTimeout(() => element.classList.remove("com-bitwarden-browser-animated-fill"), 200);
    }
    /**
     * Simulates a click  event on the element.
     * @param {HTMLElement} element
     * @private
     */
    triggerClickOnElement(element) {
        if (!element || typeof element.click !== TYPE_CHECK.FUNCTION) {
            return;
        }
        element.click();
    }
    /**
     * Simulates a focus event on the element. Will optionally reset the value of the element
     * if the element has a value property.
     * @param {HTMLElement | undefined} element
     * @param {boolean} shouldResetValue
     * @private
     */
    triggerFocusOnElement(element, shouldResetValue = false) {
        if (!element || typeof element.focus !== TYPE_CHECK.FUNCTION) {
            return;
        }
        let initialValue = "";
        if (shouldResetValue && "value" in element) {
            initialValue = String(element.value);
        }
        element.focus();
        if (initialValue && "value" in element) {
            element.value = initialValue;
        }
    }
    /**
     * Simulates a mouse click and focus event on the element.
     * @param {FormFieldElement} element
     * @param {boolean} shouldResetValue
     * @private
     */
    simulateUserMouseClickAndFocusEventInteractions(element, shouldResetValue = false) {
        this.triggerClickOnElement(element);
        this.triggerFocusOnElement(element, shouldResetValue);
    }
    /**
     * Simulates several keyboard events on the element, mocking a user interaction with the element.
     * @param {FormFieldElement} element
     * @private
     */
    simulateUserKeyboardEventInteractions(element) {
        const simulatedKeyboardEvents = [EVENTS.KEYDOWN, EVENTS.KEYUP];
        for (let index = 0; index < simulatedKeyboardEvents.length; index++) {
            element.dispatchEvent(new KeyboardEvent(simulatedKeyboardEvents[index], { bubbles: true }));
        }
    }
    /**
     * Simulates an input change event on the element, mocking behavior that would occur if a user
     * manually changed a value for the element.
     * @param {FormFieldElement} element
     * @private
     */
    simulateInputElementChangedEvent(element) {
        const simulatedInputEvents = [EVENTS.INPUT, EVENTS.CHANGE];
        for (let index = 0; index < simulatedInputEvents.length; index++) {
            element.dispatchEvent(new Event(simulatedInputEvents[index], { bubbles: true }));
        }
    }
}
/* harmony default export */ var insert_autofill_content_service = (InsertAutofillContentService);

;// ./src/autofill/utils/event-security.ts
/**
 * Event security utilities for validating trusted events
 */
class EventSecurity {
    /**
     * Validates that an event is trusted (originated from user agent)
     * @param event - The event to validate
     * @returns true if the event is trusted, false otherwise
     */
    static isEventTrusted(event) {
        return event.isTrusted;
    }
}

;// ./src/autofill/content/autofill-init.ts
var autofill_init_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class AutofillInit {
    /**
     * AutofillInit constructor. Initializes the DomElementVisibilityService,
     * CollectAutofillContentService and InsertAutofillContentService classes.
     *
     * @param domQueryService - Service used to handle DOM queries.
     * @param domElementVisibilityService - Used to check if an element is viewable.
     * @param autofillOverlayContentService - The autofill overlay content service, potentially undefined.
     * @param autofillInlineMenuContentService - The inline menu content service, potentially undefined.
     * @param overlayNotificationsContentService - The overlay notifications content service, potentially undefined.
     */
    constructor(domQueryService, domElementVisibilityService, autofillOverlayContentService, autofillInlineMenuContentService, overlayNotificationsContentService) {
        this.autofillOverlayContentService = autofillOverlayContentService;
        this.autofillInlineMenuContentService = autofillInlineMenuContentService;
        this.overlayNotificationsContentService = overlayNotificationsContentService;
        this.sendExtensionMessage = sendExtensionMessage;
        this.lastContextMenuClickedElement = null;
        this.isMonitoring = false;
        this.extensionMessageHandlers = {
            collectPageDetails: ({ message }) => this.isMonitoring ? this.collectPageDetails(message) : undefined,
            collectPageDetailsImmediately: ({ message }) => this.isMonitoring ? this.collectPageDetails(message, true) : undefined,
            collectAutofillTriage: () => this.isMonitoring ? this.collectPageDetailsForContextMenu() : undefined,
            fillForm: ({ message }) => (this.isMonitoring ? this.fillForm(message) : undefined),
            applyTargetedFields: ({ message }) => this.isMonitoring ? this.applyTargetedFields(message) : undefined,
            clearTargetingRulesCache: () => this.handleClearTargetingRulesCache(),
            startAutofillMonitors: () => this.startMonitoring(),
            stopAutofillMonitors: () => this.stopMonitoring(),
        };
        /**
         * Sends a message to collect page details after a short delay.
         */
        this.sendCollectDetailsMessage = () => {
            this.clearCollectPageDetailsOnLoadTimeout();
            this.collectPageDetailsOnLoadTimeout = setTimeout(() => this.sendExtensionMessage("bgCollectPageDetails", { sender: "autofillInit" }), 750);
        };
        /**
         * Saves a local copy of the last element that was clicked to create the context menu.
         * @param event - The mouse click event.
         */
        this.handleContextMenuClick = (event) => {
            if (EventSecurity.isEventTrusted(event)) {
                this.lastContextMenuClickedElement = event.target;
            }
        };
        /**
         * Handles the extension messages sent to the content script.
         *
         * @param message - The extension message.
         * @param sender - The message sender.
         * @param sendResponse - The send response callback.
         */
        this.handleExtensionMessage = (message, sender, sendResponse) => {
            const command = message.command;
            const handler = this.getExtensionMessageHandler(command);
            if (!handler) {
                return null;
            }
            const messageResponse = handler({ message, sender });
            if (typeof messageResponse === "undefined") {
                return null;
            }
            void Promise.resolve(messageResponse).then((response) => sendResponse(response));
            return true;
        };
        this.collectAutofillContentService = new CollectAutofillContentService(domElementVisibilityService, domQueryService, this.autofillOverlayContentService);
        this.insertAutofillContentService = new insert_autofill_content_service(domElementVisibilityService, this.collectAutofillContentService);
    }
    /**
     * Initializes the autofill content script, setting up
     * the extension message listeners. This method should
     * be called once when the content script is loaded.
     */
    init() {
        this.setupExtensionMessageListeners();
    }
    /**
     * Attaches monitoring-scoped listeners (contextmenu, LOAD) and fans
     * out to each sub-monitor. Idempotent.
     */
    startMonitoring() {
        var _a, _b;
        if (this.isMonitoring) {
            return;
        }
        this.isMonitoring = true;
        // Start sub-monitors first so any page-details collection triggered
        // by this controller below sees a fully wired-up service graph.
        this.collectAutofillContentService.startMonitoring();
        (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.startMonitoring();
        (_b = this.autofillInlineMenuContentService) === null || _b === void 0 ? void 0 : _b.startMonitoring();
        this.collectPageDetailsOnLoad();
    }
    /**
     * Detaches monitoring-scoped listeners, cancels the LOAD timeout,
     * and fans out to each sub-monitor. Idempotent.
     */
    stopMonitoring() {
        var _a, _b;
        this.isMonitoring = false;
        this.clearCollectPageDetailsOnLoadTimeout();
        globalThis.removeEventListener(EVENTS.LOAD, this.sendCollectDetailsMessage);
        this.collectAutofillContentService.stopMonitoring();
        (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.stopMonitoring();
        (_b = this.autofillInlineMenuContentService) === null || _b === void 0 ? void 0 : _b.stopMonitoring();
    }
    /**
     * Triggers a collection of the page details from the
     * background script, ensuring that autofill is ready
     * to act on the page.
     */
    collectPageDetailsOnLoad() {
        if (globalThis.document.readyState === "complete") {
            this.sendCollectDetailsMessage();
        }
        globalThis.addEventListener(EVENTS.LOAD, this.sendCollectDetailsMessage);
    }
    /**
     * Collects the page details and sends them to the
     * extension background script. If the `sendDetailsInResponse`
     * parameter is set to true, the page details will be
     * returned to facilitate sending the details in the
     * response to the extension message.
     *
     * @param message - The extension message.
     * @param sendDetailsInResponse - Determines whether to send the details in the response.
     */
    collectPageDetails(message_1) {
        return autofill_init_awaiter(this, arguments, void 0, function* (message, sendDetailsInResponse = false) {
            const pageDetails = yield this.collectAutofillContentService.getPageDetails();
            if (sendDetailsInResponse) {
                return pageDetails;
            }
            void this.sendExtensionMessage("collectPageDetailsResponse", {
                tab: message.tab,
                details: pageDetails,
                sender: message.sender,
            });
        });
    }
    /**
     * Collects page details and returns them directly in the response for autofill triage.
     */
    collectPageDetailsForContextMenu() {
        return autofill_init_awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const pageDetails = yield this.collectAutofillContentService.getPageDetails();
            let targetFieldRef;
            const el = this.lastContextMenuClickedElement;
            if (el) {
                const htmlId = el.id;
                const htmlName = el instanceof HTMLInputElement ? el.name : undefined;
                const match = pageDetails.fields.find((f) => (htmlId && f.htmlID === htmlId) || (htmlName && f.htmlName === htmlName));
                targetFieldRef = (_b = (_a = match === null || match === void 0 ? void 0 : match.htmlID) !== null && _a !== void 0 ? _a : match === null || match === void 0 ? void 0 : match.htmlName) !== null && _b !== void 0 ? _b : undefined;
            }
            return { pageDetails, targetFieldRef };
        });
    }
    /**
     * Fills the form with the given fill script.
     *
     * @param {AutofillExtensionMessage} message
     */
    fillForm(_a) {
        return autofill_init_awaiter(this, arguments, void 0, function* ({ fillScript, pageDetailsUrl, showAnimations }) {
            if ((document.defaultView || window).location.href !== pageDetailsUrl || !fillScript) {
                return;
            }
            this.blurFocusedFieldAndCloseInlineMenu();
            yield this.sendExtensionMessage("updateIsFieldCurrentlyFilling", {
                isFieldCurrentlyFilling: true,
            });
            yield this.insertAutofillContentService.fillForm(fillScript, showAnimations !== null && showAnimations !== void 0 ? showAnimations : true);
            setTimeout(() => this.sendExtensionMessage("updateIsFieldCurrentlyFilling", {
                isFieldCurrentlyFilling: false,
            }), 250);
        });
    }
    /**
     * Applies targeted fields dispatched from the background for this frame.
     * Called when the top-level frame has detected that a targeting rule crosses
     * into this iframe and has routed the inner selectors here.
     *
     * @param message - The extension message containing iframe targeted fields.
     */
    applyTargetedFields(message) {
        var _a;
        return this.collectAutofillContentService.applyExternalTargetedFields((_a = message.iframeTargetedFields) !== null && _a !== void 0 ? _a : []);
    }
    /**
     * Drops cached targeting rules in this frame and re-collects page details so
     * the background's `pageDetailsForTab` is repopulated with the new strategy.
     */
    handleClearTargetingRulesCache() {
        this.collectAutofillContentService.clearCachedTargetingRules();
        void this.collectPageDetails({ command: "collectPageDetails", sender: "autofillInit" });
    }
    /**
     * Blurs the most recently focused field and removes the inline menu. Used
     * in cases where the background unlock or vault item reprompt popout
     * is opened.
     */
    blurFocusedFieldAndCloseInlineMenu() {
        var _a;
        (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.blurMostRecentlyFocusedField(true);
    }
    /**
     * Clears the send collect details message timeout.
     */
    clearCollectPageDetailsOnLoadTimeout() {
        if (this.collectPageDetailsOnLoadTimeout) {
            clearTimeout(this.collectPageDetailsOnLoadTimeout);
        }
    }
    /**
     * Sets up the extension message listeners for the content script.
     */
    setupExtensionMessageListeners() {
        chrome.runtime.onMessage.addListener(this.handleExtensionMessage);
        globalThis.document.addEventListener("contextmenu", this.handleContextMenuClick);
    }
    /**
     * Gets the extension message handler for the given command.
     *
     * @param command - The extension message command.
     */
    getExtensionMessageHandler(command) {
        var _a, _b, _c, _d, _e, _f;
        if ((_b = (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b[command]) {
            return this.autofillOverlayContentService.messageHandlers[command];
        }
        if ((_d = (_c = this.autofillInlineMenuContentService) === null || _c === void 0 ? void 0 : _c.messageHandlers) === null || _d === void 0 ? void 0 : _d[command]) {
            return this.autofillInlineMenuContentService.messageHandlers[command];
        }
        if ((_f = (_e = this.overlayNotificationsContentService) === null || _e === void 0 ? void 0 : _e.messageHandlers) === null || _f === void 0 ? void 0 : _f[command]) {
            return this.overlayNotificationsContentService.messageHandlers[command];
        }
        return this.extensionMessageHandlers[command];
    }
    /**
     * Handles destroying the autofill init content script. Removes all
     * listeners, timeouts, and object instances to prevent memory leaks.
     */
    destroy() {
        var _a, _b, _c;
        this.stopMonitoring();
        globalThis.document.removeEventListener("contextmenu", this.handleContextMenuClick);
        chrome.runtime.onMessage.removeListener(this.handleExtensionMessage);
        this.lastContextMenuClickedElement = null;
        (_a = this.autofillOverlayContentService) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.autofillInlineMenuContentService) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.overlayNotificationsContentService) === null || _c === void 0 ? void 0 : _c.destroy();
    }
}
/* harmony default export */ var autofill_init = (AutofillInit);

;// ./src/autofill/content/bootstrap-autofill.ts




(function (windowContext) {
    if (!windowContext.bitwardenAutofillInit) {
        const domQueryService = new DomQueryService();
        const domElementVisibilityService = new dom_element_visibility_service();
        windowContext.bitwardenAutofillInit = new autofill_init(domQueryService, domElementVisibilityService);
        setupAutofillInitDisconnectAction(windowContext);
        windowContext.bitwardenAutofillInit.init();
    }
})(window);

/******/ })()
;