/*global hilary*/

hilary.register('gutentyp::components::embed', { init: function (components, config, utils) {
    "use strict";
    
    var component = components.makeComponent({
        title: 'Embed Video',
        cssClass: 'gutentyp-embed',
        pipelineName: 'embed',
        icon: config.icons.embed,
        textClass: 'sr-only',
        func: function (event, selectedText, formData) {
            if (!formData) {
                throw 'No form data is present, so we can\'t write a video element.';
            }
            
            return formData.gutenEmbedCode;
        },
        form: {
            fields: [
                {
                    name: 'gutenEmbedCode',
                    label: 'Markup',
                    elementType: 'textarea',
                    cssClass: 'guten-embed',
                    attributes: [{ key: 'rows', value: '3' }],
                    validation: {
                        message: 'The markup is required',
                        cssClass: 'link-embed',
                        validate: function (event, formData) {
                            if (!formData || !formData.gutenEmbedCode) {
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
