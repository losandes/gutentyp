/*global hilary*/

hilary.register('gutentyp::components::link', { init: function (components, config, utils) {
    "use strict";
    
    var link, hasEvent;
    
    link = components.makeComponent({
        title: 'Add Link',
        cssClass: 'gutentyp-link',
        pipelineName: 'link',
        icon: 'fa fa-link',
        textClass: 'sr-only',
        func: function (event, input) {
            //console.log(event, input);
//            var target = utils.getClosest(event.target, 'button'),
//                text,
//                href = utils.getAttribute(target, 'data-location');
//
//            if (!href) {
//                throw new Error('the data-location attribute was not set on the target element.');
//            }
//            
//            text = input && input.length > 0 ? input : href;
//            return '<a href="' + href + '" target="_blank">' + text + '</a>';
        }
    });
    
    link.displayHandler = function () {
        var hrefDomId = utils.getRandomString();
        
        if (!hasEvent) {
            utils.attachEvent({
                primarySelector: document,
                secondarySelector: '.' + link.cssClass,
                eventType: 'click',
                eventHandler: function (event) {
                    var btn = utils.getClosest(event.target, 'button'),
                        target = utils.getNext(btn, '.gutentyp-toolbar-group'),
                        btnCoords = utils.getCoordinates(event.target),
                        style;

                    // set the coordinates
                    style = 'left: ' + ((btnCoords.left + (btnCoords.width / 2)) / 2);
                    style += '; top: ' + (btnCoords.offset.top + btnCoords.height + 6);
                    utils.setStyle(target, style);

                    // show or hid this toolbar
                    utils.toggleClass(target, 'active');
                }
            });
            
            hasEvent = true;
        }
        
        return '<button type="button" class="' + link.cssClass + '">'
                    + '<i class="' + config.cssClasses.toolbarBtnIcon + ' fa fa-link"></i>'
                    + '<span class="' + config.cssClasses.toolbarBtnText + ' sr-only">Add Link</span>'
                + '</button>'
                + '<div class="gutentyp-toolbar-group gutentyp-toolbar-arrow-none"><form>'
                    + '<label for="' + hrefDomId + '">Url</label>'
                    + '<input id="' + hrefDomId + '" type="text" />'
                + '</form></div>';
    };

    components.addComponent(link);
}});
