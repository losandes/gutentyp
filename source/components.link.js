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
        func: function (event, input) {
            if (!event.fromGutenForm) {
                selected = event.gutenSelection;
                return false;
            }
            
            var form = utils.getClosest(event.target, '.gutentyp-toolbar-group'),
                target = utils.getPrevious(form, 'button'),
                hrefInput = utils.getClosestAdjacent(event.target, 'input'),
                gutenArea = utils.getClosestAdjacent(event.target, config.selectors.gutentypified),
                href = utils.getOrSetValue(hrefInput),
                alert = utils.getClosestAdjacent(event.target, '.alert.link-url'),
                text,
                markup;
            
            if (!href) {
                return false;
            }
            
            if (input && input.length > 0) {
                text = input;
            } else if (selected && selected.text && selected.text.length > 0) {
                text = selected.text;
            } else {
                text = href;
            }
            
            markup = '<a href="' + href + '" target="_blank">' + text + '</a>';
            utils.clearForm(form);
            utils.addClass(alert, 'hidden');
            
            return {
                markup: markup,
                selectionCoordinates: selected,
                gutenArea: gutenArea
            };
        }
    });
    
    link.displayHandler = function () {
        var validation, markup = '<div class="link-url alert hidden">Please enter a valid Url.</div><label>Url</label><input type="text" /><br />';
        validation = {
            validate: function (event) {
                var hrefInput = utils.getClosestAdjacent(event.target, 'input'),
                    href = utils.getOrSetValue(hrefInput),
                    alert;
                
                if (href && href.indexOf('://') < 0) {
                    alert = utils.getClosestAdjacent(event.target, '.alert.link-url');
                    alert.removeClass('hidden');
                    return false;
                }
                
                return true;
            }
        };
        return components.makeComponentForm(link, markup, validation);
    };
    
    components.addComponent(link);
}});
