/*global hilary*/

hilary.register('gutentyp::components::link', { init: function (components, config, utils) {
    "use strict";
    
    var link, selected;
    
    link = components.makeComponent({
        title: 'Add Link',
        cssClass: 'gutentyp-link',
        pipelineName: 'link',
        icon: config.icons.link,
        textClass: 'sr-only',
        func: function (event, input, formData) {
            if (!event.fromGutenForm) {
                selected = event.gutenSelection;
                return false;
            }
            
            var gutenArea = utils.getClosestAdjacent(utils.getClosest(event.target, config.selectors.toolbar), config.selectors.editor).first(),
                text,
                markup;
            
            if (!formData || !formData.href) {
                return false;
            }
            
            if (input && input.length > 0) {
                text = input;
            } else if (selected && selected.text && selected.text.length > 0) {
                text = selected.text;
            } else {
                text = formData.href;
            }
            
            markup = '<a href="' + formData.href + '" target="_blank">' + text + '</a>';
            utils.clearForm(event.target);
            
            return {
                markup: markup,
                selectionCoordinates: selected,
                gutenArea: gutenArea
            };
        },
        form: [{
            name: 'href',
            label: 'Url',
            elementType: 'input',
            type: 'text',
            attributes: [{ key: 'data-test', value: 'test' }],
            cssClass: 'test',
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
        }]
    });
    
    components.addComponent(link);
}});
