/*jslint plusplus: true*/
/*global hilary*/

hilary.register('gutentyp::demo', { init: function ($, hilary, gutentyp, highlightJs, document, console) {
    "use strict";
    
    var gutenInstance1 = gutentyp(),
        gutenInstance2 = gutentyp(),
        registerCustomComponents,
        useCustomConfig,
        useCustomToolbar,
        useCustomColors,
        addDemoThemeEvents,
        chooseDemoTheme,
        start;
    
    // register a custom component to be used in our text areas
    registerCustomComponents = function () {
        
        // by registering this on hilary, all gutentyp instances have access to the component
        // you could also register on the gutentyp instance itself, to avoid access
        hilary.register('new::component', { init: function (components, config, utils) {
            var custom = components.makeComponent({
                title: 'Custom',
                cssClass: 'gutentyp-fg-color',
                pipelineName: 'foregroundColor2',
                func: function (event, text) {
                    document.execCommand('forecolor', false, '#FF0000');
                    return false;
                },
                before: function (event) {
                    console.log('before', event);
                },
                after: function (event) {
                    console.log('after', event);
                }
            });

            components.addComponent(custom);
        }});
    };

    // configure the textArea2 instance
    useCustomConfig = function (gutenInstance) {
        // modify the default configuration, so we only override what we need to customize
        // note that the config.selectors will be auto-updated from the cssClasses values 
        // when we use gutentyp.overrideConfig
        var config = gutenInstance.config;
        config.cssClasses.toGutentypify = 'rts2';
        config.cssClasses.editor = 'rts2editor';

        // our override must match the signature of the defauly config module
        // @signature: { init: function () { return config; }
        return gutenInstance.overrideConfig({ init: function () { return config; }});
    };
    
    useCustomToolbar = function (gutenInstance) {
        // override the toolbar => we want to create our own!
        // @signature: { init: function (config, dom, components) { /*toolbar definition*/ } }
        gutenInstance.overrideToolbar({ init: function (config, dom, components) {
            
            var componentCollection = components.getComponents(),
                build,
                addToolbarContainer,
                componentEventSelector,
                buttonTemplate,
                addToolbarButton,
                addToolbarButtons,
                markDomAsProcessed;
            
            addToolbarContainer = function () {
                dom.insertNewElementBefore('div', config.selectors.newEditors, config.selectors.toolbar);
            };
            
            componentEventSelector = function (component) {
                return config.selectors.toolbar + ' .' + component.cssClass + ':not(' + config.selectors.hasEvents + ')';
            };
            
            buttonTemplate = function (component, componentId) {
                var buttonClass, template;

                buttonClass = 'gutentyp-component ' + component.cssClass;

                if (componentId) {
                    buttonClass += ' ' + componentId;
                }

                template = '<button type="button" class="' + buttonClass + '">'
                                    + '<i class="' + config.cssClasses.toolbarBtnIcon + ' ' + component.icon + '"></i>'
                                    + '<span class="' + component.textClass + '">' + component.title + '</span>'
                                + '</button>';
                return template;
            };
            
            addToolbarButton = function (component) {
                // add the element to the DOM
                dom.insertNewElementInto({
                    markup: buttonTemplate(component)
                }, config.selectors.newToolbars);
                
                // add a click event to the element
                dom.attachEvent({
                    primarySelector: componentEventSelector(component),
                    eventType: 'click',
                    eventHandler: component.execute
                });
            };
            
            addToolbarButtons = function () {
                var i = 0,
                    fgColor,
                    bgColor;
                
                // let's say we just want our custom foreground and background colors for this toolbar
                // so we'll find just those components in the collection
                for (i; i < componentCollection.length; i++) {
                    if (componentCollection[i].pipelineName === 'customFgColor') {
                        fgColor = componentCollection[i];
                    } else if (componentCollection[i].pipelineName === 'customBgColor') {
                        bgColor = componentCollection[i];
                    }
                }
                
                addToolbarButton(fgColor);
                addToolbarButton(bgColor);
            };
            
            markDomAsProcessed = function () {
                dom.addClass(config.selectors.newEditors, config.cssClasses.hasToolbar);
                dom.addClass(config.selectors.newToolbars, config.cssClasses.hasComponents);
            };
            
            build = function () {
                addToolbarContainer();
                addToolbarButtons();
                markDomAsProcessed();

                return;
            };

            return {
                build: build
            };

        }});
    };
    
    useCustomColors = function (gutenInstance) {
        // override an existing component, in this case, colors
        // all components have the same signature
        // @signature: { init: function (components, config, dom) { /*component definition*/ } }
        gutenInstance.overrideModule('gutentyp::components::colors', { init: function (components, config, dom) {
            var fgColor, bgColor;

            fgColor = components.makeComponent({
                title: 'Pink Text',
                cssClass: 'gutentyp-fg-color',
                pipelineName: 'customFgColor',
                func: function (event, text) {
                    document.execCommand('forecolor', false, '#cd52bd');
                    return false;
                }
            });

            bgColor = components.makeComponent({
                title: 'Grey Background',
                cssClass: 'gutentyp-bg-color',
                pipelineName: 'customBgColor',
                func: function () {
                    document.execCommand('backcolor', false, '#242424');
                    return false;
                }
            });

            components.addComponent([fgColor, bgColor]);
        }});
    };
    
    chooseDemoTheme = function (theme) {
        var style;
        
        $('head [data-theme="true"]').remove();
        
        if (theme !== 'default') {
            style = '<link rel="stylesheet" href="../build/' + theme + '-theme.css" data-theme="true" />';
            $('head').append(style);
        }
    };
    
    addDemoThemeEvents = function () {
        $('.theme-picker').on('change', function (event) {
            var $this = $(event.target),
                theme = $this.val(),
                style;
            
            chooseDemoTheme(theme);
        });
    };
    
    start = function () {
        var _config = gutenInstance1.config;
        _config.attachFormsTo = 'toolbar';
        gutenInstance1.overrideConfig({ init: function () { return _config; }});
        
        gutenInstance1.init({
            observeKeyEvents: true,
            autoRegisterComponents: true,
            components: ['new::component']
        });
        
        gutenInstance2.init({
            observeKeyEvents: true,
            autoRegisterComponents: true,
            components: ['new::component']
        });
        
        $('.gutentyp-editor pre').each(function (i, block) {
            highlightJs.highlightBlock(block);
        });
    };
    
    return {
        gutenInstance1: gutenInstance1,
        gutenInstance2: gutenInstance2,
        registerCustomComponents: registerCustomComponents,
        useCustomConfig: useCustomConfig,
        useCustomToolbar: useCustomToolbar,
        useCustomColors: useCustomColors,
        addDemoThemeEvents: addDemoThemeEvents,
        start: start
    };
    
}});
