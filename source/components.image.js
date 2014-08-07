/*global hilary,isNaN*/

hilary.register('gutentyp::components::image', { init: function (components, config, utils) {
    "use strict";
    
    var component = components.makeComponent({
        title: 'Add Image',
        cssClass: 'gutentyp-image',
        pipelineName: 'image',
        icon: config.icons.image,
        textClass: 'sr-only',
        func: function (event, selectedText, formData) {
            if (!formData) {
                throw 'No form data is present, so we can\'t write an image element.';
            }
            
            var src = formData.gutenSrc,
                alt = formData.gutenAlt || formData.gutenSrc,
                width = formData.gutenWidth,
                height = formData.gutenHeight,
                img;

            img = '<img src="' + src + '" alt="' + alt + '" '
                    + (width ? ('width="' + width + '"') : '')
                    + (height ? ('height="' + height + '"') : '')
                    + '/>';
            
            return img;
        },
        form: {
            fields: [
                {
                    name: 'gutenSrc',
                    label: 'Url',
                    elementType: 'input',
                    type: 'text',
                    validation: {
                        message: 'Please enter a valid Url.',
                        cssClass: 'link-src',
                        validate: function (event, formData) {
                            if (!formData || !formData.gutenSrc || formData.gutenSrc.indexOf('://') < 0) {
                                return false;
                            }

                            return true;
                        }
                    }
                },
                {
                    name: 'gutenAlt',
                    label: 'Description',
                    elementType: 'input',
                    type: 'text',
                    validation: {
                        message: 'Please enter a description. It\'s used by screen readers for accessibility.',
                        cssClass: 'link-alt',
                        validate: function (event, formData) {
                            if (!formData || !formData.gutenAlt) {
                                return false;
                            }

                            return true;
                        }
                    }
                },
                {
                    name: 'gutenWidth',
                    label: 'Width',
                    elementType: 'input',
                    type: 'text',
                    validation: {
                        message: 'Width is not required, but it has to be a number',
                        cssClass: 'link-width',
                        validate: function (event, formData) {
                            if (formData && formData.gutenWidth && isNaN(formData.gutenWidth)) {
                                return false;
                            }

                            return true;
                        }
                    }
                },
                {
                    name: 'gutenHeight',
                    label: 'Height',
                    elementType: 'input',
                    type: 'text',
                    validation: {
                        message: 'Height is not required, but it has to be a number',
                        cssClass: 'link-height',
                        validate: function (event, formData) {
                            if (formData && formData.gutenHeight && isNaN(formData.gutenHeight)) {
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
