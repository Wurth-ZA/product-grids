var myDivId = 'myDivId'; // replace with your div ID

// Function to load a script
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}
var vue_global ="https://unpkg.com/vue@3.2.20/dist/vue.global.js";
var grid_script ="https://wurth-za.github.io/product-grids/custom-grids-nam.js";
var template_script="https://wurth-za.github.io/product-grids/templates.js";
// Load Vue.js
loadScript(vue_global, function () {
    // Load custom-grids-nam.js
    loadScript(grid_script, function () {
        // Load templates.js
        loadScript(template_script, function () {
            var collection = 'Namibia_Promotions';
            var visible_filter = 'yes';
            var tag_filter = 'Black Month';
            var template = 'namibia_swiper';
            var companyCode = '3829';
            var countryCode = 'NAD';
            var swiperEnabled = true;
            const config = {
                endpoint: 'https://directus.apps.onasik.co.za/items/' + collection + '?fields=*,Material_number.*&filter[Eshop_visible][_eq]=' + visible_filter + '&filter[Tag][_eq]=' + tag_filter,
                fallbackImageUrl: 'https://your.fallback/image.jpg',
                templateId: template,
                countryCode: countryCode,
                companyCode: companyCode,
                cssUrl: 'https://wurth-za.github.io/product-grids/standard-promo-grid.css',
                swiperEnabled: swiperEnabled,
            };

            // Initialize the Vue app in the specified div
            initializeProductGrid(myDivId, config);
        });
    });
});
