/*global hilary*/

hilary.register('gutentyp::components::link', { init: function (components, config, utils) {
    "use strict";
    
    var link;
    
    link = components.makeComponent({
        title: 'Add Link',
        cssClass: 'gutentyp-link',
        pipelineName: 'link',
        icon: 'fa fa-link',
        textClass: 'sr-only',
        func: function (event, input) {
            var target = utils.getClosest(event.target, 'button'),
                text,
                href = utils.getAttribute(target, 'data-location');

            if (!href) {
                throw new Error('the data-location attribute was not set on the target element.');
            }
            
            text = input && input.length > 0 ? input : href;
            return '<a href="' + href + '" target="_blank">' + text + '</a>';
        }
    });
    
    link.displayHandler = function () {
        // TODO: add drop form that sets the data-location
        return '<button type="button" class="' + link.cssClass + '" data-location="http://google.com">'
                    + '<i class="' + config.cssClasses.toolbarBtnIcon + ' fa fa-link"></i>'
                    + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">Add Link</span>'
                + '</button>';
    };

    components.addComponent(link);
}});
