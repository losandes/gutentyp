/*global hilary*/

hilary.register('gutentyp::components::link', { init: function (components, config, utils) {
    "use strict";
    
    var component = components.makeComponent({
        title: 'Add Link',
        cssClass: 'gutentyp-link',
        pipelineName: 'link',
        icon: config.icons.link,
        textClass: 'sr-only',
        func: function (event, selectedText, formData) {
            if (!formData) {
                throw 'No form data is present, so we can\'t write an anchor element.';
            }
            
            var text = selectedText && selectedText.length > 0 ? selectedText : formData.gutenHref;
            return '<a href="' + formData.gutenHref + '" target="_blank">' + text + '</a>';
        },
        form: {
            fields: [{
                name: 'gutenHref',
                label: 'Url',
                elementType: 'input',
                type: 'text',
    //            attributes: [{ key: 'data-test', value: 'test' }],
    //            cssClass: 'test',
                validation: {
                    message: 'Please enter a valid Url.',
                    cssClass: 'link-url',
                    validate: function (event, formData) {
                        if (!formData || !formData.gutenHref || formData.gutenHref.indexOf('://') < 0) {
                            return false;
                        }

                        return true;
                    }
                }
            }]
        },
        after: function (event) {
            utils.clearForm(event.target);
        }
    });
    
    components.addComponent(component);
    
    return component;
}});
