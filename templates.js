const grid_templates = {
    default:  '' + 
    '<div v-if="isLoading" class="skeleton-container">' + 
    '    <div class="skeleton-container">' + 
    '        <div class="skeleton-card">' + 
    '            <div class="skeleton-product"></div>' + 
    '            <div class="skeleton-product"></div>' + 
    '            <div class="skeleton-product"></div>' + 
    '            <div class="skeleton-product"></div>' + 
    '        </div>' + 
    '    </div>' + 
    '</div>' + 
    '<div v-else="" data-component-id="metrics-component-1" class="card-deck metrics-component-1 fill">' + 
    '    <div v-for="product in products" v-bind:key="product">' + 
    '        <div class="card"><span class="card-label" style="background-color: #0000ff;">{{product.TAG}}</span>' + 
    '            <div v-if="product.Product_picture !== null"><a v-bind:href="product.Product_URL" class="card-img-link"' + 
    '                    v-bind:title="product.Product_name"> <img v-bind:class="\'card-img-top lazyloaded\'"' + 
    '                        v-bind:alt="product.Product_name" v-bind:src="product.Product_picture" /> </a></div>' + 
    '            <div v-else=""><a v-bind:href="product.Product_URL" class="card-img-link"' + 
    '                    v-bind:title="product.Product_name"> <img v-bind:class="\'card-img-top lazyloaded\'"' + 
    '                        v-bind:alt="product.Product_name" v-bind:src="fallbackImageUrl" /> </a></div>' + 
    '            <div class="card-body">' + 
    '                <h2 class="card-title">{{product.Product_name}}</h2>' + 
    '                <span class="card-ref">{{product.Product_number}}</span>' + 
    '                <p class="card-description">{{product.Technical_description}}</p>' + 
    '                <div class="price-info">' + 
    '                    <p><span class="dyn-price card-price">{{ getProductPriceForSelectedPackUnit(product) }}<sup>' + 
    '                                ex Vat</sup></span></p>' + 
    '                </div>' + 
    '            </div>' + 
    '            <div v-if="product.Duplicate_Model === \'Yes\' " class="card-footer"><a class="card-footer-cta"' + 
    '                    v-bind:href="product.Model_URL" click="triggerCustomProductClickEvent(product)"> SHOP RANGE' + 
    '                    <i class="icon-ecommerce-shotpcart-download icon-lg"> </i> </a></div>' + 
    '            <div v-else-if="product.Duplicate_Model === \'No\' " class="container">' + 
    '                <div class="card-footer pulsate-fwd">' + 
    '                    <div class="input-group input-quantity" style="flex: 1;">' + 
    '                        <a class="btn-quantity-minus" v-on:click="decreaseQuantity(product)">' + 
    '                            <i class="input-group-addon icon-interface-minus"></i></a>' + 
    '                        <input type="number" class="input_amount form-control wsel" v-model="product.quantity" />' + 
    '                        <a class="btn-quantity-plus" v-on:click="increaseQuantity(product)">' + 
    '                            <i class="input-group-addon icon-interface-plus"></i></a>' + 
    '                    </div>' + 
    '                    <div class="productPacking" style="flex: 1;">' + 
    '                        <div style="background-color: black; border-radius: 7px;"><select' + 
    '                                :id="\'select_\' + product.Product_number" class="form-control"' + 
    '                                :ref="\'packSizeInput_\' + product.Product_number" v-model="product.SelectedPackUnit">' + 
    '                                <option value=""></option>' + 
    '                                <option v-for="packunit in product.WurthPrice" :key="packunit.packingUnit"' + 
    '                                    :value="packunit.packingUnit"> {{ packunit.packingUnit }} </option>' + 
    '                            </select></div>' + 
    '                    </div>' + 
    '                </div>' + 
    '                <div><button class="card-footer-cta card-footer-cta-add-to-cart quickAddToCart"' + 
    '                        v-on:click="quickAddProductsToCart(product.Product_number, product.SelectedPackUnit || 0 , product.quantity, 0); addCustomToCart(product)"' + 
    '                        title="Add to Cart"> <span style="vertical-align: inherit;"> <span' + 
    '                                style="vertical-align: inherit;"> Add to Cart </span> </span> <i' + 
    '                            class="icon-ecommerce-shopcart-download icon-lg" style="margin-left: 5px;"></i>' + 
    '                    </button></div>' + 
    '            </div>' + 
    '        </div>' + 
    '    </div>' + 
    '</div>', 
    namibia:  '' + 
    '<div v-if="isLoading" class="skeleton-container">' + 
    '    <div class="skeleton-container">' + 
    '        <div class="skeleton-card">' + 
    '            <div class="skeleton-product"></div>' + 
    '            <div class="skeleton-product"></div>' + 
    '            <div class="skeleton-product"></div>' + 
    '            <div class="skeleton-product"></div>' + 
    '        </div>' + 
    '    </div>' + 
    '</div>' + 
    '<div v-else="" data-component-id="metrics-component-1" class="card-deck metrics-component-1 fill">' + 
    '    <div v-for="product in products" v-bind:key="product">' + 
    '        <div class="card"><span class="card-label" style="background-color: #0000ff;">{{product.TAG}}</span>' + 
    '            <div v-if="product.Product_picture !== null"><a v-bind:href="product.Product_URL" class="card-img-link"' + 
    '                    v-bind:title="product.Product_name"> <img v-bind:class="\'card-img-top lazyloaded\'"' + 
    '                        v-bind:alt="product.Product_name" v-bind:src="product.Product_picture" /> </a></div>' + 
    '            <div v-else=""><a v-bind:href="product.Product_URL" class="card-img-link"' + 
    '                    v-bind:title="product.Product_name"> <img v-bind:class="\'card-img-top lazyloaded\'"' + 
    '                        v-bind:alt="product.Product_name" v-bind:src="fallbackImageUrl" /> </a></div>' + 
    '            <div class="card-body">' + 
    '                <h2 class="card-title">{{product.Product_name}}</h2>' + 
    '                <span class="card-ref">{{product.Product_number}}</span>' + 
    '                <p class="card-description">{{product.Technical_description}}</p>' + 
    '                <div class="price-info">' + 
    '                    <p><span class="dyn-price card-price">{{ getProductPriceForSelectedPackUnit(product) }}<sup>' + 
    '                                ex Vat</sup></span></p>' + 
    '                </div>' + 
    '            </div>' + 
    '            <div v-if="product.Duplicate_Model === \'Yes\' " class="card-footer"><a class="card-footer-cta"' + 
    '                    v-bind:href="product.Model_URL" click="triggerCustomProductClickEvent(product)"> SHOP RANGE' + 
    '                    <i class="icon-ecommerce-shotpcart-download icon-lg"> </i> </a></div>' + 
    '            <div v-else-if="product.Duplicate_Model === \'No\' " class="container">' + 
    '                <div class="card-footer pulsate-fwd">' + 
    '                    <div class="input-group input-quantity" style="flex: 1;">' + 
    '                        <a class="btn-quantity-minus" v-on:click="decreaseQuantity(product)">' + 
    '                            <i class="input-group-addon icon-interface-minus"></i></a>' + 
    '                        <input type="number" class="input_amount form-control wsel" v-model="product.quantity" />' + 
    '                        <a class="btn-quantity-plus" v-on:click="increaseQuantity(product)">' + 
    '                            <i class="input-group-addon icon-interface-plus"></i></a>' + 
    '                    </div>' + 
    '                    <div class="productPacking" style="flex: 1;">' + 
    '                        <div style="background-color: black; border-radius: 7px;"><select' + 
    '                                :id="\'select_\' + product.Product_number" class="form-control"' + 
    '                                :ref="\'packSizeInput_\' + product.Product_number" v-model="product.SelectedPackUnit">' + 
    '                                <option value=""></option>' + 
    '                                <option v-for="packunit in product.WurthPrice" :key="packunit.packingUnit"' + 
    '                                    :value="packunit.packingUnit"> {{ packunit.packingUnit }} </option>' + 
    '                            </select></div>' + 
    '                    </div>' + 
    '                </div>' + 
    '                <div><button class="card-footer-cta card-footer-cta-add-to-cart quickAddToCart"' + 
    '                        v-on:click="quickAddProductsToCart(product.Product_number, product.SelectedPackUnit || 0 , product.quantity, 0); addCustomToCart(product)"' + 
    '                        title="Add to Cart"> <span style="vertical-align: inherit;"> <span' + 
    '                                style="vertical-align: inherit;"> Add to Cart </span> </span> <i' + 
    '                            class="icon-ecommerce-shopcart-download icon-lg" style="margin-left: 5px;"></i>' + 
    '                    </button></div>' + 
    '            </div>' + 
    '        </div>' + 
    '    </div>' + 
    '</div>',
    alternative: `<div>Alternative Template</div>`, 
    
};