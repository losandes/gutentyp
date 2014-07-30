hilary.register('gutentyp::components::link', { init: function (components, config, utils) {
    "use strict";
    
    var link;
    
    link = components.makeComponent({
        title: 'Add Link',
        cssClass: 'gutentyp-link',
        pipelineName: 'link',
        func: function (event, input) {
            var text, target = utils.getAttribute(event.target, 'data-location');

            if(!target) {
                throw new Error('the data-src attribute was not set on the target element.');
            }
            
            text = input && input.length > 0 ? input : target;
            return '<a href="' + target + '" target="_blank">' + text + '</a>';
        }
    });
    
    link.displayHandler = function () {
        // TODO: add drop form that sets the data-location
        var markup = '<button class="' + link.cssClass + '" data-location="http://google.com">Add Link</button>';
        utils.insertHtml(config.selectors.toolbar, markup);
        utils.attachEvent(config.selectors.toolbar + ' .' + link.cssClass, 'click', link.execute);
    };

    components.addComponent(link);
}});
