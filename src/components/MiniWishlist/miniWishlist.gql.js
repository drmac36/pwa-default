import { gql } from '@apollo/client';

export const GET_WISHLIST = gql`
    query {
        wishlist {
            items_count
            name
            sharing_code
            updated_at
            items {
                id
                qty
                description
                added_at
                product {
                    uid
                    image {
                        label
                        url
                    }
                    name
                    price_range {
                        maximum_price {
                            final_price {
                                currency
                                value
                            }
                        }
                    }
                    sku
                    stock_status
                }
            }
        }
    }
`;

export default {
    getWishlistQuery: GET_WISHLIST
};
