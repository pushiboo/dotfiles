/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

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


;// ./src/autofill/enums/autofill-port.enum.ts
const AutofillPort = {
    InjectedScript: "autofill-injected-script-port",
};


;// ./src/autofill/utils/index.ts
/* unused harmony import specifier */ var utils_AUTOFILL_ATTRIBUTES;
/* unused harmony import specifier */ var utils_AutofillPort;
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
    return __awaiter(this, arguments, void 0, function* (command, options = {}) {
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
    const port = chrome.runtime.connect({ name: utils_AutofillPort.InjectedScript });
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
    return (getAttributeBoolean(formFieldElement, utils_AUTOFILL_ATTRIBUTES.DISABLED) ||
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

;// ../../libs/common/src/platform/services/fido2/fido2-utils.ts
// @ts-strict-ignore
class Fido2Utils {
    static createResultToJson(result) {
        return {
            id: result.credentialId,
            rawId: result.credentialId,
            response: {
                clientDataJSON: result.clientDataJSON,
                authenticatorData: result.authData,
                transports: result.transports,
                publicKey: result.publicKey,
                publicKeyAlgorithm: result.publicKeyAlgorithm,
                attestationObject: result.attestationObject,
            },
            authenticatorAttachment: "platform",
            clientExtensionResults: result.extensions,
            type: "public-key",
        };
    }
    static getResultToJson(result) {
        return {
            id: result.credentialId,
            rawId: result.credentialId,
            response: {
                clientDataJSON: result.clientDataJSON,
                authenticatorData: result.authenticatorData,
                signature: result.signature,
                userHandle: result.userHandle,
            },
            authenticatorAttachment: "platform",
            clientExtensionResults: {},
            type: "public-key",
        };
    }
    static arrayToString(array) {
        return Fido2Utils.fromBufferToB64(Fido2Utils.bufferSourceToUint8Array(array))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    }
    static stringToArray(str) {
        return Fido2Utils.fromB64ToArray(Fido2Utils.fromUrlB64ToB64(str));
    }
    static bufferSourceToUint8Array(bufferSource) {
        if (Fido2Utils.isArrayBuffer(bufferSource)) {
            return new Uint8Array(bufferSource);
        }
        else {
            return new Uint8Array(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength);
        }
    }
    /** Utility function to identify type of bufferSource. Necessary because of differences between runtimes */
    static isArrayBuffer(bufferSource) {
        return bufferSource instanceof ArrayBuffer || bufferSource.buffer === undefined;
    }
    static fromB64toUrlB64(b64Str) {
        return b64Str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    static fromBufferToB64(buffer) {
        if (buffer == null) {
            return null;
        }
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return globalThis.btoa(binary);
    }
    static fromB64ToArray(str) {
        if (str == null) {
            return null;
        }
        const binaryString = globalThis.atob(str);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
    static fromUrlB64ToB64(urlB64Str) {
        let output = urlB64Str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += "==";
                break;
            case 3:
                output += "=";
                break;
            default:
                throw new Error("Illegal base64url string!");
        }
        return output;
    }
    /**
     * This methods returns true if a cipher either has no passkeys, or has a passkey matching with userHandle
     * @param userHandle
     */
    static cipherHasNoOtherPasskeys(cipher, userHandle) {
        if (cipher.login.fido2Credentials == null || cipher.login.fido2Credentials.length === 0) {
            return true;
        }
        return cipher.login.fido2Credentials.some((passkey) => passkey.userHandle === userHandle);
    }
}

;// ./src/autofill/fido2/utils/webauthn-utils.ts

class WebauthnUtils {
    static mapCredentialCreationOptions(options, fallbackSupported) {
        var _a, _b, _c, _d, _e;
        const keyOptions = options.publicKey;
        if (keyOptions == undefined) {
            throw new Error("Public-key options not found");
        }
        return {
            attestation: keyOptions.attestation,
            authenticatorSelection: {
                requireResidentKey: (_a = keyOptions.authenticatorSelection) === null || _a === void 0 ? void 0 : _a.requireResidentKey,
                residentKey: (_b = keyOptions.authenticatorSelection) === null || _b === void 0 ? void 0 : _b.residentKey,
                userVerification: (_c = keyOptions.authenticatorSelection) === null || _c === void 0 ? void 0 : _c.userVerification,
            },
            challenge: Fido2Utils.arrayToString(Fido2Utils.bufferSourceToUint8Array(keyOptions.challenge)),
            excludeCredentials: (_d = keyOptions.excludeCredentials) === null || _d === void 0 ? void 0 : _d.map((credential) => ({
                id: Fido2Utils.arrayToString(Fido2Utils.bufferSourceToUint8Array(credential.id)),
                transports: credential.transports,
                type: credential.type,
            })),
            extensions: {
                credProps: (_e = keyOptions.extensions) === null || _e === void 0 ? void 0 : _e.credProps,
            },
            pubKeyCredParams: keyOptions.pubKeyCredParams
                .map((params) => ({
                // Fix for spec-deviation: Sites using KeycloakJS send `kp.alg` as a string
                alg: Number(params.alg),
                type: params.type,
            }))
                .filter((params) => !isNaN(params.alg)),
            rp: {
                id: keyOptions.rp.id,
                name: keyOptions.rp.name,
            },
            user: {
                id: Fido2Utils.arrayToString(Fido2Utils.bufferSourceToUint8Array(keyOptions.user.id)),
                displayName: keyOptions.user.displayName,
                name: keyOptions.user.name,
            },
            timeout: keyOptions.timeout,
            fallbackSupported,
        };
    }
    static mapCredentialRegistrationResult(result) {
        const credential = {
            id: result.credentialId,
            rawId: Fido2Utils.stringToArray(result.credentialId).buffer,
            type: "public-key",
            authenticatorAttachment: "platform",
            response: {
                clientDataJSON: Fido2Utils.stringToArray(result.clientDataJSON).buffer,
                attestationObject: Fido2Utils.stringToArray(result.attestationObject).buffer,
                getAuthenticatorData() {
                    return Fido2Utils.stringToArray(result.authData).buffer;
                },
                getPublicKey() {
                    return Fido2Utils.stringToArray(result.publicKey).buffer;
                },
                getPublicKeyAlgorithm() {
                    return result.publicKeyAlgorithm;
                },
                getTransports() {
                    return result.transports;
                },
            },
            getClientExtensionResults: () => ({
                credProps: result.extensions.credProps,
            }),
            toJSON: () => Fido2Utils.createResultToJson(result),
        };
        // Modify prototype chains to fix `instanceof` calls.
        // This makes these objects indistinguishable from the native classes.
        // Unfortunately PublicKeyCredential does not have a javascript constructor so `extends` does not work here.
        Object.setPrototypeOf(credential.response, AuthenticatorAttestationResponse.prototype);
        Object.setPrototypeOf(credential, PublicKeyCredential.prototype);
        return credential;
    }
    static mapCredentialRequestOptions(options, fallbackSupported) {
        var _a, _b;
        const keyOptions = options.publicKey;
        if (keyOptions == undefined) {
            throw new Error("Public-key options not found");
        }
        return {
            allowedCredentials: (_b = (_a = keyOptions.allowCredentials) === null || _a === void 0 ? void 0 : _a.map((c) => {
                var _a;
                return ({
                    id: Fido2Utils.arrayToString(Fido2Utils.bufferSourceToUint8Array(c.id)),
                    transports: (_a = c.transports) !== null && _a !== void 0 ? _a : [],
                });
            })) !== null && _b !== void 0 ? _b : [],
            challenge: Fido2Utils.arrayToString(Fido2Utils.bufferSourceToUint8Array(keyOptions.challenge)),
            rpId: keyOptions.rpId,
            userVerification: keyOptions.userVerification,
            timeout: keyOptions.timeout,
            mediation: options.mediation,
            fallbackSupported,
        };
    }
    static mapCredentialAssertResult(result) {
        const credential = {
            id: result.credentialId,
            rawId: Fido2Utils.stringToArray(result.credentialId).buffer,
            type: "public-key",
            response: {
                authenticatorData: Fido2Utils.stringToArray(result.authenticatorData).buffer,
                clientDataJSON: Fido2Utils.stringToArray(result.clientDataJSON).buffer,
                signature: Fido2Utils.stringToArray(result.signature).buffer,
                userHandle: Fido2Utils.stringToArray(result.userHandle).buffer,
            },
            getClientExtensionResults: () => ({}),
            authenticatorAttachment: "platform",
            toJSON: () => Fido2Utils.getResultToJson(result),
        };
        // Modify prototype chains to fix `instanceof` calls.
        // This makes these objects indistinguishable from the native classes.
        // Unfortunately PublicKeyCredential does not have a javascript constructor so `extends` does not work here.
        Object.setPrototypeOf(credential.response, AuthenticatorAssertionResponse.prototype);
        Object.setPrototypeOf(credential, PublicKeyCredential.prototype);
        return credential;
    }
}

;// ./src/autofill/fido2/content/messaging/message.ts
const MessageTypes = {
    CredentialCreationRequest: 0,
    CredentialCreationResponse: 1,
    CredentialGetRequest: 2,
    CredentialGetResponse: 3,
    AbortRequest: 4,
    DisconnectRequest: 5,
    ReconnectRequest: 6,
    AbortResponse: 7,
    ErrorResponse: 8,
};

;// ./src/autofill/fido2/content/messaging/messenger.ts
var messenger_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const SENDER = "bitwarden-webauthn";
/**
 * A class that handles communication between the page and content script. It converts
 * the browser's broadcasting API into a request/response API with support for seamlessly
 * handling aborts and exceptions across separate execution contexts.
 */
class Messenger {
    /**
     * Creates a messenger that uses the browser's `window.postMessage` API to initiate
     * requests in the content script. Every request will then create it's own
     * `MessageChannel` through which all subsequent communication will be sent through.
     *
     * @param window the window object to use for communication
     * @returns a `Messenger` instance
     */
    static forDOMCommunication(window) {
        const windowOrigin = window.location.origin;
        return new Messenger({
            postMessage: (message, port) => window.postMessage(message, windowOrigin, [port]),
            addEventListener: (listener) => window.addEventListener("message", listener),
            removeEventListener: (listener) => window.removeEventListener("message", listener),
        });
    }
    constructor(broadcastChannel) {
        this.broadcastChannel = broadcastChannel;
        this.messageEventListener = null;
        this.onDestroy = new EventTarget();
        this.messengerId = this.generateUniqueId();
        this.messageEventListener = this.createMessageEventListener();
        this.broadcastChannel.addEventListener(this.messageEventListener);
    }
    /**
     * Sends a request to the content script and returns the response.
     * AbortController signals will be forwarded to the content script.
     *
     * @param request data to send to the content script
     * @param abortSignal the abort controller that might be used to abort the request
     * @returns the response from the content script
     */
    request(request, abortSignal) {
        return messenger_awaiter(this, void 0, void 0, function* () {
            const requestChannel = new MessageChannel();
            const { port1: localPort, port2: remotePort } = requestChannel;
            try {
                const promise = new Promise((resolve) => {
                    localPort.onmessage = (event) => resolve(event.data);
                });
                const abortListener = () => localPort.postMessage({
                    metadata: { SENDER },
                    type: MessageTypes.AbortRequest,
                });
                abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener("abort", abortListener);
                this.broadcastChannel.postMessage(Object.assign(Object.assign({}, request), { SENDER, senderId: this.messengerId }), remotePort);
                const response = yield promise;
                abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.removeEventListener("abort", abortListener);
                if (response.type === MessageTypes.ErrorResponse) {
                    const error = new Error();
                    Object.assign(error, JSON.parse(response.error));
                    throw error;
                }
                return response;
            }
            finally {
                localPort.close();
            }
        });
    }
    createMessageEventListener() {
        return (event) => messenger_awaiter(this, void 0, void 0, function* () {
            var _a;
            // Reject when in a sandboxed iframe with an opaque origin. window.origin can be null/undefined or the
            // literal string "null" (truthy), so we check both to avoid accepting messages from that context.
            if (!window.origin || String(window.origin).toLowerCase() === "null") {
                return;
            }
            if (!event.isTrusted) {
                return;
            }
            const windowOrigin = window.location.origin;
            if (event.origin !== windowOrigin || !this.handler) {
                return;
            }
            const message = event.data;
            const port = (_a = event.ports) === null || _a === void 0 ? void 0 : _a[0];
            if ((message === null || message === void 0 ? void 0 : message.SENDER) !== SENDER || message.senderId == this.messengerId || port == null) {
                return;
            }
            const abortController = new AbortController();
            port.onmessage = (event) => {
                if (event.data.type === MessageTypes.AbortRequest) {
                    abortController.abort();
                }
            };
            const onDestroyListener = () => abortController.abort();
            this.onDestroy.addEventListener("destroy", onDestroyListener);
            try {
                const handlerResponse = yield this.handler(message, abortController);
                port.postMessage(Object.assign(Object.assign({}, handlerResponse), { SENDER }));
            }
            catch (error) {
                port.postMessage({
                    SENDER,
                    type: MessageTypes.ErrorResponse,
                    error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
                });
            }
            finally {
                this.onDestroy.removeEventListener("destroy", onDestroyListener);
                port.close();
            }
        });
    }
    /**
     * Cleans up the messenger by removing the message event listener
     */
    destroy() {
        return messenger_awaiter(this, void 0, void 0, function* () {
            this.onDestroy.dispatchEvent(new Event("destroy"));
            if (this.messageEventListener) {
                yield this.sendDisconnectCommand();
                this.broadcastChannel.removeEventListener(this.messageEventListener);
                this.messageEventListener = null;
            }
        });
    }
    sendDisconnectCommand() {
        return messenger_awaiter(this, void 0, void 0, function* () {
            yield this.request({ type: MessageTypes.DisconnectRequest });
        });
    }
    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}

;// ./src/autofill/fido2/content/fido2-page-script.ts
var fido2_page_script_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




(function (globalContext) {
    var _a;
    if ((_a = globalContext.document.currentScript) === null || _a === void 0 ? void 0 : _a.parentNode) {
        globalContext.document.currentScript.parentNode.removeChild(globalContext.document.currentScript);
    }
    const shouldExecuteContentScript = globalContext.document.contentType === "text/html" &&
        (globalContext.document.location.protocol === "https:" ||
            (globalContext.document.location.protocol === "http:" &&
                globalContext.document.location.hostname === "localhost"));
    if (!shouldExecuteContentScript) {
        return;
    }
    // Match the fido2 content script's sandbox bail. Without this, the page-script
    // override would still hijack navigator.credentials.{create,get} in frames where
    // the content script has already returned early — leaving requests with no other
    // end of the messenger to receive them. Bailing here lets the native browser API
    // handle WebAuthn in those frames instead.
    if (currentlyInSandboxedIframe()) {
        return;
    }
    const BrowserPublicKeyCredential = globalContext.PublicKeyCredential;
    const BrowserNavigatorCredentials = navigator.credentials;
    const BrowserAuthenticatorAttestationResponse = globalContext.AuthenticatorAttestationResponse;
    const browserNativeWebauthnSupport = globalContext.PublicKeyCredential != undefined;
    let browserNativeWebauthnPlatformAuthenticatorSupport = false;
    if (!browserNativeWebauthnSupport) {
        // Polyfill webauthn support
        try {
            // credentials are read-only if supported, use type-casting to force assignment
            navigator.credentials = {
                create() {
                    return fido2_page_script_awaiter(this, void 0, void 0, function* () {
                        throw new Error("Webauthn not supported in this browser.");
                    });
                },
                get() {
                    return fido2_page_script_awaiter(this, void 0, void 0, function* () {
                        throw new Error("Webauthn not supported in this browser.");
                    });
                },
            };
            globalContext.PublicKeyCredential = class PolyfillPublicKeyCredential {
                static isUserVerifyingPlatformAuthenticatorAvailable() {
                    return Promise.resolve(true);
                }
            };
            globalContext.AuthenticatorAttestationResponse =
                class PolyfillAuthenticatorAttestationResponse {
                };
        }
        catch (_b) {
            /* empty */
        }
    }
    else {
        void BrowserPublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((available) => {
            browserNativeWebauthnPlatformAuthenticatorSupport = available;
            if (!available) {
                // Polyfill platform authenticator support
                globalContext.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable = () => Promise.resolve(true);
            }
        });
    }
    const browserCredentials = {
        create: navigator.credentials.create.bind(navigator.credentials),
        get: navigator.credentials.get.bind(navigator.credentials),
    };
    const messenger = Messenger.forDOMCommunication(window);
    let waitForFocusTimeout;
    let focusListenerHandler;
    navigator.credentials.create = createWebAuthnCredential;
    navigator.credentials.get = getWebAuthnCredential;
    /**
     * Creates a new webauthn credential.
     *
     * @param options Options for creating new credentials.
     * @returns Promise that resolves to the new credential object.
     */
    function createWebAuthnCredential(options) {
        return fido2_page_script_awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!isWebauthnCall(options)) {
                return yield browserCredentials.create(options);
            }
            const authenticatorAttachmentIsPlatform = ((_b = (_a = options === null || options === void 0 ? void 0 : options.publicKey) === null || _a === void 0 ? void 0 : _a.authenticatorSelection) === null || _b === void 0 ? void 0 : _b.authenticatorAttachment) === "platform";
            const fallbackSupported = (authenticatorAttachmentIsPlatform && browserNativeWebauthnPlatformAuthenticatorSupport) ||
                (!authenticatorAttachmentIsPlatform && browserNativeWebauthnSupport);
            try {
                const response = yield messenger.request({
                    type: MessageTypes.CredentialCreationRequest,
                    data: WebauthnUtils.mapCredentialCreationOptions(options, fallbackSupported),
                }, options === null || options === void 0 ? void 0 : options.signal);
                if (response.type !== MessageTypes.CredentialCreationResponse || !response.result) {
                    throw new Error("Something went wrong.");
                }
                return WebauthnUtils.mapCredentialRegistrationResult(response.result);
            }
            catch (error) {
                if (fallbackSupported &&
                    error instanceof Object &&
                    "fallbackRequested" in error &&
                    error.fallbackRequested) {
                    yield waitForFocus();
                    return yield browserCredentials.create(options);
                }
                throw rehydrateDOMException(error);
            }
        });
    }
    /**
     * Retrieves a webauthn credential.
     *
     * @param options Options for creating new credentials.
     * @returns Promise that resolves to the new credential object.
     */
    function getWebAuthnCredential(options) {
        return fido2_page_script_awaiter(this, void 0, void 0, function* () {
            if (!isWebauthnCall(options)) {
                return yield browserCredentials.get(options);
            }
            const abortSignal = (options === null || options === void 0 ? void 0 : options.signal) || new AbortController().signal;
            const fallbackSupported = browserNativeWebauthnSupport;
            if ((options === null || options === void 0 ? void 0 : options.mediation) && options.mediation === "conditional") {
                const internalAbortControllers = [new AbortController(), new AbortController()];
                const bitwardenResponse = (internalAbortController) => fido2_page_script_awaiter(this, void 0, void 0, function* () {
                    try {
                        const abortListener = () => messenger.request({
                            type: MessageTypes.AbortRequest,
                            abortedRequestId: abortSignal.toString(),
                        });
                        internalAbortController.signal.addEventListener("abort", abortListener);
                        const response = yield messenger.request({
                            type: MessageTypes.CredentialGetRequest,
                            data: WebauthnUtils.mapCredentialRequestOptions(options, fallbackSupported),
                        }, internalAbortController.signal);
                        internalAbortController.signal.removeEventListener("abort", abortListener);
                        if (response.type !== MessageTypes.CredentialGetResponse || !response.result) {
                            throw new Error("Something went wrong.");
                        }
                        return WebauthnUtils.mapCredentialAssertResult(response.result);
                    }
                    catch (_a) {
                        // Ignoring error
                    }
                });
                const browserResponse = (internalAbortController) => browserCredentials.get(Object.assign(Object.assign({}, options), { signal: internalAbortController.signal }));
                const abortListener = () => {
                    internalAbortControllers.forEach((controller) => controller.abort());
                };
                abortSignal.addEventListener("abort", abortListener);
                const response = yield Promise.race([
                    bitwardenResponse(internalAbortControllers[0]),
                    browserResponse(internalAbortControllers[1]),
                ]);
                abortSignal.removeEventListener("abort", abortListener);
                internalAbortControllers.forEach((controller) => controller.abort());
                return response !== null && response !== void 0 ? response : null;
            }
            try {
                const response = yield messenger.request({
                    type: MessageTypes.CredentialGetRequest,
                    data: WebauthnUtils.mapCredentialRequestOptions(options, fallbackSupported),
                }, options === null || options === void 0 ? void 0 : options.signal);
                if (response.type !== MessageTypes.CredentialGetResponse || !response.result) {
                    throw new Error("Something went wrong.");
                }
                return WebauthnUtils.mapCredentialAssertResult(response.result);
            }
            catch (error) {
                if (fallbackSupported &&
                    error instanceof Object &&
                    "fallbackRequested" in error &&
                    error.fallbackRequested) {
                    yield waitForFocus();
                    return yield browserCredentials.get(options);
                }
                throw rehydrateDOMException(error);
            }
        });
    }
    function isWebauthnCall(options) {
        return options != null && "publicKey" in options;
    }
    /**
     * Errors thrown from the content-script messenger handler cross the page/isolated
     * world boundary as JSON, which strips DOMException's prototype. Reconstruct a
     * real DOMException so callers that check `instanceof DOMException` or `.code`
     * see what the native browser API would throw. Scoped to `NotAllowedError` —
     * the only DOMException name our gate produces.
     */
    function rehydrateDOMException(error) {
        if (error != null &&
            typeof error === "object" &&
            "name" in error &&
            error.name === "NotAllowedError" &&
            "message" in error &&
            typeof error.message === "string") {
            return new DOMException(error.message, "NotAllowedError");
        }
        return error;
    }
    /**
     * Wait for window to be focused.
     * Safari doesn't allow scripts to trigger webauthn when window is not focused.
     *
     * @param fallbackWait How long to wait when the script is not able to add event listeners to `window.top`. Defaults to 500ms.
     * @param timeout Maximum time to wait for focus in milliseconds. Defaults to 5 minutes.
     * @returns Promise that resolves when window is focused, or rejects if timeout is reached.
     */
    function waitForFocus() {
        return fido2_page_script_awaiter(this, arguments, void 0, function* (fallbackWait = 500, timeout = 5 * 60 * 1000) {
            var _a;
            try {
                if ((_a = globalContext.top) === null || _a === void 0 ? void 0 : _a.document.hasFocus()) {
                    return;
                }
            }
            catch (_b) {
                // Cannot access window.top due to cross-origin frame, fallback to waiting
                return yield new Promise((resolve) => globalContext.setTimeout(resolve, fallbackWait));
            }
            if (!globalContext.top) {
                return yield new Promise((resolve) => globalContext.setTimeout(resolve, fallbackWait));
            }
            const topWindow = globalContext.top;
            const focusPromise = new Promise((resolve) => {
                focusListenerHandler = () => resolve();
                topWindow.addEventListener("focus", focusListenerHandler);
            });
            const timeoutPromise = new Promise((_, reject) => {
                waitForFocusTimeout = globalContext.setTimeout(() => reject(new DOMException("The operation either timed out or was not allowed.", "AbortError")), timeout);
            });
            try {
                yield Promise.race([focusPromise, timeoutPromise]);
            }
            finally {
                clearWaitForFocus();
            }
        });
    }
    function clearWaitForFocus() {
        var _a;
        (_a = globalContext.top) === null || _a === void 0 ? void 0 : _a.removeEventListener("focus", focusListenerHandler);
        if (waitForFocusTimeout) {
            globalContext.clearTimeout(waitForFocusTimeout);
        }
    }
    function destroy() {
        try {
            if (browserNativeWebauthnSupport) {
                navigator.credentials.create = browserCredentials.create;
                navigator.credentials.get = browserCredentials.get;
            }
            else {
                navigator.credentials = BrowserNavigatorCredentials;
                globalContext.PublicKeyCredential = BrowserPublicKeyCredential;
                globalContext.AuthenticatorAttestationResponse = BrowserAuthenticatorAttestationResponse;
            }
            clearWaitForFocus();
            void messenger.destroy();
        }
        catch (_a) {
            /** empty */
        }
    }
    /**
     * Sets up a listener to handle cleanup or reconnection when the extension's
     * context changes due to being reloaded or unloaded.
     */
    messenger.handler = (message) => {
        const type = message.type;
        // Handle cleanup for disconnect request
        if (type === MessageTypes.DisconnectRequest) {
            destroy();
        }
    };
})(globalThis);

/******/ })()
;