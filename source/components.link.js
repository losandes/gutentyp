/*global hilary*/

hilary.register('gutentyp::components::link', { init: function (components, config, utils) {
    "use strict";
    
    var link;
    
    link = components.makeComponent({
        title: 'Add Link',
        cssClass: 'gutentyp-link',
        pipelineName: 'link',
        icon: config.icons.link,
        textClass: 'sr-only',
        func: function (event, input, formData) {
            if (!formData || !formData.href) {
                throw 'No form data is present, so we can\'t write an anchor element.';
            }
            
            var text = input && input.length > 0 ? input : formData.href;
            return '<a href="' + formData.href + '" target="_blank">' + text + '</a>';
        },
        form: [{
            name: 'href',
            label: 'Url',
            elementType: 'input',
            type: 'text',
//            attributes: [{ key: 'data-test', value: 'test' }],
//            cssClass: 'test',
            validation: {
                message: 'Please enter a valid Url.',
                cssClass: 'link-url',
                validate: function (event, formData) {
                    if (!formData || !formData.href || formData.href.indexOf('://') < 0) {
                        return false;
                    }

                    return true;
                }
            }
        }],
        after: function (event) {
            utils.clearForm(event.target);
        }
    });
    
    components.addComponent(link);
}});
