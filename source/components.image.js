hilary.register('gutentyp::components::image', { init: function (components, config, utils) {
    "use strict";
    
    var image;
    
    image = components.makeComponent({
        title: 'Add Image',
        cssClass: 'gutentyp-image',
        pipelineName: 'image',
        func: function (event, input) {
            var target = utils.getAttribute(event.target, 'data-src'),
                alt = utils.getAttribute(event.target, 'data-alt');
            alt = alt || target;

            if(!target) {
                throw new Error('the data-src attribute was not set on the target element.');
            }

            return '<img src="' + target + '" alt="' + alt + '" />';            
        }
    });
    
    image.displayHandler = function () {
        // TODO: add drop form that sets the data-src and data-alt
        var markup = '<button class="' + image.cssClass + '" data-src="http://thissongissick.com/wp-content/uploads/2013/03/Daft-Punk-Helmets-Columbia-Album-artwork.jpg" data-alt="daft">Add Image</button>';
        utils.insertHtml(config.selectors.toolbar, markup);
        utils.attachEvent(config.selectors.toolbar + ' .' + image.cssClass, 'click', image.execute);
    };

    components.addComponent(image);
}});
