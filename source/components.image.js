/*global hilary*/

hilary.register('gutentyp::components::image', { init: function (components, config, utils) {
    "use strict";
    
    var image;
    
    image = components.makeComponent({
        title: 'Add Image',
        cssClass: 'gutentyp-image',
        pipelineName: 'image',
        icon: config.icons.image,
        textClass: 'sr-only',
        func: function (event, input) {
            var target = event.target, //utils.getClosest(event.target, 'button'),
                src = utils.getAttribute(target, 'data-src'),
                alt = utils.getAttribute(target, 'data-alt'),
                width = utils.getAttribute(target, 'data-width'),
                height = utils.getAttribute(target, 'data-height'),
                img;
            
            alt = alt || input.length > 0 ? input : src;

            if (!src) {
                throw new Error('the data-src attribute was not set on the target element.');
            }

            img = '<img src="' + src + '" alt="' + alt + '" '
                    + (width ? ('width="' + width + '"') : '')
                    + (height ? ('height="' + height + '"') : '')
                    + '/>';
            
            return img;
        }
    });
    
    image.displayHandler = function () {
        // TODO: add drop form that sets the data-src and data-alt
        return '<button type="button" class="' + image.cssClass + '" data-src="http://thissongissick.com/wp-content/uploads/2013/03/Daft-Punk-Helmets-Columbia-Album-artwork.jpg" data-alt="daft">'
                    + '<i class="' + config.cssClasses.toolbarBtnIcon + ' fa fa-image"></i>'
                    + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">Add Image</span>'
                + '</button>';
    };

    components.addComponent(image);
}});
