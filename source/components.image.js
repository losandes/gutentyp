/*global hilary,isNaN*/

hilary.register('gutentyp::components::image', { init: function (components, config, utils) {
    "use strict";
    
    var image;
    
    image = components.makeComponent({
        title: 'Add Image',
        cssClass: 'gutentyp-image',
        pipelineName: 'image',
        icon: config.icons.image,
        textClass: 'sr-only',
        func: function (event, selectedText, formData) {
            if (!formData) {
                throw 'No form data is present, so we can\'t write an anchor element.';
            }
            
            var src = formData.src,
                alt = formData.alt || formData.src,
                width = formData.width,
                height = formData.height,
                img;

            img = '<img src="' + src + '" alt="' + alt + '" '
                    + (width ? ('width="' + width + '"') : '')
                    + (height ? ('height="' + height + '"') : '')
                    + '/>';
            
            return img;
        },
        form: [
            {
                name: 'src',
                label: 'Url',
                elementType: 'input',
                type: 'text',
                validation: {
                    message: 'Please enter a valid Url.',
                    cssClass: 'link-src',
                    validate: function (event, formData) {
                        if (!formData || !formData.src || formData.src.indexOf('://') < 0) {
                            return false;
                        }

                        return true;
                    }
                }
            },
            {
                name: 'alt',
                label: 'Description',
                elementType: 'input',
                type: 'text',
                validation: {
                    message: 'Please enter a description. It\'s used by screen readers for accessibility.',
                    cssClass: 'link-alt',
                    validate: function (event, formData) {
                        if (!formData || !formData.alt) {
                            return false;
                        }

                        return true;
                    }
                }
            },
            {
                name: 'width',
                label: 'Width',
                elementType: 'input',
                type: 'text',
                validation: {
                    message: 'Width is not required, but it has to be a number',
                    cssClass: 'link-width',
                    validate: function (event, formData) {
                        if (formData && formData.width && isNaN(formData.width)) {
                            return false;
                        }

                        return true;
                    }
                }
            },
            {
                name: 'height',
                label: 'Height',
                elementType: 'input',
                type: 'text',
                validation: {
                    message: 'Height is not required, but it has to be a number',
                    cssClass: 'link-height',
                    validate: function (event, formData) {
                        if (formData && formData.height && isNaN(formData.height)) {
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

    components.addComponent(image);
}});
