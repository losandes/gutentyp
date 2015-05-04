/*globals Hilary*/
(function (scope) {
    "use strict";
    
    scope.register({
        name: 'config.colors',
        factory: function () {
            return [
                { title: 'Black', name: 'black', value: '#000000' },
                { title: 'Grey', name: 'grey', value: '#62615f' },
                { title: 'Light Grey', name: 'lightGrey', value: '#dcddd7' },
                { title: 'Pink', name: 'pink', value: '#cd52bd' },
                { title: 'Red', name: 'red', value: '#9a0000' },
                { title: 'Red', name: 'red', value: '#9a0000' },
                { title: 'Yellow', name: 'yellow', value: '#f0ac28' },
                { title: 'Green', name: 'green', value: '#6bb343' },
                { title: 'Blue', name: 'blue', value: '#3c8bc8' },
                { title: 'Purple', name: 'purple', value: '#a952cd' }
            ];
        }
    });
    
    scope.register({
        name: 'config.icons',
        factory: function () {
            return {
                code: 'fa fa-code',
                pre: 'fa fa-file-code-o',
                blockquote: 'fa fa-quote-left',
                bold: 'fa fa-bold',
                italic: 'fa fa-italic',
                underline: 'fa fa-underline',
                strikethrough: 'fa fa-strikethrough',
                header: 'fa fa-header',
                image: 'fa fa-image',
                alignLeft: 'fa fa-align-left',
                alignCenter: 'fa fa-align-center',
                alignRight: 'fa fa-align-right',
                alignJustify: 'fa fa-align-justify',
                indent: 'fa fa-indent',
                outdent: 'fa fa-outdent',
                link: 'fa fa-link',
                unorderedList: 'fa fa-list-ul',
                orderedList: 'fa fa-list-ol',
                embed: 'fa fa-play-circle-o'
            };
        }
    });
    
    scope.register({
        name: 'config.cssClasses',
        factory: function () {
            return {
                toGutentypify: 'gutentyp-ify',
                gutentypified: 'gutentyp-ified',
                hasEvents: 'has-events',
                hasToolbar: 'has-toolbar',
                hasComponents: 'has-components',
                container: 'gutentyp',
                editor: 'gutentyp-editor',
                textarea: 'gutentyp-textarea',
                toolbar: 'gutentyp-toolbar',
                toolbarBtn: 'gutentyp-toolbar-btn',
                toolbarBtnText: 'gutentyp-toolbar-btn-text',
                toolbarBtnIcon: 'gutentyp-toolbar-btn-icon',
                toolbarGroup: 'gutentyp-toolbar-group',
                toolbarComponents: 'gutentyp-toolbar-components',
                toolbarForms: 'gutentyp-toolbar-forms',
                toolbarArrowOver: 'gutentyp-toolbar-arrow-over',
                hidden: 'gutentyp-hidden',
                form: 'gutentyp-form'
            };
        }
    });
    
    scope.register({
        name: 'config.selectors',
        dependencies: ['config.cssClasses'],
        factory: function (cssClasses) {
            var selectors, i;

            selectors = {};

            for (i in cssClasses) {
                if (cssClasses.hasOwnProperty(i)) {
                    selectors[i] = '.' + cssClasses[i];
                }
            }

            selectors.newEditors = selectors.editor + ':not(' + selectors.hasToolbar + ')';
            selectors.eventlessEditors = selectors.editor + ':not(' + selectors.hasEvents + ')';
            selectors.newToolbars = selectors.toolbar + ':not(' + selectors.hasComponents + ')';
            selectors.newToolbarsFormsContainer = selectors.newToolbars + ' ' + selectors.toolbarForms;
            selectors.newToolbarsComponentsContainer = selectors.newToolbars + ' ' + selectors.toolbarComponents;
            
            return selectors;
        }
    });
    
}(Hilary.scope('gutentypeContainer')));
