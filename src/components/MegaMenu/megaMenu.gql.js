import { gql } from '@apollo/client';

export const GET_STORE_CONFIG_DATA = gql`
    query GetStoreConfigForMegaMenu {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig {
            store_code
            category_url_suffix
        }
    }
`;

export const GET_MEGA_MENU = gql`
    query getMegaMenu {
        MenuGraphql {
            id
            parent_id
            name
            url_key
            url_path
            is_mega_menu
            mega_menu_content
            sub_menu_width
            link_color
            ribbon
            ribbon_color
            custom_url
        }
    }
`;

export default {
    getMegaMenuQuery: GET_MEGA_MENU,
    getStoreConfigQuery: GET_STORE_CONFIG_DATA
};
