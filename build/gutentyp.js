// Input 0
hilary.register("gutentyp::config", {init:function() {
  var config = {};
  config.prefixes = {pipeline:{beforeComponent:"gutentyp::before::", afterComponent:"gutentyp::after::"}};
  config.attributes = {formBtn:{key:"data-form-btn", value:"true"}};
  config.colors = [];
  config.colors.push({title:"Black", name:"black", value:"#000000"});
  config.colors.push({title:"Grey", name:"grey", value:"#62615f"});
  config.colors.push({title:"Light Grey", name:"lightGrey", value:"#dcddd7"});
  config.colors.push({title:"Pink", name:"pink", value:"#cd52bd"});
  config.colors.push({title:"Red", name:"red", value:"#9a0000"});
  config.colors.push({title:"Yellow", name:"yellow", value:"#f0ac28"});
  config.colors.push({title:"Green", name:"green", value:"#6bb343"});
  config.colors.push({title:"Blue", name:"blue", value:"#3c8bc8"});
  config.colors.push({title:"Purple", name:"purple", value:"#a952cd"});
  config.icons = {code:"fa fa-code", pre:"fa fa-file-code-o", blockquote:"fa fa-quote-left", bold:"fa fa-bold", italic:"fa fa-italic", underline:"fa fa-underline", strikethrough:"fa fa-strikethrough", header:"fa fa-header", image:"fa fa-image", alignLeft:"fa fa-align-left", alignCenter:"fa fa-align-center", alignRight:"fa fa-align-right", alignJustify:"fa fa-align-justify", indent:"fa fa-indent", outdent:"fa fa-outdent", link:"fa fa-link", unorderedList:"fa fa-list-ul", orderedList:"fa fa-list-ol", 
  embed:"fa fa-play-circle-o"};
  config.cssClasses = {toGutentypify:"gutentyp-ify", gutentypified:"gutentyp-ified", hasEvents:"has-events", hasToolbar:"has-toolbar", hasComponents:"has-components", container:"gutentyp", editor:"gutentyp-editor", textarea:"gutentyp-textarea", toolbar:"gutentyp-toolbar", toolbarBtn:"gutentyp-toolbar-btn", toolbarBtnText:"gutentyp-toolbar-btn-text", toolbarBtnIcon:"gutentyp-toolbar-btn-icon", toolbarGroup:"gutentyp-toolbar-group", toolbarComponents:"gutentyp-toolbar-components", toolbarForms:"gutentyp-toolbar-forms", 
  toolbarArrowOver:"gutentyp-toolbar-arrow-over", hidden:"gutentyp-hidden", form:"gutentyp-form"};
  config.autoCreateSelectors = function() {
    var i;
    config.selectors = {};
    for (i in config.cssClasses) {
      if (config.cssClasses.hasOwnProperty(i)) {
        config.selectors[i] = "." + config.cssClasses[i];
      }
    }
    config.selectors.newEditors = config.selectors.editor + ":not(" + config.selectors.hasToolbar + ")";
    config.selectors.eventlessEditors = config.selectors.editor + ":not(" + config.selectors.hasEvents + ")";
    config.selectors.newToolbars = config.selectors.toolbar + ":not(" + config.selectors.hasComponents + ")";
    config.selectors.newToolbarsFormsContainer = config.selectors.newToolbars + " " + config.selectors.toolbarForms;
    config.selectors.newToolbarsComponentsContainer = config.selectors.newToolbars + " " + config.selectors.toolbarComponents;
  };
  config.autoCreateSelectors();
  return config;
}});
// Input 1
hilary.register("gutentyp::dom", {init:function($, config) {
  var initializeRichTextAreas, makeElement, insertNewElementBefore, insertNewElementInto, insertHtmlBefore, insertHtmlAfter, setText, insertHtml, addClass, removeClass, toggleClass, addAttribute, getAttribute, getOrSetValue, clearForm, getClosest, getClosestAdjacent, getEditor, getNext, getPrevious, exists, attachEvent, triggerEvent, addChangeEventsToEditables, updateTextarea, isFunction, isObject, isArray, hasAncestor, getSelectedText, replaceSelectedText, pasteHtmlAtCursor, pasteHtml, preserveSelection, 
  selectRange, getSelectedParentNode, selectionIsInEditor, getCursorCoordinates, getRandomString, getCoordinates, setStyle, closestForm, formToJson;
  initializeRichTextAreas = function() {
    var allAreas = [];
    $(config.selectors.toGutentypify).each(function(index, element) {
      var $this = $(this), container, editor;
      container = $("<div />").addClass(config.cssClasses.container).insertBefore($this);
      container.html($this);
      if (!$this.attr("id")) {
        $this.attr("id", "gutentyp-" + getRandomString());
      }
      editor = $("<div />").addClass(config.cssClasses.editor).attr("data-for", $this.attr("id")).html($this.val()).attr("contenteditable", true).insertBefore($this);
      $this.removeClass(config.cssClasses.toGutentypify);
      $this.addClass(config.cssClasses.hidden);
      $this.addClass(config.cssClasses.gutentypified);
      allAreas.push($this.attr("id"));
    });
    return allAreas;
  };
  makeElement = function(newElementType, domClass, attrPairs, innerHtml, returnAsString) {
    var newElement = $("<" + (newElementType || "div") + " />"), i;
    if (domClass && domClass !== null && domClass !== "") {
      newElement.addClass(domClass[0] === "." ? domClass.substr(1) : domClass);
    }
    if (typeof attrPairs !== "undefined") {
      for (i = 0;i < attrPairs.length;i++) {
        newElement.attr(attrPairs[i].key, attrPairs[i].value);
      }
    }
    if (typeof innerHtml !== "undefined") {
      newElement.html(innerHtml);
    }
    if (returnAsString) {
      return newElement.prop("outerHTML");
    }
    return newElement;
  };
  insertNewElementBefore = function(newElementType, target, domClass, attrPairs) {
    if (!target || target === "") {
      return;
    }
    makeElement(newElementType, domClass, attrPairs).insertBefore($(target));
  };
  insertNewElementInto = function(newElementType, target, domClass, attrPairs) {
    if (!target || target === "") {
      return;
    }
    if (typeof newElementType !== "string" && newElementType.markup) {
      var markup = newElementType.markup;
      $(markup).appendTo($(target));
    } else {
      makeElement(newElementType, domClass, attrPairs).appendTo($(target));
    }
  };
  insertHtmlBefore = function(selector, html) {
    return $(selector).before(html);
  };
  insertHtmlAfter = function(selector, html) {
    return $(selector).after(html);
  };
  setText = function(selector, newText) {
    return $(selector).text(newText);
  };
  insertHtml = function(selector, html) {
    return $(selector).append(html);
  };
  addClass = function(selector, cssClass) {
    return $(selector).addClass(cssClass);
  };
  removeClass = function(selector, cssClass) {
    return $(selector).removeClass(cssClass);
  };
  toggleClass = function(selector, cssClass) {
    return $(selector).toggleClass(cssClass);
  };
  addAttribute = function(selector, newAttr, newValue) {
    return $(selector).attr(newAttr, newValue);
  };
  getAttribute = function(elemtnContext, attributeName) {
    return $(elemtnContext).attr(attributeName);
  };
  getOrSetValue = function(elemtnContext, value) {
    if (value) {
      $(elemtnContext).val(value);
      return value;
    } else {
      return $(elemtnContext).val();
    }
  };
  clearForm = function(formSelector) {
    var form = closestForm(formSelector);
    form.val("");
    if (form.is("textarea")) {
      form.html("");
    }
    form.find(":input").val("");
    form.find("textarea").html("");
    return form.find(".alert").addClass(config.cssClasses.hidden);
  };
  getClosest = function(currentNode, targetSelector) {
    return $(currentNode).closest(targetSelector);
  };
  getClosestAdjacent = function(currentNode, targetSelector) {
    return $(currentNode).siblings(targetSelector);
  };
  getEditor = function(currentNode) {
    var node = $(currentNode), container, editor;
    container = node.parents(config.selectors.gutentyp);
    editor = container.find(config.selectors.editor);
    return editor ? editor[0] : null;
  };
  getNext = function(currentNode, targetSelector) {
    return $(currentNode).next(targetSelector);
  };
  getPrevious = function(currentNode, targetSelector) {
    return $(currentNode).prev(targetSelector);
  };
  exists = function(selector) {
    return $(selector).length > 0;
  };
  attachEvent = function(options) {
    if (!options || $.isFunction(options.eventHandler) === false) {
      return false;
    }
    var $this = $(options.primarySelector);
    if (options.secondarySelector) {
      $this.on(options.eventType, options.secondarySelector, function(event) {
        options.eventHandler(event.originalEvent);
      });
    } else {
      $this.on(options.eventType, function(event) {
        options.eventHandler(event.originalEvent);
      });
    }
    return addClass($this, config.cssClasses.hasEvents);
  };
  triggerEvent = function(domElement, eventName) {
    var event;
    if (domElement instanceof $) {
      domElement = domElement[0];
    }
    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, true, true);
      event.eventName = eventName;
    } else {
      if (document.createEventObject) {
        event = document.createEventObject();
        event.eventType = eventName;
        event.eventName = eventName;
      }
    }
    if (domElement.dispatchEvent) {
      domElement.dispatchEvent(event);
    } else {
      if (domElement.fireEvent) {
        domElement.fireEvent("on" + event.eventType, event);
      } else {
        $(domElement).trigger(eventName);
      }
    }
  };
  addChangeEventsToEditables = function(handler, alwaysUpdate) {
    if (!document.querySelectorAll || typeof handler !== "function") {
      return;
    }
    var i = 0, elements = document.querySelectorAll("[contenteditable=true]");
    for (i;i < elements.length;i++) {
      if (typeof elements[i].onblur === "function") {
        continue;
      }
      elements[i].onfocus = function() {
        this.data_orig = this.innerHTML;
      };
      elements[i].onblur = function() {
        if (alwaysUpdate || this.innerHTML !== this.data_orig) {
          handler(this);
          this.data_orig = this.innerHTML;
        }
      };
    }
  };
  updateTextarea = function(target) {
    var textArea = $("textarea#" + $(target).attr("data-for"));
    if (textArea.is("textarea")) {
      textArea.html($(target).html());
    }
    textArea.val($(target).html());
    triggerEvent(textArea[0], "change");
    return target;
  };
  isFunction = function(obj) {
    return $.isFunction(obj);
  };
  isObject = function(obj) {
    return $.isPlainObject(obj);
  };
  isArray = function(obj) {
    return $.isArray(obj);
  };
  hasAncestor = function(selector, ancestor) {
    if ($(selector).parents(ancestor).length !== 0) {
      return true;
    } else {
      if (typeof ancestor === "string" && $(selector).hasClass(ancestor)) {
        return true;
      } else {
        if (typeof ancestor === "string" && $(selector).hasClass(ancestor.substring(1))) {
          return true;
        }
      }
    }
    return false;
  };
  getSelectedText = function() {
    var selected, container, i, len;
    if (typeof window.getSelection !== "undefined") {
      selected = window.getSelection();
      if (selected.rangeCount) {
        container = document.createElement("div");
        for (i = 0, len = selected.rangeCount;i < len;++i) {
          container.appendChild(selected.getRangeAt(i).cloneContents());
        }
        return container.innerHTML;
      }
    } else {
      if (typeof document.selection !== "undefined") {
        if (document.selection.type === "Text") {
          return document.selection.createRange().htmlText;
        }
      }
    }
  };
  replaceSelectedText = function(replacementText, selectPastedContent) {
    if (window.getSelection) {
      return pasteHtml(window.getSelection(), replacementText, selectPastedContent);
    } else {
      if (document.selection) {
        return pasteHtml(document.selection, replacementText, selectPastedContent);
      }
    }
  };
  pasteHtmlAtCursor = function(html, selectPastedContent, event) {
    var sel, gutenArea;
    if (window.getSelection) {
      sel = window.getSelection();
    } else {
      sel = document.selection;
      if (sel.type === "Control") {
        sel = undefined;
      }
    }
    if (event && $(getSelectedParentNode()).closest(config.selectors.editor).length === 0) {
      gutenArea = getClosestAdjacent(getClosest(event.target, config.selectors.toolbar), config.selectors.editor).first();
      insertHtml(gutenArea, html);
    }
    pasteHtml(sel, html, selectPastedContent);
  };
  pasteHtml = function(sel, html, selectPastedContent) {
    var range, el, frag, node, lastNode, firstNode, originalRange;
    if (!sel) {
      return false;
    }
    if (selectPastedContent === undefined) {
      selectPastedContent = true;
    }
    if (sel.isClone && window.getSelection) {
      selectRange(sel);
      sel = window.getSelection();
    }
    if (window.getSelection) {
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        el = document.createElement("div");
        el.innerHTML = html;
        frag = document.createDocumentFragment();
        while (node = el.firstChild) {
          lastNode = frag.appendChild(node);
        }
        firstNode = frag.firstChild;
        range.insertNode(frag);
        preserveSelection(firstNode, lastNode, range, null, sel, selectPastedContent);
      }
    } else {
      if (sel.type !== "Control") {
        originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
          preserveSelection(null, null, range, originalRange, sel, selectPastedContent);
        }
      }
    }
  };
  preserveSelection = function(firstNode, lastNode, range, originalRange, sel, selectPastedContent) {
    if (lastNode) {
      range = range.cloneRange();
      range.setStartAfter(lastNode);
      if (selectPastedContent) {
        range.setStartBefore(firstNode);
      } else {
        range.collapse(true);
      }
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      if (originalRange) {
        range = sel.createRange();
        range.setEndPoint("StartToStart", originalRange);
        range.select();
      }
    }
  };
  getCursorCoordinates = function() {
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return $.extend({isClone:true}, sel, sel.getRangeAt(0));
    }
    return false;
  };
  selectRange = function(selectionData) {
    try {
      var selected, node1, node2, startNode, endNode, offset1, offset2, startOffset, endOffset, range = document.createRange();
      node1 = selectionData.startContainer || selectionData.baseNode || selectionData.anchorNode;
      node2 = selectionData.endContainer || selectionData.extentNode || selectionData.focusNode;
      offset1 = selectionData.startOffset || selectionData.baseOffset || selectionData.anchorOffset;
      offset2 = selectionData.endOffset || selectionData.extentOffset || selectionData.focusOffset;
      if (offset2 > offset1) {
        startNode = node1;
        startOffset = offset1;
        endNode = node2;
        endOffset = offset2;
      } else {
        startNode = node2;
        startOffset = offset2;
        endNode = node1;
        endOffset = offset1;
      }
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
      selected = window.getSelection();
      selected.removeAllRanges();
      selected.addRange(range);
    } catch (e) {
      console.log(e);
    }
  };
  getSelectedParentNode = function(selection) {
    var node, range;
    if (selection && selection.anchorNode) {
      node = selection.anchorNode;
    }
    if (!node && window.getSelection) {
      selection = window.getSelection();
      node = selection.anchorNode;
    }
    if (!node && document.selection) {
      selection = document.selection;
      range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
      node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
    }
    if (node) {
      return node.nodeName === "#text" ? node.parentNode : node;
    }
  };
  selectionIsInEditor = function(selection) {
    var editor = $(getSelectedParentNode(selection)).closest(config.selectors.editor);
    return editor.length > 0;
  };
  getRandomString = function(length) {
    var text = "", possible = "abcdefghijklmnopqrstuvwxyz", i;
    for (i = 0;i < (length || 5);i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  getCoordinates = function(selector, secondarySelector, relativeTo) {
    var btn = $(selector), result = btn.offset(), form, buttonOffset = btn.outerWidth() / 2, viewport = {};
    if (secondarySelector) {
      form = $(secondarySelector);
    } else {
      form = btn;
    }
    result.width = form.outerWidth();
    result.height = btn.outerHeight() > 49 ? btn.outerHeight() : 50;
    if (secondarySelector) {
      result.moveLeft = result.left + (buttonOffset || 25) - result.width / 2;
      result.moveTop = result.top + buttonOffset * 2;
      result.moveRight = result.right + result.width / 2 - getCoordinates(secondarySelector).width / 2;
      result.moveBottom = result.bottom + result.height + 6;
    }
    viewport.width = window.innerWidth;
    viewport.height = window.innerHeight;
    if (result.moveLeft + form.outerWidth() > viewport.width) {
      result.moveLeft = viewport.width - form.outerWidth();
    }
    if (result.moveTop + form.outerHeight() > viewport.height) {
      result.moveTop = viewport.height - form.outerHeight() > 0 ? viewport.height - form.outerHeight() : 0;
    }
    return result;
  };
  setStyle = function(selector, style) {
    return $(selector).attr("style", style);
  };
  closestForm = function(selector, mustBeSerializable) {
    var form;
    if ($(selector).is("form")) {
      form = $(selector);
    } else {
      if (mustBeSerializable && $(selector).hasClass(config.cssClasses.form)) {
        form = $(selector).find(":input");
      } else {
        if (mustBeSerializable) {
          form = $(selector).closest(config.selectors.form).find(":input");
        } else {
          form = $(selector).closest(config.selectors.form);
        }
      }
    }
    if (!form || form.length < 1) {
      form = $(selector).find(config.selectors.form);
    }
    return form;
  };
  formToJson = function(selector) {
    var form = closestForm(selector, true), data = {}, arr;
    if (form.length === 0) {
      return;
    }
    arr = form.serializeArray();
    $.each(arr, function() {
      if (data[this.name] !== undefined) {
        if (!data[this.name].push) {
          data[this.name] = [data[this.name]];
        }
        data[this.name].push(this.value || "");
      } else {
        data[this.name] = this.value || "";
      }
    });
    form.find(':input[disabled="disabled"]').each(function(index) {
      var ele = $(this), name = ele.attr("name");
      if (name) {
        data[name] = ele.val();
      }
    });
    return data;
  };
  return{makeElement:makeElement, initializeRichTextAreas:initializeRichTextAreas, insertNewElementBefore:insertNewElementBefore, insertNewElementInto:insertNewElementInto, insertHtmlBefore:insertHtmlBefore, insertHtmlAfter:insertHtmlAfter, setText:setText, insertHtml:insertHtml, addClass:addClass, removeClass:removeClass, toggleClass:toggleClass, getAttribute:getAttribute, getOrSetValue:getOrSetValue, clearForm:clearForm, getClosest:getClosest, getClosestAdjacent:getClosestAdjacent, getEditor:getEditor, 
  getNext:getNext, getPrevious:getPrevious, exists:exists, attachEvent:attachEvent, triggerEvent:triggerEvent, addChangeEventsToEditables:addChangeEventsToEditables, updateTextarea:updateTextarea, isFunction:isFunction, isObject:isObject, isArray:isArray, hasAncestor:hasAncestor, getSelectedText:getSelectedText, getSelectedParentNode:getSelectedParentNode, replaceSelectedText:replaceSelectedText, pasteHtmlAtCursor:pasteHtmlAtCursor, pasteHtml:pasteHtml, selectRange:selectRange, selectionIsInEditor:selectionIsInEditor, 
  getCursorCoordinates:getCursorCoordinates, getRandomString:getRandomString, getCoordinates:getCoordinates, setStyle:setStyle, formToJson:formToJson};
}});
// Input 2
hilary.register("gutentyp::pipeline", {init:function(config, dom) {
  var beforeAny = [], afterAny = [], registerPipelineEvent = {}, registerPiplineEventHandler, pipeline = {beforeAny:beforeAny, afterAny:afterAny, registerPipelineEvent:registerPipelineEvent};
  registerPipelineEvent.registerBeforeAnyHandler = function(func) {
    if (!dom.isFunction(func)) {
      throw new Error("Only functions can be registered as beforeAny events.");
    }
    beforeAny.push(func);
  };
  registerPipelineEvent.registerAfterAnyHandler = function(func) {
    if (!dom.isFunction(func)) {
      throw new Error("Only functions can be registered as afterAny events.");
    }
    afterAny.push(func);
  };
  registerPipelineEvent.registerBeforeComponentHandler = function(pipelineName, func) {
    registerPiplineEventHandler(config.prefixes.pipeline.beforeComponent + pipelineName, func);
  };
  registerPipelineEvent.registerAfterComponentHandler = function(pipelineName, func) {
    registerPiplineEventHandler(config.prefixes.pipeline.afterComponent + pipelineName, func);
  };
  registerPiplineEventHandler = function(pipelineName, func) {
    if (!dom.isFunction(func)) {
      throw new Error("Only functions can be registered as pipeline events.");
    }
    pipeline[pipelineName] = func;
  };
  return pipeline;
}});
// Input 3
hilary.register("gutentyp::components", {init:function(config, dom, componentPipeline) {
  var components = [], componentFactory, makeForm, appendMarkup, appendValidators, makeValidateFunc, makeComponentForm, attachToBtn, attachToForm, attachToCancel, addComponent, events = {}, selectionCoordinates;
  addComponent = function(component) {
    if (component instanceof Array) {
      var i;
      for (i in component) {
        if (component.hasOwnProperty(i)) {
          addComponent(component[i]);
        }
      }
    } else {
      components.push(component);
    }
  };
  componentFactory = function(definition) {
    var self = {};
    self.title = definition.title;
    self.cssClass = definition.cssClass || definition.pipelineName;
    self.pipelineName = definition.pipelineName;
    self.icon = definition.icon || undefined;
    self.textClass = definition.textClass + " " + config.cssClasses.toolbarBtnText || config.cssClasses.toolbarBtnText;
    self.displayHandler = definition.displayHandler;
    self.group = definition.group || undefined;
    self.execute = function(event, formData) {
      var i, beforeThis = config.prefixes.pipeline.beforeComponent + definition.pipelineName, afterThis = config.prefixes.pipeline.afterComponent + definition.pipelineName, selected = dom.getSelectedText(), output, gutenArea;
      if (dom.getAttribute(dom.getClosest(event.target, "button"), config.attributes.formBtn.key)) {
        selectionCoordinates = dom.getCursorCoordinates();
        selectionCoordinates.text = selected;
        selectionCoordinates.isInEditor = dom.selectionIsInEditor(selectionCoordinates);
        event.gutenSelection = selectionCoordinates;
        return;
      }
      for (i = 0;i < componentPipeline.beforeAny.length;i++) {
        if (dom.isFunction(componentPipeline.beforeAny[i])) {
          componentPipeline.beforeAny[i](event, selected, formData);
        }
      }
      if (dom.isFunction(componentPipeline[beforeThis])) {
        componentPipeline[beforeThis](event, selected, formData);
      }
      if (dom.isFunction(definition.func)) {
        output = definition.func(event, selected || selectionCoordinates && selectionCoordinates.text, formData);
        if (selected && selected.length > 0 && output) {
          dom.replaceSelectedText(output);
        } else {
          if (selectionCoordinates && selectionCoordinates.isInEditor && output) {
            dom.pasteHtml(selectionCoordinates, output, true);
          } else {
            if (output) {
              dom.pasteHtmlAtCursor(output, true, event);
            }
          }
        }
      }
      for (i = 0;i < componentPipeline.afterAny.length;i++) {
        if (dom.isFunction(componentPipeline.afterAny[i])) {
          componentPipeline.afterAny[i](event, selected, formData);
        }
      }
      if (dom.isFunction(componentPipeline[afterThis])) {
        componentPipeline[afterThis](event, selected, formData);
      }
    };
    if (definition.before) {
      componentPipeline.registerPipelineEvent.registerBeforeComponentHandler(definition.pipelineName, definition.before);
    }
    if (definition.after) {
      componentPipeline.registerPipelineEvent.registerAfterComponentHandler(definition.pipelineName, definition.after);
    }
    if (definition.form && !self.displayHandler) {
      self.displayHandler = function() {
        var formObject = makeForm(self, definition.form);
        if (!dom.exists(formObject.uniqueId) && !config.attachFormsTo) {
          dom.insertNewElementInto({markup:formObject.form}, "body");
        } else {
          if (!dom.exists(formObject.uniqueId) && config.attachFormsTo === "toolbar") {
            return{button:formObject.button, form:formObject.form};
          } else {
            if (!dom.exists(formObject.uniqueId)) {
              dom.insertNewElementInto({markup:formObject.form}, config.attachFormsTo);
            }
          }
        }
        return formObject.button;
      };
    }
    selectionCoordinates = undefined;
    return self;
  };
  attachToBtn = function(component) {
    dom.attachEvent({primarySelector:document, secondarySelector:"." + component.cssClass, eventType:"click", eventHandler:function(event) {
      var btn = dom.getClosest(event.target, "button"), target = "." + dom.getAttribute(btn, "data-for"), btnCoords, style;
      if (config.attachFormsTo !== "toolbar") {
        btnCoords = dom.getCoordinates(btn, target);
        style = "left: " + btnCoords.moveLeft + "px";
        style += "; top: " + btnCoords.moveTop + "px";
        dom.setStyle(target, style);
      }
      dom.toggleClass(".gutentyp-toolbar-group.active:not(." + component.uniqueId + ")", "active");
      dom.toggleClass(target, "active");
    }});
  };
  attachToForm = function(component, validate) {
    dom.attachEvent({primarySelector:document, secondarySelector:"." + component.cssClass + "-form .btn-success", eventType:"click", eventHandler:function(event) {
      var formData = dom.formToJson(event.target), target;
      if (dom.isFunction(validate)) {
        if (!validate(event, formData)) {
          return false;
        }
      }
      target = dom.getClosest(event.target, config.selectors.toolbarGroup);
      dom.toggleClass(target, "active");
      event.fromGutenForm = true;
      component.execute(event, formData);
    }});
  };
  attachToCancel = function(component) {
    dom.attachEvent({primarySelector:document, secondarySelector:"." + component.cssClass + "-form .btn-cancel", eventType:"click", eventHandler:function(event) {
      var target = dom.getClosest(event.target, config.selectors.toolbarGroup), alerts = dom.getClosestAdjacent(event.target, ".alert");
      dom.toggleClass(target, "active");
      dom.clearForm(target);
      dom.addClass(alerts, config.cssClasses.hidden);
    }});
  };
  makeForm = function(component, formMeta) {
    var fields = formMeta.fields, i = 0, markup = "", validators = {names:[]}, validation = {}, current, uniqueIds = {}, componentId = dom.getRandomString();
    for (i;i < fields.length;i++) {
      uniqueIds["a" + i] = dom.getRandomString();
      markup += appendMarkup(fields[i], uniqueIds["a" + i]);
      appendValidators(validators, fields[i], uniqueIds["a" + i]);
    }
    if (validators.names.length > 0) {
      validation.validate = makeValidateFunc(validators);
    }
    return makeComponentForm(component, markup, validation, componentId);
  };
  appendMarkup = function(field, uniqueId) {
    var markup = "", attributes, alertCss;
    if (!field || !field.elementType || !field.name) {
      return "";
    }
    if (field.validation && field.validation.message) {
      alertCss = "alert " + config.cssClasses.hidden + " " + uniqueId;
      if (field.validation.cssClass) {
        alertCss += " " + field.validation.cssClass;
      }
      markup += dom.makeElement("div", alertCss, undefined, field.validation.message, true);
    }
    if (field.label) {
      markup += dom.makeElement("label", undefined, undefined, field.label, true);
    }
    attributes = dom.isArray(field.attributes) ? field.attributes : [];
    attributes.push({key:"name", value:field.name});
    if (field.elementType === "input") {
      attributes.push({key:"type", value:field.inputType || "text"});
    }
    markup += dom.makeElement(field.elementType, field.cssClass || undefined, attributes, undefined, true);
    markup += "<br />";
    return markup;
  };
  appendValidators = function(validators, field, uniqueId) {
    if (field.name && field.validation && dom.isFunction(field.validation.validate)) {
      validators.names.push(field.name);
      validators[field.name] = field.validation;
      validators[field.name].messageId = uniqueId;
    }
  };
  makeValidateFunc = function(validators) {
    return function(event, formData) {
      var i, validator, alert, isValid = true;
      for (i = 0;i < validators.names.length;i++) {
        validator = validators[validators.names[i]];
        if (!validator || !dom.isFunction(validator.validate) || !validator.messageId) {
          continue;
        }
        if (!validator.validate(event, formData)) {
          isValid = false;
          alert = dom.getClosestAdjacent(event.target, "." + validator.cssClass);
          alert.removeClass(config.cssClasses.hidden);
        }
      }
      return isValid;
    };
  };
  makeComponentForm = function(component, formMarkup, validation, componentId) {
    component.uniqueId = componentId || dom.getRandomString();
    if (!events[component.pipelineName]) {
      attachToBtn(component);
      attachToForm(component, validation && validation.validate);
      attachToCancel(component);
      events[component.pipelineName] = true;
    }
    var button, form;
    button = '<button type="button" class="' + component.cssClass + '" data-form-btn="true" data-for="' + component.uniqueId + '">' + '<i class="' + config.cssClasses.toolbarBtnIcon + " " + component.icon + '"></i>' + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">' + component.title + "</span>" + "</button>";
    form = '<div class="clearfix ' + config.cssClasses.toolbarGroup + " " + config.cssClasses.toolbarArrowOver + " " + component.uniqueId + " " + component.cssClass + '-form">' + '<div class="' + config.cssClasses.form + '">' + formMarkup + '<button class="btn btn-success btn-sm" type="button">Add</button>' + '<button class="btn btn-cancel btn-sm" type="button">Cancel</button>' + "</div>" + "</div>";
    return{button:button, form:form, uniqueId:component.uniqueId};
  };
  return{getComponents:function() {
    return components;
  }, makeComponent:componentFactory, makeComponentForm:makeComponentForm, addComponent:addComponent};
}});
// Input 4
hilary.register("gutentyp::toolbar", {init:function(config, dom, componentsModule) {
  var build, components = componentsModule.getComponents(), i, formatEventSelector, buttonTemplate, groups = {}, addToolbarContainer, addToolbarButtons, markDomAsProcessed, addWithDisplayHandler, addWithGroup, addGroup, add;
  addToolbarContainer = function() {
    dom.insertNewElementBefore("div", config.selectors.newEditors, config.selectors.toolbar);
    dom.insertHtml(config.selectors.newToolbars, '<div class="' + config.cssClasses.toolbarComponents + '"></div>');
    dom.insertHtml(config.selectors.newToolbars, '<div class="' + config.cssClasses.toolbarForms + '"></div>');
  };
  addToolbarButtons = function() {
    for (i = 0;i < components.length;i++) {
      if (components[i].group !== undefined) {
        addWithGroup(components[i]);
      } else {
        if (dom.isFunction(components[i].displayHandler)) {
          addWithDisplayHandler(components[i]);
        } else {
          add(components[i]);
        }
      }
    }
  };
  markDomAsProcessed = function() {
    dom.addClass(config.selectors.newEditors, config.cssClasses.hasToolbar);
    dom.addClass(config.selectors.newToolbars, config.cssClasses.hasComponents);
  };
  formatEventSelector = function(component) {
    return config.selectors.toolbar + " ." + component.cssClass + ":not(" + config.selectors.hasEvents + ")";
  };
  buttonTemplate = function(component, componentId) {
    var buttonClass, template;
    buttonClass = "gutentyp-component " + component.cssClass;
    if (componentId) {
      buttonClass += " " + componentId;
    }
    template = '<button type="button" class="' + buttonClass + '" data-title="' + component.title + '">' + '<i class="' + config.cssClasses.toolbarBtnIcon + " " + component.icon + '"></i>' + '<span class="' + component.textClass + '">' + component.title + "</span>" + "</button>";
    return template;
  };
  add = function(component) {
    dom.insertNewElementInto({markup:buttonTemplate(component)}, config.selectors.newToolbarsComponentsContainer);
    dom.attachEvent({primarySelector:formatEventSelector(component), eventType:"click", eventHandler:component.execute});
  };
  addWithDisplayHandler = function(component) {
    var handlerResult = component.displayHandler();
    if (typeof handlerResult === "string") {
      dom.insertHtml(config.selectors.newToolbarsComponentsContainer, handlerResult);
    } else {
      dom.insertHtml(config.selectors.newToolbarsComponentsContainer, handlerResult.button);
      dom.insertHtml(config.selectors.newToolbarsFormsContainer, handlerResult.form);
    }
    dom.attachEvent({primarySelector:formatEventSelector(component), eventType:"click", eventHandler:component.execute});
  };
  addGroup = function(component) {
    var currentGroup = groups[component.group.name] = {components:[component]};
    currentGroup.toggleId = dom.getRandomString();
    currentGroup.menuId = dom.getRandomString();
    currentGroup.toggleSelector = "." + currentGroup.toggleId;
    currentGroup.menuSelector = "." + currentGroup.menuId;
    dom.insertNewElementInto({markup:buttonTemplate(component.group, currentGroup.toggleId)}, config.selectors.newToolbarsComponentsContainer);
    dom.insertNewElementInto({markup:'<div class="' + currentGroup.menuId + " gutentyp-toolbar-group gutentyp-toolbar-arrow-" + (component.group.arrow || "over") + '"><ul></ul></div>'}, "body");
    dom.attachEvent({primarySelector:currentGroup.toggleSelector, eventType:"click", eventHandler:function(event) {
      var btn = dom.getClosest(event.target, "button"), btnCoords = dom.getCoordinates(btn, currentGroup.menuSelector), style;
      style = "left: " + btnCoords.moveLeft + "px";
      style += "; top: " + btnCoords.moveTop + "px";
      dom.setStyle(currentGroup.menuSelector, style);
      dom.toggleClass(".gutentyp-toolbar-group.active:not(" + currentGroup.menuSelector + ")", "active");
      dom.toggleClass(currentGroup.menuSelector, "active");
    }});
    return currentGroup;
  };
  addWithGroup = function(component) {
    var componentId = dom.getRandomString(), componentSelector = "." + componentId, currentGroup, execWrapper;
    if (!groups[component.group.name]) {
      currentGroup = addGroup(component);
    } else {
      currentGroup = groups[component.group.name];
      groups[component.group.name].components.push(component);
    }
    if (component.displayHandler) {
      dom.insertNewElementInto({markup:"<li>" + component.displayHandler(componentId) + "</li>"}, currentGroup.menuSelector + " ul");
    } else {
      dom.insertNewElementInto({markup:"<li>" + buttonTemplate(component, componentId) + "</li>"}, currentGroup.menuSelector + " ul");
    }
    execWrapper = function(event, input) {
      component.execute(event, input);
      dom.toggleClass(currentGroup.menuSelector, "active");
    };
    dom.attachEvent({primarySelector:componentSelector, eventType:"click", eventHandler:execWrapper});
  };
  build = function() {
    addToolbarContainer();
    addToolbarButtons();
    markDomAsProcessed();
    return;
  };
  return{build:build};
}});
// Input 5
hilary.register("gutentyp::transformer", {init:function(config, dom, components, toolbar, pipeline, options) {
  options = options || {};
  var transform = function() {
    var areaIds = dom.initializeRichTextAreas(), changeHandler;
    changeHandler = function(target) {
      if (target) {
        dom.updateTextarea(target);
      }
    };
    if (options.lazyToolbars) {
      dom.attachEvent({primarySelector:document, secondarySelector:config.selectors.editors, eventType:"focusin", eventHandler:function(event) {
        toolbar.build();
      }});
    } else {
      toolbar.build();
    }
    dom.addChangeEventsToEditables(changeHandler, true);
    dom.addClass(config.selectors.editor, config.cssClasses.hasEvents);
    pipeline.registerPipelineEvent.registerAfterAnyHandler(function(event, selected, formData) {
      var editor = dom.getEditor(event.target);
      if (editor && typeof editor.onblur === "function") {
        editor.onblur();
      }
    });
  };
  return{transform:transform};
}});
// Input 6
hilary.register("gutentyp::components::blocks", {init:function(components, config) {
  var code, pre, quote;
  pre = components.makeComponent({title:"Code Block", cssClass:"gutentyp-code-block", pipelineName:"code::block", icon:config.icons.pre, textClass:"sr-only", func:function(event, text) {
    return'<pre class="prettyprint linenums">' + (text || " ") + "</pre>";
  }});
  code = components.makeComponent({title:"Code", cssClass:"gutentyp-code", pipelineName:"code", icon:config.icons.code, textClass:"sr-only", func:function(event, text) {
    return "<code>" + text + "</code>";
  }});
  quote = components.makeComponent({title:"Quote", cssClass:"gutentyp-quote", pipelineName:"quote", icon:config.icons.blockquote, textClass:"sr-only", func:function(event, text) {
    return "<blockquote>" + text + "</blockquote>";
  }});
  components.addComponent([code, pre, quote]);
}});
// Input 7
hilary.register("gutentyp::components::colors", {init:function(components, config) {
  var addColor, colors = config.colors, i = 0, group, colorBlockCss = "gutentyp-component-color-block", colorLabelCss = "gutentyp-component-color-label";
  group = components.makeComponent({title:"Colors", cssClass:"gutentyp-colors", pipelineName:"colors", icon:colorBlockCss + " " + colorLabelCss, textClass:"sr-only"});
  group.name = "colors";
  group.arrow = "over";
  addColor = function(color) {
    components.addComponent(components.makeComponent({title:color.title, cssClass:"gutentyp-" + color.name, pipelineName:"color" + color.Title, func:function(event, text) {
      document.execCommand("forecolor", false, color.value);
      return false;
    }, displayHandler:function(domId) {
      return'<button type="button" class="' + domId + '"><span class="' + colorBlockCss + '" style="background-color: ' + color.value + '"></span></button>';
    }, group:group}));
  };
  for (i;i < colors.length;i++) {
    addColor(colors[i]);
  }
}});
// Input 8
hilary.register("gutentyp::components::emphasis", {init:function(components, config) {
  var bold, italic, underline, strike;
  bold = components.makeComponent({title:"Bold", cssClass:"gutentyp-bold", pipelineName:"bold", icon:config.icons.bold, textClass:"sr-only", func:function(event, text) {
    document.execCommand("bold", false, null);
    return false;
  }});
  italic = components.makeComponent({title:"Italic", cssClass:"gutentyp-italic", pipelineName:"italic", icon:config.icons.italic, textClass:"sr-only", func:function(event, text) {
    document.execCommand("italic", false, null);
    return false;
  }});
  underline = components.makeComponent({title:"Underline", cssClass:"gutentyp-underline", pipelineName:"underline", icon:config.icons.underline, textClass:"sr-only", func:function(event, text) {
    document.execCommand("underline", false, null);
    return false;
  }});
  strike = components.makeComponent({title:"Strike Through", cssClass:"gutentyp-strike", pipelineName:"strike", icon:config.icons.strikethrough, textClass:"sr-only", func:function(event, text) {
    document.execCommand("strikeThrough", false, null);
    return false;
  }});
  components.addComponent([bold, italic, underline, strike]);
}});
// Input 9
hilary.register("gutentyp::components::headings", {init:function(components, config) {
  var h1, h2, h3, h4, h5, h6, group;
  group = components.makeComponent({title:"Headings", cssClass:"gutentyp-headings", pipelineName:"headings", icon:config.icons.header, textClass:"sr-only"});
  group.name = "headings";
  group.arrow = "over";
  h1 = components.makeComponent({title:"h1", cssClass:"gutentyp-h1", pipelineName:"h1", func:function(event, text) {
    text = text || "Lorem ipsum";
    return "<h1>" + text + "</h1>";
  }, group:group});
  h2 = components.makeComponent({title:"h2", cssClass:"gutentyp-h2", pipelineName:"h2", func:function(event, text) {
    text = text || "Lorem ipsum";
    return "<h2>" + text + "</h2>";
  }, group:group});
  h3 = components.makeComponent({title:"h3", cssClass:"gutentyp-h3", pipelineName:"h3", func:function(event, text) {
    text = text || "Lorem ipsum";
    return "<h3>" + text + "</h3>";
  }, group:group});
  h4 = components.makeComponent({title:"h4", cssClass:"gutentyp-h4", pipelineName:"h4", func:function(event, text) {
    text = text || "Lorem ipsum";
    return "<h4>" + text + "</h4>";
  }, group:group});
  h5 = components.makeComponent({title:"h5", cssClass:"gutentyp-h5", pipelineName:"h5", func:function(event, text) {
    text = text || "Lorem ipsum";
    return "<h5>" + text + "</h5>";
  }, group:group});
  h6 = components.makeComponent({title:"h6", cssClass:"gutentyp-h6", pipelineName:"h6", func:function(event, text) {
    text = text || "Lorem ipsum";
    return "<h6>" + text + "</h6>";
  }, group:group});
  components.addComponent([h1, h2, h3, h4, h5, h6]);
}});
// Input 10
hilary.register("gutentyp::components::image", {init:function(components, config, dom) {
  var component = components.makeComponent({title:"Add Image", cssClass:"gutentyp-image", pipelineName:"image", icon:config.icons.image, textClass:"sr-only", func:function(event, selectedText, formData) {
    if (!formData) {
      throw "No form data is present, so we can't write an image element.";
    }
    var src = formData.gutenSrc, alt = formData.gutenAlt || formData.gutenSrc, width = formData.gutenWidth, height = formData.gutenHeight, img;
    img = '<img src="' + src + '" alt="' + alt + '" ' + (width ? 'width="' + width + '"' : "") + (height ? 'height="' + height + '"' : "") + "/>";
    return img;
  }, form:{fields:[{name:"gutenSrc", label:"Url", elementType:"input", type:"text", validation:{message:"Please enter a valid Url.", cssClass:"link-src", validate:function(event, formData) {
    if (!formData || !formData.gutenSrc || formData.gutenSrc.indexOf("://") < 0) {
      return false;
    }
    return true;
  }}}, {name:"gutenAlt", label:"Description", elementType:"input", type:"text", validation:{message:"Please enter a description. It's used by screen readers for accessibility.", cssClass:"link-alt", validate:function(event, formData) {
    if (!formData || !formData.gutenAlt) {
      return false;
    }
    return true;
  }}}, {name:"gutenWidth", label:"Width", elementType:"input", type:"text", validation:{message:"Width is not required, but it has to be a number", cssClass:"link-width", validate:function(event, formData) {
    if (formData && formData.gutenWidth && isNaN(formData.gutenWidth)) {
      return false;
    }
    return true;
  }}}, {name:"gutenHeight", label:"Height", elementType:"input", type:"text", validation:{message:"Height is not required, but it has to be a number", cssClass:"link-height", validate:function(event, formData) {
    if (formData && formData.gutenHeight && isNaN(formData.gutenHeight)) {
      return false;
    }
    return true;
  }}}]}, after:function(event) {
    dom.clearForm(event.target);
  }});
  components.addComponent(component);
  return component;
}});
// Input 11
hilary.register("gutentyp::components::justification", {init:function(components, config) {
  var left, center, right, full, indent, outdent, group;
  group = components.makeComponent({title:"Alignment", cssClass:"gutentyp-align", pipelineName:"alignment", icon:config.icons.alignLeft, textClass:"sr-only"});
  group.name = "alignment";
  group.arrow = "over";
  left = components.makeComponent({title:"Align Left", cssClass:"gutentyp-align-left", pipelineName:"alignLeft", icon:config.icons.alignLeft, textClass:"sr-only", func:function(event, text) {
    document.execCommand("justifyLeft", false, null);
    return false;
  }, group:group});
  center = components.makeComponent({title:"Align Center", cssClass:"gutentyp-align-center", pipelineName:"alignCenter", icon:config.icons.alignCenter, textClass:"sr-only", func:function(event, text) {
    document.execCommand("justifyCenter", false, null);
    return false;
  }, group:group});
  right = components.makeComponent({title:"Align Right", cssClass:"gutentyp-align-right", pipelineName:"alignRight", icon:config.icons.alignRight, textClass:"sr-only", func:function(event, text) {
    document.execCommand("justifyRight", false, null);
    return false;
  }, group:group});
  full = components.makeComponent({title:"Justify", cssClass:"gutentyp-align-justify", pipelineName:"alignJustify", icon:config.icons.alignJustify, textClass:"sr-only", func:function(event, text) {
    document.execCommand("justifyFull", false, null);
    return false;
  }, group:group});
  indent = components.makeComponent({title:"Indent", cssClass:"gutentyp-indent", pipelineName:"indent", icon:config.icons.indent, textClass:"sr-only", func:function(event, text) {
    document.execCommand("indent", false, null);
    return false;
  }, group:group});
  outdent = components.makeComponent({title:"Outdent", cssClass:"gutentyp-outdent", pipelineName:"outdent", icon:config.icons.outdent, textClass:"sr-only", func:function(event, text) {
    document.execCommand("outdent", false, null);
    return false;
  }, group:group});
  components.addComponent([left, center, right, full, indent, outdent]);
}});
// Input 12
hilary.register("gutentyp::components::link", {init:function(components, config, dom) {
  var component = components.makeComponent({title:"Add Link", cssClass:"gutentyp-link", pipelineName:"link", icon:config.icons.link, textClass:"sr-only", func:function(event, selectedText, formData) {
    if (!formData) {
      throw "No form data is present, so we can't write an anchor element.";
    }
    var text = selectedText && selectedText.length > 0 ? selectedText : formData.gutenHref;
    return'<a href="' + formData.gutenHref + '" target="_blank">' + text + "</a>";
  }, form:{fields:[{name:"gutenHref", label:"Url", elementType:"input", type:"text", validation:{message:"Please enter a valid Url.", cssClass:"link-url", validate:function(event, formData) {
    if (!formData || !formData.gutenHref || formData.gutenHref.indexOf("://") < 0) {
      return false;
    }
    return true;
  }}}]}, after:function(event) {
    dom.clearForm(event.target);
  }});
  components.addComponent(component);
  return component;
}});
// Input 13
hilary.register("gutentyp::components::lists", {init:function(components, config) {
  var bullet, numbered;
  bullet = components.makeComponent({title:"Unordered List", cssClass:"gutentyp-list-unordered", pipelineName:"list::unordered", icon:config.icons.unorderedList, textClass:"sr-only", func:function(event, text) {
    document.execCommand("insertUnorderedList", false, null);
    return false;
  }});
  numbered = components.makeComponent({title:"Ordered List", cssClass:"gutentyp-list-ordered", pipelineName:"list::ordered", icon:config.icons.orderedList, textClass:"sr-only", func:function(event, text) {
    document.execCommand("insertOrderedList", false, null);
    return false;
  }});
  components.addComponent([bullet, numbered]);
}});
// Input 14
hilary.register("gutentyp::components::embed", {init:function(components, config, dom) {
  var component = components.makeComponent({title:"Embed Video", cssClass:"gutentyp-embed", pipelineName:"embed", icon:config.icons.embed, textClass:"sr-only", func:function(event, selectedText, formData) {
    if (!formData) {
      throw "No form data is present, so we can't write a video element.";
    }
    return formData.gutenEmbedCode;
  }, form:{fields:[{name:"gutenEmbedCode", label:"Markup", elementType:"textarea", cssClass:"guten-embed", attributes:[{key:"rows", value:"3"}], validation:{message:"The markup is required", cssClass:"link-embed", validate:function(event, formData) {
    if (!formData || !formData.gutenEmbedCode) {
      return false;
    }
    return true;
  }}}]}, after:function(event) {
    dom.clearForm(event.target);
  }});
  components.addComponent(component);
  return component;
}});
// Input 15
hilary.use([hilary, jQuery, window, nicephore], function(hilarysInnerContainer, hilary, $, window, nicephore) {
  var gutentyp;
  gutentyp = function() {
    var self = {}, prep, gutenContainer, config, dom, pipeline, components, toolbar, transformer, tryResolveComponent, componentsAreRegistered = false, withDefaultOptions;
    gutenContainer = hilary.createChildContainer();
    tryResolveComponent = function(moduleName) {
      var modul = gutenContainer.tryResolve(moduleName);
      if (modul) {
        modul.init(components, config, dom);
      }
    };
    prep = function() {
      config = gutenContainer.resolve("gutentyp::config").init();
      self.config = config;
      dom = gutenContainer.resolve("gutentyp::dom").init($, config);
      pipeline = gutenContainer.resolve("gutentyp::pipeline").init(config, dom);
      self.pipeline = pipeline.registerPipelineEvent;
      components = gutenContainer.resolve("gutentyp::components").init(config, dom, pipeline);
    };
    prep();
    self.registerComponents = function(options) {
      var i;
      if (options.autoRegisterComponents === undefined) {
        options.autoRegisterComponents = true;
      }
      if (options.autoRegisterComponents) {
        tryResolveComponent("gutentyp::components::emphasis");
        tryResolveComponent("gutentyp::components::colors");
        tryResolveComponent("gutentyp::components::headings");
        tryResolveComponent("gutentyp::components::justification");
        tryResolveComponent("gutentyp::components::lists");
        tryResolveComponent("gutentyp::components::blocks");
        tryResolveComponent("gutentyp::components::link");
        tryResolveComponent("gutentyp::components::image");
        tryResolveComponent("gutentyp::components::embed");
      }
      if (options.components) {
        for (i = 0;i < options.components.length;i++) {
          self.registerComponent(options.components[i]);
        }
      }
      componentsAreRegistered = true;
    };
    withDefaultOptions = function(options) {
      options = options || {};
      if (options.observeKeyEvents === undefined) {
        options.observeKeyEvents = false;
      }
      return options;
    };
    self.init = function(options) {
      var events;
      options = withDefaultOptions(options);
      if (!componentsAreRegistered) {
        self.registerComponents(options);
        if (options.observeKeyEvents && nicephore) {
          events = gutenContainer.tryResolve("gutentyp::keyEvents");
          if (events) {
            events.init(config, dom, nicephore, $);
          }
        }
      }
      toolbar = gutenContainer.resolve("gutentyp::toolbar").init(config, dom, components);
      transformer = gutenContainer.resolve("gutentyp::transformer").init(config, dom, components, toolbar, pipeline, options);
      transformer.transform();
      return self;
    };
    self.registerComponent = function(component) {
      if (typeof component === "string") {
        tryResolveComponent(component);
      } else {
        var newComp = components.makeComponent(component);
        components.addComponent(newComp);
      }
      return self;
    };
    self.overrideModule = function(name, moduleOverride) {
      gutenContainer.register(name, moduleOverride);
      prep();
      return self;
    };
    self.overrideConfig = function(configOverride) {
      var result = self.overrideModule("gutentyp::config", configOverride);
      config.autoCreateSelectors();
      return result;
    };
    self.overridedom = function(domOverride) {
      return self.overrideModule("gutentyp::dom", domOverride);
    };
    self.overridePipeline = function(pipelineOverride) {
      return self.overrideModule("gutentyp::pipeline", pipelineOverride);
    };
    self.overrideComponents = function(componentsOverride) {
      return self.overrideModule("gutentyp::components", componentsOverride);
    };
    self.overrideToolbar = function(toolbarOverride) {
      gutenContainer.register("gutentyp::toolbar", toolbarOverride);
      return self;
    };
    self.overrideCore = function(coreOverride) {
      gutenContainer.register("gutentyp::core", coreOverride);
      return self;
    };
    self.ifYouReallyKnowWhatYoureDoing = {IoC:gutenContainer, prep:prep};
    return self;
  };
  window.gutentyp = gutentyp;
});
