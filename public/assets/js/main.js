// //Setup file path config
// require.config({
//     baseurl: 'js',
//     paths:
//     {
//         app: 'app',
//         lib: 'lib'
//     }
// }),
//     shim : {
//         backbone : {
//             deps:['jquery', 'underscore'],
//             exports: 'Backbone'
//         },
//         underscore:{
//             exports:'_'
//         },
//         nicescroll: {
//             deps: ['jquery'],
//             exports: 'jQuery.fn.niceScroll'
//         },
//         autosize: {
//             deps: ['jquery'],
//             exports: 'jQuery.fn.autosize'
//         },
//         jqueryui: {
//             deps: ['jquery']
//         }
//     }

// //Load all other scripts (along the above file paths)
// require(['lib/jquery',  'lib/underscore', 'lib/backbone', 'lib/bootstrap.min', 'app/routers'],
//     function(
//         $,  
//         _,
//         backbone, 
//         bootstrap, 
//         routers
//     ){
//         //All scripts are now loaded and ready to use

//     }
// );

