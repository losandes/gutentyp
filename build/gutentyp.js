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
  config.icons = {code:"fa fa-code", pre:"fa fa-file-code-o", blockquote:"fa fa-quote-left", bold:"fa fa-bold", italic:"fa fa-italic", underline:"fa fa-underline", strikethrough:"fa fa-strikethrough", header:"fa fa-header", image:"fa fa-image", alignLeft:"fa fa-align-left", alignCenter:"fa fa-align-center", alignRight:"fa fa-align-right", alignJustify:"fa fa-align-justify", indent:"fa fa-indent", outdent:"fa fa-outdent", link:"fa fa-link", unorderedList:"fa fa-list-ul", orderedList:"fa fa-list-ol"};
  config.cssClasses = {toGutentypify:"gutentyp-ify", gutentypified:"gutentyp-ified", hasEvents:"has-events", hasToolbar:"has-toolbar", hasComponents:"has-components", editor:"gutentyp-editor", textarea:"gutentyp-textarea", toolbar:"gutentyp-toolbar", toolbarBtn:"gutentyp-toolbar-btn", toolbarBtnText:"gutentyp-toolbar-btn-text", toolbarBtnIcon:"gutentyp-toolbar-btn-icon", hidden:"gutentyp-hidden"};
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
  };
  config.autoCreateSelectors();
  return config;
}});
// Input 1
hilary.register("gutentyp::utils", {init:function($, config) {
  var initializeRichTextAreas, makeElement, insertNewElementBefore, insertNewElementInto, setText, insertHtml, addClass, removeClass, toggleClass, addAttribute, getAttribute, getOrSetValue, clearForm, getClosest, getClosestAdjacent, getNext, getPrevious, attachEvent, updateTextarea, isFunction, isObject, isArray, getSelectedText, replaceSelectedText, pasteHtmlAtCursor, pasteHtml, selectRange, getSelectedParentNode, selectionIsInEditor, getCursorCoordinates, getRandomString, getCoordinates, setStyle, 
  closestForm, formToJson;
  initializeRichTextAreas = function() {
    var allAreas = [];
    $(config.selectors.toGutentypify).each(function(index, element) {
      var $this = $(this);
      if (!$this.attr("id")) {
        $this.attr("id", "gutentyp-" + getRandomString());
      }
      $("<div />").addClass(config.cssClasses.editor).attr("data-for", $this.attr("id")).html($this.val()).attr("contenteditable", true).insertBefore($this);
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
  setText = function(selector, newText) {
    $(selector).text(newText);
  };
  insertHtml = function(selector, html) {
    $(selector).append(html);
  };
  addClass = function(selector, cssClass) {
    $(selector).addClass(cssClass);
  };
  removeClass = function(selector, cssClass) {
    $(selector).removeClass(cssClass);
  };
  toggleClass = function(selector, cssClass) {
    $(selector).toggleClass(cssClass);
  };
  addAttribute = function(selector, newAttr, newValue) {
    $(selector).attr(newAttr, newValue);
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
    form.find("input").val("");
    form.find("textarea").html("");
    form.find(".alert").addClass("hidden");
  };
  getClosest = function(currentNode, targetSelector) {
    return $(currentNode).closest(targetSelector);
  };
  getClosestAdjacent = function(currentNode, targetSelector) {
    return $(currentNode).siblings(targetSelector);
  };
  getNext = function(currentNode, targetSelector) {
    return $(currentNode).next(targetSelector);
  };
  getPrevious = function(currentNode, targetSelector) {
    return $(currentNode).prev(targetSelector);
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
    addClass($this, config.cssClasses.hasEvents);
  };
  updateTextarea = function(target) {
    $("textarea#" + $(target).attr("data-for")).html($(target).html());
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
  replaceSelectedText = function(replacementText) {
    var range, div, frag, child;
    if (window.getSelection && window.getSelection().getRangeAt) {
      range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      div = document.createElement("div");
      div.innerHTML = replacementText;
      frag = document.createDocumentFragment();
      while (child = div.firstChild) {
        frag.appendChild(child);
      }
      range.insertNode(frag);
    } else {
      if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(replacementText);
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
    pasteHtml(sel);
  };
  pasteHtml = function(sel, html, selectPastedContent) {
    var range, el, frag, node, lastNode, firstNode, originalRange;
    if (!sel) {
      return false;
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
        }
      }
    } else {
      if (sel.type !== "Control") {
        originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
          range = sel.createRange();
          range.setEndPoint("StartToStart", originalRange);
          range.select();
        }
      }
    }
  };
  getCursorCoordinates = function() {
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return $.extend({isClone:true}, sel);
    }
    return false;
  };
  selectRange = function(selectioData) {
    try {
      var selected, range = document.createRange();
      range.setStart(selectioData.baseNode || selectioData.anchorNode, selectioData.baseOffset || selectioData.anchorOffset);
      range.setEnd(selectioData.extentNode || selectioData.focusNode, selectioData.extentOffset || selectioData.focusOffset);
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
    var element = $(selector), result = element.position();
    result.width = element.width();
    result.height = element.height();
    if (secondarySelector) {
      result.moveLeft = result.left + result.width / 2 - getCoordinates(secondarySelector).width / 2;
      result.moveTop = result.top + result.height + 6;
      result.moveRight = result.right + result.width / 2 - getCoordinates(secondarySelector).width / 2;
      result.moveBottom = result.bottom + result.height + 6;
    }
    return result;
  };
  setStyle = function(selector, style) {
    return $(selector).attr("style", style);
  };
  closestForm = function(selector) {
    return $(selector).is("form") ? $(selector) : $(selector).closest("form");
  };
  formToJson = function(selector) {
    var form = closestForm(selector), data = {}, arr;
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
  return{makeElement:makeElement, initializeRichTextAreas:initializeRichTextAreas, insertNewElementBefore:insertNewElementBefore, insertNewElementInto:insertNewElementInto, setText:setText, insertHtml:insertHtml, addClass:addClass, removeClass:removeClass, toggleClass:toggleClass, getAttribute:getAttribute, getOrSetValue:getOrSetValue, clearForm:clearForm, getClosest:getClosest, getClosestAdjacent:getClosestAdjacent, getNext:getNext, getPrevious:getPrevious, attachEvent:attachEvent, updateTextarea:updateTextarea, 
  isFunction:isFunction, isObject:isObject, isArray:isArray, getSelectedText:getSelectedText, replaceSelectedText:replaceSelectedText, pasteHtmlAtCursor:pasteHtmlAtCursor, pasteHtml:pasteHtml, selectRange:selectRange, selectionIsInEditor:selectionIsInEditor, getCursorCoordinates:getCursorCoordinates, getRandomString:getRandomString, getCoordinates:getCoordinates, setStyle:setStyle, formToJson:formToJson};
}});
// Input 2
hilary.register("gutentyp::pipeline", {init:function(config, utils) {
  var beforeAny = [], afterAny = [], registerPipelineEvent = {}, registerPiplineEventHandler, pipeline = {beforeAny:beforeAny, afterAny:afterAny, registerPipelineEvent:registerPipelineEvent};
  registerPipelineEvent.registerBeforeAnyHandler = function(func) {
    if (!utils.isFunction(func)) {
      throw new Error("Only functions can be registered as beforeAny events.");
    }
    beforeAny.push(func);
  };
  registerPipelineEvent.registerAfterAnyHandler = function(func) {
    if (!utils.isFunction(func)) {
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
    if (!utils.isFunction(func)) {
      throw new Error("Only functions can be registered as pipeline events.");
    }
    pipeline[pipelineName] = func;
  };
  return pipeline;
}});
// Input 3
hilary.register("gutentyp::components", {init:function(config, utils, componentPipeline) {
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
      var i, beforeThis = config.prefixes.pipeline.beforeComponent + definition.pipelineName, afterThis = config.prefixes.pipeline.afterComponent + definition.pipelineName, selected = utils.getSelectedText(), output, gutenArea;
      if (utils.getAttribute(utils.getClosest(event.target, "button"), config.attributes.formBtn.key)) {
        selectionCoordinates = utils.getCursorCoordinates();
        selectionCoordinates.text = selected;
        selectionCoordinates.isInEditor = utils.selectionIsInEditor(selectionCoordinates);
        event.gutenSelection = selectionCoordinates;
        return;
      }
      for (i = 0;i < componentPipeline.beforeAny.length;i++) {
        if (utils.isFunction(componentPipeline.beforeAny[i])) {
          componentPipeline.beforeAny[i](event, selected, formData);
        }
      }
      if (utils.isFunction(componentPipeline[beforeThis])) {
        componentPipeline[beforeThis](event, selected, formData);
      }
      if (utils.isFunction(definition.func)) {
        output = definition.func(event, selected || selectionCoordinates.text, formData);
        if (selected && selected.length > 0 && output) {
          utils.replaceSelectedText(output);
        } else {
          if (selectionCoordinates && selectionCoordinates.isInEditor) {
            utils.pasteHtml(selectionCoordinates, output);
          } else {
            if (output) {
              utils.pasteHtmlAtCursor(output, false, event);
            }
          }
        }
      }
      for (i = 0;i < componentPipeline.afterAny.length;i++) {
        if (utils.isFunction(componentPipeline.afterAny[i])) {
          componentPipeline.afterAny[i](event, selected, formData);
        }
      }
      if (utils.isFunction(componentPipeline[afterThis])) {
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
        return makeForm(self, definition.form);
      };
    }
    selectionCoordinates = undefined;
    return self;
  };
  attachToBtn = function(component) {
    utils.attachEvent({primarySelector:document, secondarySelector:"." + component.cssClass, eventType:"click", eventHandler:function(event) {
      var btn = utils.getClosest(event.target, "button"), target = utils.getNext(btn, ".gutentyp-toolbar-group"), btnCoords = utils.getCoordinates(event.target, target), style;
      style = "left: " + btnCoords.moveLeft + "px";
      style += "; top: " + btnCoords.moveTop + "px";
      utils.setStyle(target, style);
      utils.toggleClass(target, "active");
    }});
  };
  attachToForm = function(component, validate) {
    utils.attachEvent({primarySelector:document, secondarySelector:"." + component.cssClass + "-form .btn-success", eventType:"click", eventHandler:function(event) {
      var formData = utils.formToJson(event.target), target;
      if (utils.isFunction(validate)) {
        if (!validate(event, formData)) {
          return false;
        }
      }
      target = utils.getClosest(event.target, ".gutentyp-toolbar-group");
      utils.toggleClass(target, "active");
      event.fromGutenForm = true;
      component.execute(event, formData);
    }});
  };
  attachToCancel = function(component) {
    utils.attachEvent({primarySelector:document, secondarySelector:"." + component.cssClass + "-form .btn-cancel", eventType:"click", eventHandler:function(event) {
      var target = utils.getClosest(event.target, ".gutentyp-toolbar-group"), alerts = utils.getClosestAdjacent(event.target, ".alert");
      utils.toggleClass(target, "active");
      utils.clearForm(target);
      utils.addClass(alerts, "hidden");
    }});
  };
  makeForm = function(component, formMeta) {
    var fields = formMeta.fields, i = 0, markup = "", validators = {names:[]}, validation = {}, current;
    for (i;i < fields.length;i++) {
      var uniqueId = utils.getRandomString();
      markup += appendMarkup(fields[i], uniqueId);
      appendValidators(validators, fields[i], uniqueId);
    }
    if (validators.names.length > 0) {
      validation.validate = makeValidateFunc(validators);
    }
    return makeComponentForm(component, markup, validation);
  };
  appendMarkup = function(field, uniqueId) {
    var markup = "", attributes, alertCss;
    if (!field || !field.elementType || !field.name) {
      return "";
    }
    if (field.validation && field.validation.message) {
      alertCss = "alert alert-warning hidden " + uniqueId;
      if (field.validation.cssClass) {
        alertCss += " " + field.validation.cssClass;
      }
      markup += utils.makeElement("div", alertCss, undefined, field.validation.message, true);
    }
    if (field.label) {
      markup += utils.makeElement("label", undefined, undefined, field.label, true);
    }
    attributes = utils.isArray(field.attributes) ? field.attributes : [];
    attributes.push({key:"name", value:field.name});
    if (field.elementType === "input") {
      attributes.push({key:"type", value:field.inputType || "text"});
    }
    markup += utils.makeElement(field.elementType, field.cssClass || undefined, attributes, field.label, true);
    markup += "<br />";
    return markup;
  };
  appendValidators = function(validators, field, uniqueId) {
    if (field.name && field.validation && utils.isFunction(field.validation.validate)) {
      validators.names.push(field.name);
      validators[field.name] = {messageId:uniqueId, validate:field.validation.validate};
    }
  };
  makeValidateFunc = function(validators) {
    return function(event, formData) {
      var i, validator, alert, isValid = true;
      for (i = 0;i < validators.names.length;i++) {
        validator = validators[validators.names[i]];
        if (!validator || !utils.isFunction(validator.validate) || !validator.messageId) {
          continue;
        }
        if (!validator.validate(event, formData)) {
          isValid = false;
          alert = utils.getClosestAdjacent(event.target, "." + validator.messageId);
          alert.removeClass("hidden");
        }
      }
      return isValid;
    };
  };
  makeComponentForm = function(component, formMarkup, validation) {
    if (!events[component.pipelineName]) {
      attachToBtn(component);
      attachToForm(component, validation && validation.validate);
      attachToCancel(component);
      events[component.pipelineName] = true;
    }
    return'<button type="button" class="' + component.cssClass + '" data-form-btn="true">' + '<i class="' + config.cssClasses.toolbarBtnIcon + " " + component.icon + '"></i>' + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">' + component.title + "</span>" + "</button>" + '<div class="gutentyp-toolbar-group gutentyp-toolbar-arrow-over ' + component.cssClass + '-form"><form>' + formMarkup + '<button class="btn btn-success" type="button">Add</button>' + '<button class="btn btn-cancel" type="button">Cancel</button>' + 
    "</form></div>";
  };
  return{components:components, makeComponent:componentFactory, makeComponentForm:makeComponentForm, addComponent:addComponent};
}});
// Input 4
hilary.register("gutentyp::toolbar", {init:function(config, utils, componentCollection) {
  var build = function() {
    var components = componentCollection.components, i, formatEventSelector, buttonTemplate, groups = {}, addWithDisplayHandler, addWithGroup, addGroup, add;
    formatEventSelector = function(component) {
      return config.selectors.toolbar + " ." + component.cssClass + ":not(" + config.selectors.hasEvents + ")";
    };
    buttonTemplate = function(component, componentId) {
      var buttonClass, template;
      buttonClass = "gutentyp-component " + component.cssClass;
      if (componentId) {
        buttonClass += " " + componentId;
      }
      template = '<button type="button" class="' + buttonClass + '">' + '<i class="' + config.cssClasses.toolbarBtnIcon + " " + component.icon + '"></i>' + '<span class="' + component.textClass + '">' + component.title + "</span>" + "</button>";
      return template;
    };
    add = function(component) {
      utils.insertNewElementInto({markup:buttonTemplate(component)}, config.selectors.newToolbars);
      utils.attachEvent({primarySelector:formatEventSelector(component), eventType:"click", eventHandler:component.execute});
    };
    addWithDisplayHandler = function(component) {
      utils.insertHtml(config.selectors.newToolbars, component.displayHandler());
      utils.attachEvent({primarySelector:formatEventSelector(component), eventType:"click", eventHandler:component.execute});
    };
    addGroup = function(component) {
      var currentGroup = groups[component.group.name] = {components:[component]};
      currentGroup.toggleId = utils.getRandomString();
      currentGroup.menuId = utils.getRandomString();
      currentGroup.toggleSelector = "." + currentGroup.toggleId;
      currentGroup.menuSelector = "." + currentGroup.menuId;
      utils.insertNewElementInto({markup:buttonTemplate(component.group, currentGroup.toggleId)}, config.selectors.newToolbars);
      utils.insertNewElementInto({markup:'<div class="' + currentGroup.menuId + " gutentyp-toolbar-group gutentyp-toolbar-arrow-" + (component.group.arrow || "over") + '"><ul></ul></div>'}, config.selectors.newToolbars);
      utils.attachEvent({primarySelector:currentGroup.toggleSelector, eventType:"click", eventHandler:function(event) {
        var btnCoords = utils.getCoordinates(event.target, currentGroup.menuSelector), style;
        style = "left: " + btnCoords.moveLeft + "px";
        style += "; top: " + btnCoords.moveTop + "px";
        utils.setStyle(currentGroup.menuSelector, style);
        utils.toggleClass(".gutentyp-toolbar-group.active:not(" + currentGroup.menuSelector + ")", "active");
        utils.toggleClass(currentGroup.menuSelector, "active");
      }});
      return currentGroup;
    };
    addWithGroup = function(component) {
      var componentId = utils.getRandomString(), componentSelector = "." + componentId, currentGroup, execWrapper;
      if (!groups[component.group.name]) {
        currentGroup = addGroup(component);
      } else {
        currentGroup = groups[component.group.name];
        groups[component.group.name].components.push(component);
      }
      if (component.displayHandler) {
        utils.insertNewElementInto({markup:"<li>" + component.displayHandler(componentId) + "</li>"}, currentGroup.menuSelector + " ul");
      } else {
        utils.insertNewElementInto({markup:"<li>" + buttonTemplate(component, componentId) + "</li>"}, currentGroup.menuSelector + " ul");
      }
      execWrapper = function(event, input) {
        component.execute(event, input);
        utils.toggleClass(currentGroup.menuSelector, "active");
      };
      utils.attachEvent({primarySelector:componentSelector, eventType:"click", eventHandler:execWrapper});
    };
    utils.insertNewElementBefore("div", config.selectors.newEditors, config.selectors.toolbar);
    for (i = 0;i < components.length;i++) {
      if (components[i].group !== undefined) {
        addWithGroup(components[i]);
      } else {
        if (utils.isFunction(components[i].displayHandler)) {
          addWithDisplayHandler(components[i]);
        } else {
          add(components[i]);
        }
      }
    }
    utils.addClass(config.selectors.newEditors, config.cssClasses.hasToolbar);
    utils.addClass(config.selectors.newToolbars, config.cssClasses.hasComponents);
    return;
  };
  return{build:build};
}});
// Input 5
hilary.register("gutentyp::core", {init:function(config, utils, components, toolbarBuilder) {
  var loadGutenCore = function() {
    var areaIds = utils.initializeRichTextAreas();
    toolbarBuilder.build();
    utils.attachEvent({primarySelector:config.selectors.eventlessEditors, eventType:"focusout", eventHandler:function(event) {
      utils.updateTextarea(event.currentTarget);
    }});
    utils.addClass(config.selectors.editor, config.cssClasses.hasEvents);
  };
  return{load:loadGutenCore};
}});
// Input 6
hilary.register("gutentyp::components::blocks", {init:function(components, config) {
  var code, pre, quote;
  pre = components.makeComponent({title:"Code Block", cssClass:"gutentyp-code-block", pipelineName:"code::block", icon:config.icons.pre, textClass:"sr-only", func:function(event, text) {
    return'<pre class="prettyprint linenums">' + text + "</pre>";
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
  var addColor, colors = config.colors, i = 0, group;
  group = components.makeComponent({title:"Colors", cssClass:"gutentyp-colors", pipelineName:"colors", icon:"color-block color-pink", textClass:"sr-only"});
  group.name = "colors";
  group.arrow = "over";
  addColor = function(color) {
    components.addComponent(components.makeComponent({title:color.title, cssClass:"gutentyp-" + color.name, pipelineName:"color" + color.Title, func:function(event, text) {
      document.execCommand("forecolor", false, color.value);
      return false;
    }, displayHandler:function(domId) {
      return'<button type="button" class="' + domId + '"><span class="color-block" style="background-color: ' + color.value + '"></span></button>';
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
    return "<h1>" + text + "</h1>";
  }, group:group});
  h2 = components.makeComponent({title:"h2", cssClass:"gutentyp-h2", pipelineName:"h2", func:function(event, text) {
    return "<h2>" + text + "</h2>";
  }, group:group});
  h3 = components.makeComponent({title:"h3", cssClass:"gutentyp-h3", pipelineName:"h3", func:function(event, text) {
    return "<h3>" + text + "</h3>";
  }, group:group});
  h4 = components.makeComponent({title:"h4", cssClass:"gutentyp-h4", pipelineName:"h4", func:function(event, text) {
    return "<h4>" + text + "</h4>";
  }, group:group});
  h5 = components.makeComponent({title:"h5", cssClass:"gutentyp-h5", pipelineName:"h5", func:function(event, text) {
    return "<h5>" + text + "</h5>";
  }, group:group});
  h6 = components.makeComponent({title:"h6", cssClass:"gutentyp-h6", pipelineName:"h6", func:function(event, text) {
    return "<h6>" + text + "</h6>";
  }, group:group});
  components.addComponent([h1, h2, h3, h4, h5, h6]);
}});
// Input 10
hilary.register("gutentyp::components::image", {init:function(components, config, utils) {
  var image;
  image = components.makeComponent({title:"Add Image", cssClass:"gutentyp-image", pipelineName:"image", icon:config.icons.image, textClass:"sr-only", func:function(event, selectedText, formData) {
    if (!formData) {
      throw "No form data is present, so we can't write an anchor element.";
    }
    var src = formData.src, alt = formData.alt || formData.src, width = formData.width, height = formData.height, img;
    img = '<img src="' + src + '" alt="' + alt + '" ' + (width ? 'width="' + width + '"' : "") + (height ? 'height="' + height + '"' : "") + "/>";
    return img;
  }, form:{fields:[{name:"src", label:"Url", elementType:"input", type:"text", validation:{message:"Please enter a valid Url.", cssClass:"link-src", validate:function(event, formData) {
    if (!formData || !formData.src || formData.src.indexOf("://") < 0) {
      return false;
    }
    return true;
  }}}, {name:"alt", label:"Description", elementType:"input", type:"text", validation:{message:"Please enter a description. It's used by screen readers for accessibility.", cssClass:"link-alt", validate:function(event, formData) {
    if (!formData || !formData.alt) {
      return false;
    }
    return true;
  }}}, {name:"width", label:"Width", elementType:"input", type:"text", validation:{message:"Width is not required, but it has to be a number", cssClass:"link-width", validate:function(event, formData) {
    if (formData && formData.width && isNaN(formData.width)) {
      return false;
    }
    return true;
  }}}, {name:"height", label:"Height", elementType:"input", type:"text", validation:{message:"Height is not required, but it has to be a number", cssClass:"link-height", validate:function(event, formData) {
    if (formData && formData.height && isNaN(formData.height)) {
      return false;
    }
    return true;
  }}}]}, after:function(event) {
    utils.clearForm(event.target);
  }});
  components.addComponent(image);
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
hilary.register("gutentyp::components::link", {init:function(components, config, utils) {
  var link;
  link = components.makeComponent({title:"Add Link", cssClass:"gutentyp-link", pipelineName:"link", icon:config.icons.link, textClass:"sr-only", func:function(event, selectedText, formData) {
    if (!formData || !formData.href) {
      throw "No form data is present, so we can't write an anchor element.";
    }
    var text = selectedText && selectedText.length > 0 ? selectedText : formData.href;
    return'<a href="' + formData.href + '" target="_blank">' + text + "</a>";
  }, form:{fields:[{name:"href", label:"Url", elementType:"input", type:"text", validation:{message:"Please enter a valid Url.", cssClass:"link-url", validate:function(event, formData) {
    if (!formData || !formData.href || formData.href.indexOf("://") < 0) {
      return false;
    }
    return true;
  }}}]}, after:function(event) {
    utils.clearForm(event.target);
  }});
  components.addComponent(link);
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
hilary.use([hilary, jQuery, window], function(hilarysInnerContainer, hilary, $, window) {
  var gutentyp;
  gutentyp = function() {
    var self = {}, prep, gutenContainer, config, utils, pipeline, components, toolbar, core, tryResolveComponent;
    gutenContainer = hilary.createChildContainer();
    tryResolveComponent = function(moduleName) {
      var modul = gutenContainer.tryResolve(moduleName);
      if (modul) {
        modul.init(components, config, utils);
      }
    };
    prep = function() {
      config = gutenContainer.resolve("gutentyp::config").init();
      self.config = config;
      utils = gutenContainer.resolve("gutentyp::utils").init($, config);
      pipeline = gutenContainer.resolve("gutentyp::pipeline").init(config, utils);
      self.pipeline = pipeline.registerPipelineEvent;
      components = gutenContainer.resolve("gutentyp::components").init(config, utils, pipeline);
      tryResolveComponent("gutentyp::components::emphasis");
      tryResolveComponent("gutentyp::components::colors");
      tryResolveComponent("gutentyp::components::headings");
      tryResolveComponent("gutentyp::components::justification");
      tryResolveComponent("gutentyp::components::lists");
      tryResolveComponent("gutentyp::components::blocks");
      tryResolveComponent("gutentyp::components::link");
      tryResolveComponent("gutentyp::components::image");
    };
    prep();
    self.init = function() {
      toolbar = gutenContainer.resolve("gutentyp::toolbar").init(config, utils, components);
      core = gutenContainer.resolve("gutentyp::core").init(config, utils, components, toolbar);
      core.load();
      return self;
    };
    self.registerComponent = function(component) {
      var newComp = components.makeComponent(component);
      components.addComponent(newComp);
      return self;
    };
    self.overrideModule = function(name, moduleOverride) {
      gutenContainer.register(name, moduleOverride);
      prep();
      return self;
    };
    self.overrideConfig = function(configOverride) {
      return self.overrideModule("gutentyp::config", configOverride);
    };
    self.overrideUtils = function(utilsOverride) {
      return self.overrideModule("gutentyp::utils", utilsOverride);
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