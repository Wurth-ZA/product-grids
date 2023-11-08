function initializeProductGrid(containerId, options) {
    const { createApp, ref, computed } = Vue;

    createApp({
        data() {
            return {
                products: [],
                selectedProducts: [],
                isLoading: true,
                fallbackImageUrl: options.fallbackImageUrl || "https://eshop.wurth.co.za/fallback-image.jpg",
            };
        },
        computed: {
            
            getProductPriceForSelectedPackUnit() {
                return (product) => {
                    const selectedPackUnit = product.SelectedPackUnit;
                    //console.log('Wurth Price Array:', product.WurthPrice);
                    const matchingPrice = product.WurthPrice.find(price => price.packingUnit === selectedPackUnit);
                    //console.log('matchingPrice:', matchingPrice);
                    if (matchingPrice && matchingPrice.pricePerPacking !== undefined && matchingPrice.pricePerPacking !== null) {
                        return matchingPrice.pricePerPacking;
                    } else if (product.WurthPrice && product.WurthPrice[0] && product.WurthPrice[0].pricePerPacking !== undefined && product.WurthPrice[0].pricePerPacking !== null) {
                        return product.WurthPrice[0].pricePerPacking;
                    } else {
                        return "Login to see price"; // Display a message indicating the user needs to log in to see the price
                    }
                };
            }

        },
        methods: {
            

            async fetchData() {
                try {

                    const response = await fetch("https://directus.apps.onasik.co.za/items/RSA_CLEARANCE_SALE?fields=*,Material_number.*&filter[Display][_eq]=Yes");
                    const data = await response.json();

                    this.products = data.data.map((product) => ({
                        TAG: product.TAG,
                        Product_URL: product.Material_number?.Product_URL || '',
                        Model_URL: product.Material_number?.Model_URL || '',
                        Product_name: product.Material_number?.Product_name || '',
                        Product_picture: product.Material_number?.Product_picture || '',
                        Product_number: product.Material_number?.Product_number || '',
                        Description: product.Material_number?.Description || '',
                        Package_size: product.Material_number?.Package_size || '',
                        Technical_description: product.Material_number?.Technical_description,
                        Duplicate_Model: product.Material_number?.Duplicate_Model,
                        quantity: 1,
                        WurthPrice: []
                    }));

                    // Extract unique product numbers
                    const productNumbers = Array.from(new Set(this.products.map(product => product.Product_number)));

                    // Create a single request to get prices for all products
                    fetch(`/is-bin/INTERSHOP.enfinity/WFS/3128-B1-Site/en_GB/-/ZAR/ViewModelDetail-AjaxGetPrice?Products%5B%5D=${productNumbers.join('&Products%5B%5D=')}&SupplierID=WuerthGroup-Wuerth&ModelName=1`)
                        .then(response => response.json())
                        .then(priceData => {
                            //console.log('API Response - priceData:', priceData);

                            // Create a map for price data based on product numbers
                            const priceDataMap = {};
                            priceData.forEach(item => {
                                // Remove any spaces in the product number for consistent matching
                                const productNumber = item.productNo.replace(/\s+/g, '');
                                priceDataMap[productNumber] = item.articlePriceVos;
                            });

                            // Map price data to products
                            this.products.forEach(product => {
                                const productNumber = product.Product_number.replace(/\s+/g, ''); // Remove spaces
                                const matchingPriceData = priceDataMap[productNumber] || [];
                                product.WurthPrice = matchingPriceData || [];

                                // Log product price data here
                                //console.log('Product Number:', product.Product_number);
                                // console.log('Matching Price Data:', matchingPriceData);
                            });

                            // Set default selected pack unit
                            this.products.forEach(product => {
                                if (product.WurthPrice.length > 0) {
                                    // Find the smallest packing unit
                                    let smallestPackingUnit = product.WurthPrice[0].packingUnit;

                                    product.WurthPrice.forEach(price => {
                                        if (price.packingUnit < smallestPackingUnit) {
                                            smallestPackingUnit = price.packingUnit;
                                        }
                                    });

                                    // Set the smallest packing unit as the default
                                    product.SelectedPackUnit = smallestPackingUnit;
                                }
                            });


                            //
                            // console.log('WurthPrice:', this.products[0].WurthPrice);
                        })

                        .catch(error => {
                            //console.error("Error fetching prices:", error);
                            //this.loading = false;
                        });
                    this.isLoading = false;
                } catch (error) {
                    // console.error("Error fetching data:", error);
                    // Handle the error appropriately, e.g., show an error message
                }
            },

            selectPackUnit(product, selectedPackUnit) {
                Vue.set(product, 'SelectedPackUnit', selectedPackUnit);
                product.SelectedPackUnit = selectedPackUnit;

            },

            increaseQuantity(product) {
                // This will increment the product's quantity by 1
                console.log(product.quantity)
                product.quantity = Math.max(1, (product.quantity || 0) + 1);
            },
            decreaseQuantity(product) {
                // This will decrement the product's quantity by 1, but not below 1
                console.log(product.quantity)
                product.quantity = Math.max(1, (product.quantity || 0) - 1);

            },
            quickAddProductsToCart(productNumber, packageUnit, packageSize, forceRefresh) {


                if (productNumber == undefined)
                    return false;
                if (productNumber.substring(0, 3) == 'id_')
                    productNumber = $('#' + productNumber);
                var products = {};
                products.supplierId = 'WuerthGroup-Wuerth';
                products.articles = new Array();
                products.articles.push({
                    productNo: productNumber,
                    packingUnit: packageUnit,
                    quantity: packageSize
                });
                products = JSON.stringify(products);
                $.ajax({
                    url: '/is-bin/INTERSHOP.enfinity/WFS/3128-B1-Site/en_GB/-/ZAR/ViewModelDetail-AjaxAddArticlesToCurrentShoppingCart',
                    dataType: 'html',
                    type: 'POST',

                    data: {
                        ShoppingCartForm: products
                    },
                    success: function (F) {
                        applicationFrameMessages.displayMessage(F);
                        updateMiniBasketCounter(jsonResponse.shoppingCartItemsCount);
                        if (forceRefresh == 1)
                            location.reload();
                        return false;
                    }
                });
                return false;


            },
            addCustomToCart(product) {
                var addCustomToCartEvent = {
                    'event': 'addCustomToCart',
                    'items': [
                        {
                            'sku': product.Product_number,
                            'modelId': '',
                            'modelName': '',
                            'productName': product.Product_name,
                            'packingUnit': '1',
                            'manufacturerName': '',
                            'amountPackingUnits': '1',
                            'hierarchy': {},
                            'totalAmountPackingUnits': '1',
                            'merged': false
                        }
                    ],

                };

                dataLayer.push(addCustomToCartEvent);
            },
        },
        mounted() {
            this.fetchData();
        },
        template: grid_templates[options.templateId] || templates.default,
    }).mount(`#${containerId}`);
}