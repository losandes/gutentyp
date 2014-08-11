/*global hilary, jQuery, gutentyp, hljs, document, console*/
hilary.use([jQuery, hilary, gutentyp, hljs, document, console], function (ctx, $, hilary, gutentyp, highlightJs, document, console) {
    "use strict";
    
    var demo = hilary.resolve('gutentyp::demo').init($, hilary, gutentyp, highlightJs, document, console);
    
    demo.registerCustomComponents();
//    demo.useCustomConfig(demo.gutenInstance2);
//    demo.useCustomToolbar(demo.gutenInstance2);
//    demo.useCustomColors(demo.gutenInstance2);
    
    demo.start();
    
    demo.addDemoThemeEvents();
});