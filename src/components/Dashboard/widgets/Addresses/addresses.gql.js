import { gql } from '@apollo/client';
export const GET_CUSTOMER_INFORMATION = gql`
    query {
        customer {
            addresses {
                id
                city
                country_code
                default_billing
                default_shipping
                firstname
                lastname
                middlename
                postcode
                region {
                    region
                    region_code
                    region_id
                }
                street
                telephone
            }
        }
    }
`;

export default {
    getCustomerInformationQuery: GET_CUSTOMER_INFORMATION
};
